// blocks.js
import * as THREE from "three";

let topWood, bottomWood, sideWood, topStone, bottomStone, sideStone;

if (typeof window !== "undefined") {
  // Only run this in client-side environment

  // Load textures
  const loader = new THREE.TextureLoader();

  topWood = loader.load("/wood.jpg");
  bottomWood = topWood;
  sideWood = topWood;

  topStone = loader.load("/cobble.png");
  bottomStone = topStone;
  sideStone = topStone;
}

// Define materials for different blocks
export const wood = [
  new THREE.MeshPhongMaterial({ map: sideWood }),
  new THREE.MeshPhongMaterial({ map: sideWood }),
  new THREE.MeshPhongMaterial({ map: topWood }),
  new THREE.MeshPhongMaterial({ map: bottomWood }),
  new THREE.MeshPhongMaterial({ map: sideWood }),
  new THREE.MeshPhongMaterial({ map: sideWood }),
];

export const stone = [
  new THREE.MeshPhongMaterial({ map: sideStone }),
  new THREE.MeshPhongMaterial({ map: sideStone }),
  new THREE.MeshPhongMaterial({ map: topStone }),
  new THREE.MeshPhongMaterial({ map: bottomStone }),
  new THREE.MeshPhongMaterial({ map: sideStone }),
  new THREE.MeshPhongMaterial({ map: sideStone }),
];
