import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3;

const loader = new GLTFLoader();
loader.load('./DamagedHelmet.gltf', (gltf)=> {
    scene.add(gltf.scene);
}, undefined, (error)=> {
    console.error('error')
})

// objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
    antialias: true,
});

// orbit controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

// handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// animation loop
function anima() {
    window.requestAnimationFrame(anima);
    
    // mesh.rotation.x += 0.01;

    renderer.render(scene, camera);
};

anima();
