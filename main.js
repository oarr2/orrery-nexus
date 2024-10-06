import * as THREE from 'three';
import { OrbitControls } from "https://unpkg.com/three@0.112/examples/jsm/controls/OrbitControls.js";
import earthRotationxy from './circular_points.csv'
import { updateEarthPosition, earthMeshBuilder, moonGroupBuilder, updateMoonPosition } from './earth'
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
const earthMesh = earthMeshBuilder()
scene.add(earthMesh);
const moonGroup = moonGroupBuilder()
scene.add(moonGroup)

//light
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

//loop to animate the scene
function animate() {
    requestAnimationFrame(animate);
    sunMesh.rotation.y += 0.001
    sunMesh.rotation.x += 0.001

    updateEarthPosition(earthMesh)
    updateMoonPosition(moonGroup)
    
    renderer.render(scene, camera);
    
}
animate();
