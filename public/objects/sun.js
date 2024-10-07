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
    sunMesh.userData = `The Sun—the heart of our solar system—is a yellow dwarf star, a hot ball of glowing gases.
    Its gravity holds the solar system together, keeping everything from the biggest planets to the smallest particles of debris in its orbit. Electric currents in the Sun generate a magnetic field that is carried out through the solar system by the solar wind—a stream of electrically charged gas blowing outward from the Sun in all directions.`
    return sunMesh
}

export function updateSunPosition(sunMesh) {
    sunMesh.rotation.y += 0.001
    sunMesh.rotation.x += 0.001
}