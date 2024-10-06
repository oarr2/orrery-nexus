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
let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 10;
//renderer
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement)

//controls to make the scene dynamic
let controls = new OrbitControls(camera, renderer.domElement)

let originalCamera = camera.clone()

//raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isZooming = false;
let zoomTargetPosition;
// Event listener for clicks
window.addEventListener('click', onMouseClick, false);
function onMouseClick(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(scene.children)
    if(intersects.length > 0) {
        const targetMesh = intersects[0].object;
        
        zoomToMesh(targetMesh)
    }
}

function zoomToMesh(targetMesh) {
    isZooming = true;
    zoomTargetPosition = new THREE.Vector3().copy(targetMesh.position);
    //console.log(zoomTargetPosition.getComponent(0))
    //zoomTargetPosition.add(new THREE.Vector3(0, 0, 0))
        
}

//zoom out
let zoomOutflag = false
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        zoomOut(); // Zoom out when pressing the Escape key
    }
});
function zoomOut() {
    isZooming = false;
    zoomOutflag = true;
}


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
    if (isZooming) {
        console.log(zoomTargetPosition.getComponent(0), zoomTargetPosition.getComponent(1), zoomTargetPosition.getComponent(2))
        //camera.position.lerp(zoomTargetPosition, 0.05);
        //camera.lookAt(scene.position)

        //we need a new camera to remove the controls when is zooming
        camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.x = zoomTargetPosition.getComponent(0)
        camera.position.y = zoomTargetPosition.getComponent(1)
        camera.position.z = 4

        if(camera.position.distanceTo(zoomTargetPosition) < 5) {
             isZooming =false
        }
    }
    else {
        if(zoomOutflag == true){
            //set the original camera with dynamic controls once zoom out
            camera = originalCamera.clone()
            new OrbitControls(camera, renderer.domElement)
            // camera.position.x = originalCameraPosition.x
            // camera.position.y = originalCameraPosition.y
            // camera.position.z = originalCameraPosition.z
            zoomOutflag = false
        }
    }
    
    renderer.render(scene, camera);
    
}
animate();
