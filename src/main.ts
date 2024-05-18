
import * as Cesium from "cesium";
import * as THREE from 'three';
import { createColoredCube } from "./cube";

const location = {
  lat: 40.748817,
  lon: -73.985428,
  height: 200
};
const position = Cesium.Cartesian3.fromDegrees(location.lon, location.lat, location.height);

// CesiumJS
const cesiumViewer = new Cesium.Viewer("cesium", {
  terrainProvider: await Cesium.createWorldTerrainAsync(),
  skyBox: false,
  baseLayerPicker: false,
  geocoder: false,
  sceneModePicker: false,
  animation: false,
  timeline: false,
  navigationHelpButton: false,
});
cesiumViewer.scene.debugShowFramesPerSecond = true;
const osmBuildings = await Cesium.createOsmBuildingsAsync();
cesiumViewer.scene.primitives.add(osmBuildings);


// Three.js
const threeContainer = document.getElementById("three");
const threeScene = new THREE.Scene();
const threeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 50000000);
const threeRenderer = new THREE.WebGLRenderer({ alpha: true });
threeRenderer.setSize(window.innerWidth, window.innerHeight);
threeContainer?.appendChild(threeRenderer.domElement);

// Create a cube in Three.js and add it to the scene
const cube = createColoredCube();
cube.position.set(position.x, position.y, position.z);
threeScene.add(cube)

// Direct the Cesium camera to look at the cube
cesiumViewer.camera.lookAt(position, new Cesium.Cartesian3(200.0, 500.0, 300.0));
cesiumViewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

function updateThreeJS() {
    // Update Three.js camera field of view to match Cesium camera's vertical FOV
    threeCamera.fov = Cesium.Math.toDegrees(cesiumViewer.camera.frustum.fovy); 
    threeCamera.updateProjectionMatrix();

    // Sync Three.js camera with Cesium camera
    const cesiumCamera = cesiumViewer.camera;
    const cvm = cesiumCamera.viewMatrix;
    const civm = cesiumCamera.inverseViewMatrix;

    // Fix the extraction of camera position and direction from matrices
    const cameraPosition = Cesium.Cartesian3.fromElements(civm[12], civm[13], civm[14]);
    const cameraDirection = new Cesium.Cartesian3(-cvm[2], -cvm[6], -cvm[10]);
    const cameraUp = new Cesium.Cartesian3(cvm[1], cvm[5], cvm[9]);

    const cameraPositionVec3 = new THREE.Vector3(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    const cameraDirectionVec3 = new THREE.Vector3(cameraDirection.x, cameraDirection.y, cameraDirection.z);
    const cameraUpVec3 = new THREE.Vector3(cameraUp.x, cameraUp.y, cameraUp.z);

    // Update Three.js camera position and orientation
    threeCamera.position.copy(cameraPositionVec3);
    threeCamera.up.copy(cameraUpVec3);
    threeCamera.lookAt(cameraPositionVec3.clone().add(cameraDirectionVec3));

    // Apply rotation to the cube
    cube.rotation.x += 0.01;
    // Render the scene with the updated camera
    threeRenderer.render(threeScene, threeCamera);
};

// Handle window resizing
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  threeRenderer.setSize(width, height);
  threeCamera.aspect = width / height;
  threeCamera.updateProjectionMatrix();
});

function renderLoop() {
  requestAnimationFrame(renderLoop);
  cesiumViewer.render();
  updateThreeJS();
}

renderLoop();