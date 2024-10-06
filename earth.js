import * as THREE from 'three';
import earthRotationxy from './circular_points.csv'

//earth geometry + material = mesh
let earthIndex = 0
const earthRotationSizeArray = Array.from(earthRotationxy).length
export function earthMeshBuilder() {
    
    const earthGeometry = new THREE.IcosahedronGeometry(1, 2);
    const earthMaterial = new THREE.MeshPhongMaterial({
        color: 0x44aa88,
        flatShading: true
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMesh.position.set(5,0,0)
    return earthMesh
}

export function updateEarthPosition(earthMesh) {
    earthMesh.position.x = earthRotationxy[earthIndex]['x']
    earthMesh.position.y = earthRotationxy[earthIndex]['y']
    earthIndex = (earthIndex + 1) % earthRotationSizeArray
}