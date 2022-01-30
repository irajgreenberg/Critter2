// ToneExperiment02
// Ira Greenberg
// Bacon Bits Cooperative
// Dallas, TX

// Project Description: sound controlled by bot speed

import { AmbientLight, Box3, BoxGeometry, Color, DirectionalLight, Mesh, MeshBasicMaterial, PCFSoftShadowMap, PerspectiveCamera, PointLight, Scene, SpotLight, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { randFloat } from 'three/src/math/MathUtils';
import { PI, sin } from '../../../PByte3/IJGUtils';
import { ToneBot } from './ToneBot';

// create and position camera
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 10000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 1000;

const scene = new Scene();
scene.background = new Color(0x999999);

// main renderer
let renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

/****************** Custom geometry *******************/
// create bounding cube
let gen = new BoxGeometry(800, 800, 800);
let bounds = new Box3(new Vector3(-400, -400, -400), new Vector3(400, 400, 400))
let mat = new MeshBasicMaterial({ color: 0x994422, wireframe: true });
let cubeMesh = new Mesh(gen, mat);
scene.add(cubeMesh);


// create ToneBots
const toneBotCount = 10;
const tbs: ToneBot[] = [];

for (let i = 0; i < toneBotCount; i++) {
    tbs[i] = new ToneBot(new Vector3(0, 0, 0), new Vector3(randFloat(-8, 8), randFloat(-8, 8), randFloat(-8, 8)), 10, new Color(Math.random() * 0xFFFFFF), randFloat(100, 600), "sine");
    tbs[i].setBounds(bounds);
    scene.add(tbs[i]);
}
/******************************************************/

const ambientTexturesLight = new AmbientLight(0xFFFFFF, .7);
scene.add(ambientTexturesLight);

const col2 = 0xffEEEE;
const intensity = 1;
const light = new DirectionalLight(col2, intensity);
light.position.set(15.2, -10.2, 180);
light.castShadow = true;
scene.add(light);

const spot = new SpotLight(0xffffff, 1);
spot.position.set(-2, 100, 150);
spot.castShadow = true;
spot.shadow.radius = 8; //doesn't work with PCFsoftshadows
spot.shadow.bias = -0.0001;
spot.shadow.mapSize.width = 1024 * 4;
spot.shadow.mapSize.height = 1024 * 4;
scene.add(spot);

const pointLt = new PointLight(0xff0000, 1, 200); light.position.set(0, 50, 100); scene.add(pointLt);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    controls.autoRotate = true;

    const time = Date.now();
    for (let i = 0; i < toneBotCount; i++) {
        tbs[i].move(time);
    }

    render();
}

function render() {
    renderer.render(scene, camera);
}
animate();


window.addEventListener('mousedown', e => {
    for (let i = 0; i < toneBotCount; i++) {
        tbs[i].beginSpeak();
    }
});