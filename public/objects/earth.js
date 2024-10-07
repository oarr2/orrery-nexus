import * as THREE from 'three';
import rotationxy from '../dataPoints/earth_points.csv'

//earth geometry + material = mesh

const rotationSizeArray = Array.from(rotationxy).length
let index = rotationSizeArray/2 | 0
const loader = new THREE.TextureLoader()
export function earthMeshBuilder() {
    const geometry = new THREE.IcosahedronGeometry(1, 12);
    const material = new THREE.MeshPhongMaterial({
        map: loader.load("./objectAssets/earthmap1k.jpg"),
        //color: 0x44aa88,
        //flatShading: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    //position will be replaced by xy csv coordinates
    mesh.position.set(5,0,0)
    mesh.name = "Earth"
    mesh.userData = "this is the earth data"
    return mesh
}

export function moonMeshBuilder() {
    const geometry = new THREE.IcosahedronGeometry(1, 12);
    const material = new THREE.MeshStandardMaterial({
        map: loader.load("./objectAssets/moonbump1k.jpg"),
        
        //color: 0x44aa88,
        //flatShading: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.setScalar(0.27)
    mesh.position.set(2,0,0)
    return mesh
}

export function moonGroupBuilder() {
    const moonMesh = moonMeshBuilder()
    const group = new THREE.Group()
    group.add(moonMesh)
    return group
}

export function updateEarthPosition(mesh) {
    mesh.position.x = rotationxy[index]['x']
    mesh.position.y = rotationxy[index]['y']
    index = (index + 1) % rotationSizeArray
    //mesh.rotation.y += 0.01
    //mesh.rotation.x += 0.01
}

export function updateMoonPosition(group) {
    //group.rotation.x += 0.01
    group.rotation.y += 0.01
    group.position.x = rotationxy[index]['x']
    group.position.y = rotationxy[index]['y']
}