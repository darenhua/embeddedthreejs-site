import "./style.css";
import * as THREE from "three";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

/**
 * Sizes
 */
const sizes = {
  width: 350,
  height: 350,
};

window.addEventListener("resize", () => {
  console.log(window.innerHeight);
  if (window.innerHeight < 500) {
    renderer.setSize(200, 200);
  } else {
    renderer.setSize(sizes.width, sizes.height);
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 35;
scene.add(camera);

// Controls

/**
 * Cube
 */
const cube = new THREE.Mesh(
  new THREE.TorusKnotGeometry(10, 3, 100, 16),
  new THREE.MeshPhysicalMaterial({ color: 0xff0000 })
);
scene.add(cube);

// Lights

const light = new THREE.AmbientLight(0x404040, 1.8); // soft white light
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
scene.add(directionalLight);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
if (window.innerWidth < 500) {
  renderer.setSize(200, 200);
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let lastElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - lastElapsedTime;
  lastElapsedTime = elapsedTime;
  cube.rotation.z += deltaTime;
  cube.rotation.y += deltaTime / 2;
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

tick();
