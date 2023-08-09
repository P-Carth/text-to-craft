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

//   get_github_repos: {
//     name: "get_github_repos",
//     description: "Get all repositories of Preston Kirschner on Github",
//     parameters: {
//       type: "object",
//       properties: {},
//       required: [],
//     },
//     function: getGithubRepos,
//   },

//   send_message_to_telegram: {
//   name: "extractTravelPlan",
//   description: "Extract the travel plan details from the input",
//   parameters: {
//     type: "object",
//     properties: {
//       travelPlan: {
//         type: "array",
//         description: `An array of daily schedules, there are ${durationDays} items in this array (one item for each day)`,
//         items: {
//           type: "array",
//           description:
//             "A daily plan; an array of activities, maximum number of items in array equals to 5",
//           items: {
//             type: "object",
//             description: "An activity in a daily plan",
//             properties: {
//               timeOfDay: {
//                 type: "string",
//                 description: "The start time of the activity (ex. 13:00)",
//               },
//               activityName: {
//                 type: "string",
//                 description:
//                   "Must include both the name of activity and its location (ex. Evening stroll in Stanley Park)",
//               },
//               description: {
//                 type: "string",
//                 description:
//                   "Two sentences describing the activity (ex. Visit the famous park, walk along the seawall, and enjoy the scenic views of the city and surrounding nature. From the captivating Totem Poles and breathtaking views at Prospect Point to the serene Beaver Lake and scenic seawall, Stanley Park offers an unforgettable experience where you can immerse yourself in the splendor of nature while exploring its rich cultural heritage.)",
//               },
//               address: {
//                 type: "string",
//                 description:
//                   "The address of the activity (ex. 2099 Beach Ave, Vancouver, BC V6G 1Z4); if activity has no proper of structured address format, return the city name instead (ex. Vancouver, BC)",
//               },
//             },
//           },
//         },
//       },
//     },
//     required: ["travelPlan"],
//   },
