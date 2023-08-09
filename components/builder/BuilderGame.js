import * as THREE from "three";
import TextInputWithButton from "./messageform";
import { getTexture } from "./blockMaterials";
import { useEffect, useRef, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";

let layerMatrices = []; // Stores each layer's matrix
let layerMeshes = []; // Stores each layer's meshes

let scene, camera, renderer;

export function clearAllLayers() {
  for (let y in layerMeshes) {
    // Remove each mesh in this layer from the scene
    for (let mesh of layerMeshes[y]) {
      scene.remove(mesh);
    }
  }
  layerMatrices = [];
  layerMeshes = [];
}

export async function addLayer(matrix, y = layerMatrices.length) {
  const offset = (30 - matrix.length) / 2;
  let layerMeshesInThisLayer = []; // Stores the meshes in the current layer

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const blockType = matrix[i][j];
      const blockMaterial = await getTexture(blockType);
      if (blockMaterial) {
        const layerGeometry = new THREE.BoxGeometry(1, 1, 1);
        const layerMesh = new THREE.Mesh(layerGeometry, blockMaterial);
        layerMesh.position.set(i - 15 + offset, y, j - 15 + offset);
        scene.add(layerMesh);
        layerMeshesInThisLayer.push(layerMesh); // Add this mesh to the layer's meshes
      }
    }
  }

  layerMatrices[y] = matrix; // Store this layer's matrix
  layerMeshes[y] = layerMeshesInThisLayer; // Store this layer's meshes
}

function replaceLayer(matrix, y) {
  if (layerMeshes[y] === undefined) {
    // If the layer does not exist, add it instead
    addLayer(matrix, y);
    return;
  }
  // Remove each mesh in this layer from the scene
  for (let mesh of layerMeshes[y]) {
    scene.remove(mesh);
  }

  // Replace the matrix and rebuild the layer
  layerMatrices[y] = matrix;
  addLayer(matrix, y);
}

export async function replaceLayers(result) {
  // layers is an object with keys as the layer number and values as the matrix
  // for example: { 1: [[1, 1], [1, 1]], 2: [[2, 2], [2, 2]] }

  let layers = result.layers;

  // Edge case where the layer does not generate as an array
  if (!Array.isArray(layers)) {
    layers = [layers];
  }

  console.log("layers => ", layers);
  for (let y in layers) {
    await replaceLayer(layers[y].matrix, layers[y].layer);
  }
  //   console.log(layers);
  console.log("built successfully");
  return "built successfully";
}

export function getLayerComposition(y) {
  return layerMatrices[y]; // Returns the matrix for the given layer
}

export default function BuilderGame() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const containerRef = useRef();

  const center = new THREE.Vector3(0, 0, 0);

  let radius = 10; // The distance from the center to the camera
  let angle = 100; // The initial angle

  async function botReply(userMessage) {
    setIsBotThinking(true);

    const newConversation = [...messages, userMessage];

    // console.log("Sending conversation to the server:", newConversation);

    try {
      const res = await fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conversation: newConversation }),
      });

      setIsBotThinking(false);
      setIsBotTyping(true);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsBotTyping(false);

      return data;
    } catch (error) {
      setIsBotThinking(false);
      setIsBotTyping(false);
      console.error("Error getting reply from the server:", error);
      return { message: "Sorry, I couldn't process your request." };
    }
  }

  const sendMessage = (message) => {
    if (message.trim() === "") return;

    const userMessage = { author: "user", content: message };
    setMessages((currentMessages) => [...currentMessages, userMessage]);

    botReply(userMessage).then((data) => {
      if (data.function_call) {
        try {
          let functionArgs;
          console.log("function call!!", data.function_call);

          if (data.function_call.name === "build_structure") {
            functionArgs = JSON.parse(data.function_call.arguments);
            console.log("arguments: ", functionArgs);
            replaceLayers(functionArgs);
          }
          // Save the build structure to the conversation
          setMessages((currentMessages) => [
            ...currentMessages,
            {
              author: "assistant",
              content:
                "The current structure is: " + JSON.stringify(functionArgs),
            },
          ]);
          console.log("Full conversation after the bot's reply:", [
            ...messages,
            { author: "assistant", content: JSON.stringify(functionArgs) },
          ]);
        } catch (e) {
          alert("Failed to build structure, trying again");
          sendMessage(msg);
        }
      } else {
        setMessages((currentMessages) => [
          ...currentMessages,
          { author: "assistant", content: data.content },
        ]);
        console.log("data returned!!", data);
        console.log("Full conversation after the bot's reply:", [
          ...messages,
          { author: "assistant", content: data.content },
        ]);
      }
    });
    setMsg("");
  };

  const handleClear = () => {
    setMessages([]);
    clearAllLayers();
  };

  useEffect(() => {
    if (!containerRef.current) {
      // if the ref is not assigned yet, skip this effect
      return;
    }

    const container = containerRef.current;

    function init() {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 20, 50);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      // Add lighting to the scene
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 1, 0);
      scene.add(directionalLight);

      // 1. Create a sphere geometry with inverted normals
      const geometry = new THREE.SphereGeometry(50, 32, 32);
      geometry.scale(-1, 1, 1); // invert the geometry on the x-axis

      // 2. Load a texture
      const texture = new THREE.TextureLoader().load("sky.jpg"); // specify the path to your image

      // 3. Create a mesh with the geometry and texture
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const sphere = new THREE.Mesh(geometry, material);

      // 4. Add the mesh to the scene
      scene.add(sphere);

      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        "grass.png",
        function (texture) {
          const material = new THREE.MeshLambertMaterial({ map: texture });

          for (let i = 0; i < 30; i++) {
            for (let j = 0; j < 30; j++) {
              const geometry = new THREE.BoxGeometry(1, 1, 1);
              const mesh = new THREE.Mesh(geometry, material);
              mesh.position.set(i - 15, 0, j - 15);
              scene.add(mesh);
            }
          }
        },
        undefined,
        function (error) {
          console.error("An error occurred while loading the texture", error);
        }
      );
    }

    const animate = function () {
      requestAnimationFrame(animate);

      // Update the angle for the next frame
      angle += 0.001; // uncomment to spin camera

      // Calculate the new camera position
      camera.position.x = center.x + radius * Math.sin(angle);
      camera.position.z = center.z + radius * Math.cos(angle);

      // Make the camera look at the center
      camera.lookAt(center);

      renderer.render(scene, camera);
    };

    // Update your addLayer function

    init();
    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="flex">
      <div
        id="game-container"
        ref={containerRef}
        style={{ height: "100vh", width: "100%" }}
      />

      <div className="fixed bottom-20 left-0 right-0 mx-auto w-[600px] flex justify-center">
        <TextInputWithButton
          onSubmit={(e) => {
            sendMessage(e);
            setMsg(e);
          }}
          status={isBotThinking ? "thinking" : isBotTyping ? "typing" : null}
        />
        <button
          className="btn btn-primary ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
          onClick={() => {
            handleClear();
          }}
        >
          <span className="flex items-center font-semibold text-xl">
            Clear <BsTrash3Fill className="translate-y-0.5 ml-2" />
          </span>
        </button>
      </div>
    </div>
  );
}
