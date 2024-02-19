import { replaceLayers } from "/components/builder/BuilderGame";

export const functionConfig = {
  build_structure: {
    name: "build_structure",
    description: `build a structure using the given layers. the numbers in the matrices correspond with different block materials used to build 3d structures.
      materials = {0: 'air', 1: 'wood', 2: 'cobblestone', 3: 'glass'}
      `,
    parameters: {
      // make it a string and parse thoguh it
      type: "object",
      properties: {
        layers: {
          type: "object",
          //   description:
          //     "An object where the keys correspond with the y-indices and the values are the matrices associated with the layers",
          properties: {
            layer: {
              type: "number",
              description:
                "The layer number, this indicates where on the y-axis the layer is located",
            },
            matrix: {
              type: "array",
              description:
                "An object where each key is a layer number and the corresponding value is a 2D array (matrix) associated with that layer.",
              items: {
                type: "array",
                items: {
                  type: "number",
                  description: "A number representing a block material",
                },
                description: "A 2D array (matrix) of numbers",
              },
            },
          },
        },
      },
      required: ["layers"],
    },
    function: replaceLayers,
  },
};
