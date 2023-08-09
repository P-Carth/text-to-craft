// blockTypes.js

import * as THREE from "three";

const blockTypes = {
  0: null,
  1: "wood.jpg",
  2: "cobble.png",
  3: "glass.png",
  // Add more block types here as needed
};

const textureLoader = new THREE.TextureLoader();

export const getTexture = async (blockType) => {
  const path = blockTypes[blockType];
  if (!path) return null;

  return new Promise((resolve, reject) => {
    textureLoader.load(
      path,
      (texture) => {
        const material = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true,
          alphaTest: 0.5,
        });
        resolve(material);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the texture", error);
        reject(error);
      }
    );
  });
};
