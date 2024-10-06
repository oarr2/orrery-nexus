import * as THREE from 'three';
import { OrbitControls } from "https://unpkg.com/three@0.112/examples/jsm/controls/OrbitControls.js";
import earthRotationxy from './circular_points.csv'
console.log(earthRotationxy)


//initial setup
window.THREE = THREE
const w = window.innerWidth
const h = window.innerHeight
//scene
const scene = new THREE.Scene();
//camera
const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 10;
//renderer
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement)


//controls to make the scene dynamic
new OrbitControls(camera, renderer.domElement)


//sun geometry + material = mesh
const sunGeometry = new THREE.IcosahedronGeometry(2, 2);
const sunMaterial = new THREE.MeshPhongMaterial({
    color: 0xFFFF00,
    flatShading: true
});
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sunMesh);

//earth geometry + material = mesh
let earthIndex = 0
const earthRotationSizeArray = Array.from(earthRotationxy).length
console.log(earthRotationSizeArray)
const earthGeometry = new THREE.IcosahedronGeometry(1, 2);
const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x44aa88,
    flatShading: true
});
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
earthMesh.position.set(5,0,0)
scene.add(earthMesh);

//light
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

//loop to animate the scene
console.log(earthRotationxy[earthIndex]['y'])
function animate() {
    requestAnimationFrame(animate);
    sunMesh.rotation.y += 0.001
    sunMesh.rotation.x += 0.001
    
    earthMesh.position.x = earthRotationxy[earthIndex]['x']
    earthMesh.position.y = earthRotationxy[earthIndex]['y']
    earthIndex = (earthIndex + 1) % earthRotationSizeArray
    //console.log(earthIndex)
        //console.log(earthRotationxy[key]['x'])
    
    renderer.render(scene, camera);
    
}
animate();
