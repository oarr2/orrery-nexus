import * as THREE from 'three';
import rotationxy from '../dataPoints/mercury_points.csv'

//earth geometry + material = mesh
const rotationSizeArray = Array.from(rotationxy).length
let index = rotationSizeArray/4 | 0
const loader = new THREE.TextureLoader()
export function mercuryMeshBuilder() {
    const geometry = new THREE.IcosahedronGeometry(0.6, 12);
    const material = new THREE.MeshPhongMaterial({
        map: loader.load("./objectAssets/mercurymap.jpg"),
        //color: 0x44aa88,
        //flatShading: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    //position will be replaced by xy csv coordinates
    mesh.position.set(5,0,0)
    mesh.name = "Mercury"
    mesh.userData = "this is the mercury data"
    return mesh
}

export function updateMercuryPosition(mesh) {
    mesh.position.x = rotationxy[index]['x']
    mesh.position.y = rotationxy[index]['y']
    index = (index + 1) % rotationSizeArray
    //mesh.rotation.y += 0.01
    //mesh.rotation.x += 0.01
}