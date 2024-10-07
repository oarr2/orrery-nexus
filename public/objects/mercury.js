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
    mesh.userData = `The smallest planet in our solar system and nearest to the Sun, Mercury is only slightly larger than Earth's Moon.
    Mercury's surface temperatures are both extremely hot and cold. Because the planet is so close to the Sun, day temperatures can reach highs of 800°F (430°C). Without an atmosphere to retain that heat at night, temperatures can dip as low as -290°F (-180°C).`
    return mesh
}

export function updateMercuryPosition(mesh) {
    mesh.position.x = rotationxy[index]['x']
    mesh.position.y = rotationxy[index]['y']
    index = (index + 1) % rotationSizeArray
    //mesh.rotation.y += 0.01
    //mesh.rotation.x += 0.01
}