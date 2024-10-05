import * as THREE from 'three';
import { OrbitControls } from "https://unpkg.com/three@0.112/examples/jsm/controls/OrbitControls.js";

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
camera.position.z = 2;
//renderer
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement)


//controls to make the scene dynamic
new OrbitControls(camera, renderer.domElement)


//geometry + material = mesh
const geometry = new THREE.IcosahedronGeometry(1, 2);
const material = new THREE.MeshPhongMaterial({
    color: 0x44aa88,
    flatShading: true
});
const objMesh = new THREE.Mesh(geometry, material);
scene.add(objMesh);


//light
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

//loop to animate the scene
function animate() {
    requestAnimationFrame(animate);
    objMesh.rotation.y += 0.001
    objMesh.rotation.x += 0.001
    renderer.render(scene, camera);
}
animate();
