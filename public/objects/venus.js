import * as THREE from 'three';
import rotationxy from '../dataPoints/venus_points.csv'

//earth geometry + material = mesh
let index = 0
const rotationSizeArray = Array.from(rotationxy).length
const loader = new THREE.TextureLoader()
export function venusMeshBuilder() {
    const geometry = new THREE.IcosahedronGeometry(1, 12);
    const material = new THREE.MeshPhongMaterial({
        map: loader.load("./objectAssets/venusmap.jpg"),
        //color: 0x44aa88,
        //flatShading: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    //position will be replaced by xy csv coordinates
    mesh.position.set(5,0,0)
    mesh.name = "Venus"
    mesh.userData = "this is the venus data"
    return mesh
}

export function updateVenusPosition(mesh) {
    mesh.position.x = rotationxy[index]['x']
    mesh.position.y = rotationxy[index]['y']
    index = (index + 1) % rotationSizeArray
    //mesh.rotation.y += 0.01
    //mesh.rotation.x += 0.01
}