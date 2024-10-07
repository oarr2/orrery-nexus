import * as THREE from 'three';
import rotationxy from '../dataPoints/mars_points.csv'

//earth geometry + material = mesh
const rotationSizeArray = Array.from(rotationxy).length
let index = (rotationSizeArray/2 | 0) + (rotationSizeArray/5 | 0)
const loader = new THREE.TextureLoader()
export function marsMeshBuilder() {
    const geometry = new THREE.IcosahedronGeometry(5, 12);
    const material = new THREE.MeshPhongMaterial({
        map: loader.load("./objectAssets/marsmap1k.jpg"),
        //color: 0x44aa88,
        //flatShading: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    //position will be replaced by xy csv coordinates
    mesh.position.set(5,0,0)
    mesh.name = "Mars"
    mesh.userData = "this is the mars data"
    return mesh
}

export function phobosMeshBuilder() {
    const geometry = new THREE.IcosahedronGeometry(2, 12);
    const material = new THREE.MeshStandardMaterial({
        map: loader.load("./objectAssets/phobosbump.jpg"),
        
        //color: 0x44aa88,
        //flatShading: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.setScalar(0.10)
    mesh.position.set(6,0,0)
    return mesh
}

export function phobosGroupBuilder() {
    const moonMesh = phobosMeshBuilder()
    const group = new THREE.Group()
    group.add(moonMesh)
    return group
}

export function deimosMeshBuilder() {
    const geometry = new THREE.IcosahedronGeometry(2, 12);
    const material = new THREE.MeshStandardMaterial({
        map: loader.load("./objectAssets/deimosbump.jpg"),
        
        //color: 0x44aa88,
        //flatShading: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.setScalar(0.12)
    mesh.position.set(7,0,0)
    return mesh
}

export function deimosGroupBuilder() {
    const moonMesh = deimosMeshBuilder()
    const group = new THREE.Group()
    group.add(moonMesh)
    return group
}

export function updateMarsPosition(mesh) {
    mesh.position.x = rotationxy[index]['x']
    mesh.position.y = rotationxy[index]['y']
    index = (index + 1) % rotationSizeArray
    //mesh.rotation.y += 0.01
    //mesh.rotation.x += 0.01
}

export function updatePhobosPosition(group) {
    //group.rotation.x += 0.01
    group.rotation.y += 0.001
    group.position.x = rotationxy[index]['x']
    group.position.y = rotationxy[index]['y']
}

export function updateDeimosPosition(group) {
    //group.rotation.x += 0.01
    group.rotation.z += 0.001
    group.position.x = rotationxy[index]['x']
    group.position.y = rotationxy[index]['y']
}