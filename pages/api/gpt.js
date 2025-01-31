import OpenAI from "openai";
import { functionConfig } from "/gptFunctions/functionConfigs"; // Verify path

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

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
        content: `
        You are a builder bot. 
        - You have these block types with integer IDs:
          0 => empty (no block),
          1 => wood,
          2 => cobblestone,
          3 => glass
        - When the user asks to build something, call the build_structure function. 
        - The build_structure function expects an array of layers, each with a y-index called 'layer' and a 2D matrix of integers. 
        - Output integers in the matrix that correspond to the block types above.
      `,
      },
      ...conversation.map((msg) => ({
        role: msg.author === "user" ? "user" : "assistant",
        content: msg.content,
      })),
    ];

    const functionMap = Object.fromEntries(
      Object.entries(functionConfig).map(([key, config]) => [
        key, // Use object key directly
        config.function,
      ])
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: openaiMessages,
      tools: Object.values(functionConfig).map((config) => ({
        type: "function",
        function: {
          name: config.name,
          description: config.description,
          parameters: config.parameters,
        },
      })),
      tool_choice: "auto",
    });

    const responseMessage = completion.choices[0].message;

    if (responseMessage.tool_calls) {
      const toolCall = responseMessage.tool_calls[0];
      const functionName = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);
      const fn = functionMap[functionName];

      if (!fn) {
        throw new Error(`Function ${functionName} not found`);
      }

      const functionResult = await fn(args);
      return res.json({
        message: responseMessage.content || "Building your structure...",
        functionResult: functionResult,
      });
    } else {
      return res.json({
        message: responseMessage.content,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
}
