// ToneExperiment
// Ira Greenberg
// Bacon Bits Cooperative
// Dallas, TX

// Project Description: 

import { AmbientLight, Color, DirectionalLight, PCFSoftShadowMap, PerspectiveCamera, PointLight, Scene, SpotLight, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ToneExperiment } from './ToneExperiment';
import * as Tone from 'tone'
import { PI, sin } from '../../../PByte3/IJGUtils';

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
//const osc: Tone.Oscillator = new Tone.Oscillator((440), "sine").toDestination();
const osc1 = new Tone.Oscillator().toDestination();
const osc2 = new Tone.Oscillator().toDestination();
const osc3 = new Tone.Oscillator().toDestination();
const osc4 = new Tone.Oscillator().toDestination();
const osc5 = new Tone.Oscillator().toDestination();
const osc6 = new Tone.Oscillator().toDestination();
/****************** Custom geometry *******************/
const te = new ToneExperiment();
scene.add(te);
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
    te.move(time);
    te.print();
    render();
    
    //const osc1 = new Tone.Oscillator().toDestination().start();
    //const osc2 = new Tone.Oscillator().toDestination().start();
    window.addEventListener('mousedown', e => {  
        osc1.start(); osc2.start(); 
        osc3.start(); osc4.start();
        osc5.start(); osc6.start();
    });
    osc1.frequency.rampTo(te.partBlue.pos.y + 500, 2);
    osc2.frequency.rampTo(te.partRed.pos.y + 500, 2);
    osc3.frequency.rampTo(te.partGreen.pos.y + 500, 2);
    osc4.frequency.rampTo(te.partBlack.pos.y + 500, 2);
    osc5.frequency.rampTo(te.partYellow.pos.y + 500, 2);
    osc6.frequency.rampTo(te.partWhite.pos.y + 500, 2);
}

function render() {
    renderer.render(scene, camera);
}
animate();

//window.addEventListener('mousedown', e => { osc1.start(); osc2.start(); });

//window.addEventListener('mousedown', e => { osc1.start(); });
//const osc1 = new Tone.Oscillator().toDestination().start();
//const osc2 = new Tone.Oscillator().toDestination().start();

//attach a click listener to a play button
//document.querySelector('button')?.addEventListener('click', async () => {
  //  await Tone.start()
   //console.log('audio is ready')
//})

//const osc = new Tone.Oscillator().toDestination().start();
//osc.frequency.rampTo(te.partBlue.pos.y + 500,2);


//window.addEventListener('mousedown', e => { osc.start(); });
//window.addEventListener('mousedown', e => { Tone.start(); });

// osc.frequency.rampTo(sin(te.partBlue.pos.y * PI / .05) * 800 + 500, 2); });
//window.addEventListener('mousedown', e => { osc.start();});

//window.addEventListener('mouseup', e => { osc.stop(); });