import * as THREE from 'three';

function createColoredCube() {
    const size = 50;
    const geometry = new THREE.BoxGeometry(size, size, size);
    
    const materials = [
        new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Right face - Red
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Left face - Green
        new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Top face - Blue
        new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Bottom face - Yellow
        new THREE.MeshBasicMaterial({ color: 0x00ffff }), // Front face - Cyan
        new THREE.MeshBasicMaterial({ color: 0xff00ff })  // Back face - Magenta
    ];

    const cube = new THREE.Mesh(geometry, materials);
    return cube;
};
export { createColoredCube };