import * as THREE from 'three';

const loader = new THREE.TextureLoader()
export function sunMeshBuilder() {
    //sun geometry + material = mesh
    const sunGeometry = new THREE.IcosahedronGeometry(12, 12);
    const sunMaterial = new THREE.MeshPhongMaterial({
        map: loader.load("./objectAssets/sunmap.jpg"),
        //color: 0xFFFF00,
        //flatShading: true
    });
    sunMaterial.shininess = 100
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    sunMesh.name = "Sun"
    sunMesh.userData = "this is the sun data"
    return sunMesh
}

export function updateSunPosition(sunMesh) {
    sunMesh.rotation.y += 0.001
    sunMesh.rotation.x += 0.001
}