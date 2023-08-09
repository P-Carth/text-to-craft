// gpt.js
import { Configuration, OpenAIApi } from "openai";
import { functionConfig } from "/gptFunctions/functionConfigs";

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed. Use POST" });
  }

  const { conversation } = req.body;

  if (!conversation || !Array.isArray(conversation)) {
    return res
      .status(400)
      .json({ message: "Bad Request. Missing conversation in body" });
  }

  try {
    const openaiMessages = [
      {
        role: "system",
        content: `You are a builder bot. 
    
                   `,
      },
      ...conversation.map((msg) => ({
        role: msg.author,
        content: msg.content,
      })),
    ];

    // a small house with a wood floor and roof with cobblestone walls would look like this:
    // example_matrix = {1:[[2, 2, 2, 2, 2],[2,1,1,1,2],[2,1,1,1,2],[2,1,1,1,2],[2,2,2,2,2]],2:[[2,2,2,2,2],[2,0,0,0,2],[2,0,0,0,2],[2,0,0,0,2],[2,2,2,2,2]],3:[[2,2,2,2,2],[2,0,0,0,2],[2,0,0,0,2],[2,0,0,0,2],[2,2,2,2,2]],4:[[2,2,2,2,2],[2,0,0,0,2],[2,0,0,0,2],[2,0,0,0,2],[2,2,2,2,2]],5:[[2,2,2,2,2],[2,1,1,1,2],[2,1,1,1,2],[2,1,1,1,2],[2,2,2,2,2]]}

    // return res.json(openaiMessages);

    const functions = Object.values(functionConfig);
    const functionMap = Object.fromEntries(
      Object.entries(functionConfig).map(([key, val]) => [key, val.function])
    );

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0613",
      messages: openaiMessages,
      functions: functions,
      function_call: "auto",
    });

    const responseMessage = completion.data.choices[0].message;

    return res.json(responseMessage);

    // Check if GPT wanted to call a function
    if (responseMessage.function_call) {
      const functionName = responseMessage.function_call.name;
      const functionToCall = functionMap[functionName];
      const functionArgs = JSON.parse(responseMessage.function_call.arguments);
      const functionResponse = await functionToCall(functionArgs);

      // Append the result of the function call to the messages list and send another completion request
      openaiMessages.push(responseMessage);
      openaiMessages.push({
        role: "function",
        name: functionName,
        content: functionResponse,
      });
      const secondCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        messages: openaiMessages,
      });

      // Use the new completion to form the response
      const secondResponseMessage = secondCompletion.data.choices[0].message;
      const botReply = secondResponseMessage.content;

      return res.status(200).json({ botReply: botReply });
    }

    const botReply = responseMessage.content;
    return res.status(200).json({ botReply: botReply });
  } catch (error) {
    console.error("Error getting reply from OpenAI:", error);
    return res.status(500).json({
      message: "Internal Server Error. Failed to get a reply from OpenAI.",
    });
  }
}
