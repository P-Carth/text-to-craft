// functionConfigs.js
export const functionConfig = {
  build_structure: {
    name: "build_structure",
    description: "Generates layer matrices for building structures.",
    parameters: {
      type: "object",
      properties: {
        layers: {
          type: "array",
          items: {
            type: "object",
            properties: {
              layer: { type: "number" },
              matrix: {
                type: "array",
                items: {
                  type: "array",
                  items: { type: "number" },
                },
              },
            },
            required: ["layer", "matrix"],
          },
        },
      },
      required: ["layers"],
    },

    // THIS is the crucial piece you're missing
    function: async (args) => {
      // For now, just return the layers data as is:
      return args;
    },
  },
};
