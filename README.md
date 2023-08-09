# Text-to-Craft

![alt text](demo.gif)

Welcome to **Text to Craft**, where your imagination becomes a reality! This project uses GPT-powered AI to transform your textual descriptions into virtual structures. Based on Minecraft, it allows users to build with materials like wood, cobblestone, and glass, but with the freedom to add any other materials you desire.

## Features
- **Natural Language Processing**: Describe what you want to build in simple words, and the AI will understand and create it for you.
- **Customizable Materials**: Start with basic materials like wood, cobblestone, and glass, and easily add any other materials you want.
- **Next.js Framework**: Built with the powerful Next.js framework for a smooth and responsive user experience.

## Getting Started

Here's a step-by-step guide to setting up Text to Craft on your local machine:

### Prerequisites
- Node.js (v14 or higher)
- An OpenAI API key

### Installation

1. **Clone the repository**: 
   ```bash
   git clone https://github.com/p-carth/text-to-craft.git
   cd text-to-craft
   ```

2. **Install the necessary packages**: 
   ```bash
   npm install
   ```

3. **Rename the environment file**:
   Rename `.env.local.example` to `.env.local`.

4. **Add your OpenAI API key**:
   Open the `.env.local` file and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```

5. **Start the development server**: 
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`. You're now ready to build!

## Customizing Materials

You can add or modify materials in the `blockMaterials.js` file and add them to `/gptFunctions/functionConfigs`. Just follow the existing structure to include the new materials you want to use.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any problems or have any suggestions, please open an issue or contact the maintainer at PrestonKirschner1@gmail.com.

Happy Building! 🏗️
