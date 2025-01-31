import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // Import OrbitControls
import TextInputWithButton from "./messageform";
import { getTexture } from "./blockMaterials";
import { useEffect, useRef, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import Toast from "./Toast";

let layerMatrices = [];
let layerMeshes = [];

let scene, camera, renderer;
let controls; // Stores OrbitControls instance

export function clearAllLayers() {
  for (let y = 0; y < layerMeshes.length; y++) {
    for (let mesh of layerMeshes[y] || []) {
      scene.remove(mesh);
    }
  }
  layerMatrices = [];
  layerMeshes = [];
}

export async function addLayer(matrix, y = layerMatrices.length) {
  const offset = (30 - matrix.length) / 2;
  let layerMeshesInThisLayer = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const blockType = matrix[i][j];
      const blockMaterial = await getTexture(blockType);
      if (blockMaterial) {
        const layerGeometry = new THREE.BoxGeometry(1, 1, 1);
        const layerMesh = new THREE.Mesh(layerGeometry, blockMaterial);
        layerMesh.position.set(i - 15 + offset, y, j - 15 + offset);
        scene.add(layerMesh);
        layerMeshesInThisLayer.push(layerMesh);
      }
    }
  }

  layerMatrices[y] = matrix;
  layerMeshes[y] = layerMeshesInThisLayer;
}

function replaceLayer(matrix, y) {
  console.log("matrix", matrix);
  console.log("y", y);
  if (!layerMeshes[y]) {
    addLayer(matrix, y);
    return;
  }
  for (let mesh of layerMeshes[y]) {
    scene.remove(mesh);
  }

  layerMatrices[y] = matrix;
  addLayer(matrix, y);
}

export async function replaceLayers(result) {
  const layers = result.layers;
  for (const layerObj of layers) {
    await replaceLayer(layerObj.matrix, layerObj.layer);
  }
  console.log("built successfully");
  return "built successfully";
}

export function getLayerComposition(y) {
  return layerMatrices[y];
}

export default function BuilderGame() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [toast, setToast] = useState({
    type: null,
    content: "",
    visible: false,
  });

  const containerRef = useRef();

  async function botReply(userMessage) {
    setIsBotThinking(true);

    const newConversation = [...messages, userMessage];

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

    setToast({
      type: "structure",
      content: message,
      visible: true,
    });

    const userMessage = { author: "user", content: message };
    setMessages((currentMessages) => [...currentMessages, userMessage]);

    botReply(userMessage).then((data) => {
      if (data.message) {
        setMessages((currentMessages) => [
          ...currentMessages,
          { author: "assistant", content: data.message },
        ]);

        setToast({
          type: "conversation",
          content: data.message,
          visible: true,
        });
      }

      if (data.functionResult) {
        replaceLayers(data.functionResult);

        setToast({
          type: "structure",
          content: `Building: ${userMessage.content} ✔️`,
          visible: true,
        });
      }
    });

    setMsg("");
  };

  const handleClear = () => {
    setMessages([]);
    clearAllLayers();
    setToast({
      type: "",
      content: "",
      visible: false,
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    function init() {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 20, 50);

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      // Add lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 1, 0);
      scene.add(directionalLight);

      // Enable user-controlled rotation
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = true;
      controls.target.set(0, 0, 0); // Ensure camera centers the scene

      // Load a simple ground texture
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

    function animate() {
      requestAnimationFrame(animate);

      // Ensure smooth movement with damping
      controls.update();

      renderer.render(scene, camera);
    }

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

      {toast.visible && (
        <Toast
          type={toast.type}
          content={toast.content}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}

      <div className="fixed bottom-10 left-0 right-0 mx-auto md:w-[600px] w-full px-4 flex flex-col md:flex-row justify-center">
        <TextInputWithButton
          onSubmit={(textValue) => {
            sendMessage(textValue);
            setMsg(textValue);
          }}
          onClear={handleClear}
          status={isBotThinking ? "thinking" : isBotTyping ? "typing" : null}
        />
      </div>
    </div>
  );
}
