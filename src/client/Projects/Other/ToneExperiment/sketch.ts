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

// Tone Const here  NOTE: effects like reverb first
//const osc: Tone.Oscillator = new Tone.Oscillator((440), "sine").toDestination();
//const osc1 = new Tone.Oscillator().toDestination();
let toneStart = 0;  
const reverb1 = new Tone.Reverb(2).toDestination();
const reverb2 = new Tone.Reverb(2).toDestination();
const reverb3 = new Tone.Reverb(2).toDestination();
const reverb4 = new Tone.Reverb(2).toDestination();
const reverb5 = new Tone.Reverb(2).toDestination();
const reverb6 = new Tone.Reverb(2).toDestination();
// === const osc1 = new Tone.Oscillator().toDestination(); // original
const panner1 = new Tone.Panner(1).connect(reverb1);
const osc1 = new Tone.Oscillator().connect(panner1);
const panner2 = new Tone.Panner(1).connect(reverb2);
const osc2 = new Tone.Oscillator().connect(panner2);
const panner3 = new Tone.Panner(1).connect(reverb3);
const osc3 = new Tone.Oscillator().connect(panner3);
const panner4 = new Tone.Panner(1).connect(reverb4);
const osc4 = new Tone.Oscillator().connect(panner4);
const panner5 = new Tone.Panner(1).connect(reverb5);
const osc5 = new Tone.Oscillator().connect(panner5);
const panner6 = new Tone.Panner(1).connect(reverb6);
const osc6 = new Tone.Oscillator().connect(panner6);
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
        //if (toneStart == 0){
        //Tone.start();
        //toneStart = 1;
        //}
        //console.log("toneStart = ", toneStart);
        
        osc1.start(); //blue
        osc2.start(); //red
        osc3.start(); //green
        osc4.start(); //black
        osc5.start(); //yellow
        osc6.start(); //white
    });

    osc1.frequency.rampTo(te.partBlue.pos.y + 500, 0.25);
    panner1.pan.rampTo(te.partBlue.pos.x * (1/404), 0.001);  // .0025 = 1/400 gets out of range errors
    let BlueZval = ((te.partBlue.pos.z * -1.0) + 400) * 0.00125; 
    if (BlueZval > 1.0) {BlueZval = 1.0};
    if (BlueZval < 0.0) {BlueZval = 0.0};
    reverb1.wet.value = BlueZval;
    
    osc2.frequency.rampTo(te.partRed.pos.y + 500, 0.25);
    panner2.pan.rampTo(te.partRed.pos.x * (1/404), 0.001); 
    let RedZval = ((te.partRed.pos.z * -1.0) + 400) * 0.00125; 
    if (RedZval > 1.0) {RedZval = 1.0};
    if (RedZval < 0.0) {RedZval = 0.0};
    reverb2.wet.value = RedZval;

    osc3.frequency.rampTo(te.partGreen.pos.y + 500, 0.25);
    panner3.pan.rampTo(te.partGreen.pos.x * (1/404), 0.001); 
    let GreenZval = ((te.partGreen.pos.z * -1.0) + 400) * 0.00125; 
    if (GreenZval > 1.0) {GreenZval = 1.0};
    if (GreenZval < 0.0) {GreenZval = 0.0};
    reverb3.wet.value = GreenZval;

    osc4.frequency.rampTo(te.partBlack.pos.y + 500, 0.25);
    panner4.pan.rampTo(te.partBlack.pos.x * (1/404), 0.001); 
    let BlackZval = ((te.partBlack.pos.z * -1.0) + 400) * 0.00125; 
    if (BlackZval > 1.0) {BlackZval = 1.0};
    if (BlackZval < 0.0) {BlackZval = 0.0};
    reverb4.wet.value = BlackZval;

    osc5.frequency.rampTo(te.partYellow.pos.y + 500, 0.25);
    panner5.pan.rampTo(te.partYellow.pos.x * (1/404), 0.001); 
    let YellowZval = ((te.partYellow.pos.z * -1.0) + 400) * 0.00125; 
    if (YellowZval > 1.0) {YellowZval = 1.0};
    if (YellowZval < 0.0) {YellowZval = 0.0};
    reverb5.wet.value = YellowZval;

    osc6.frequency.rampTo(te.partWhite.pos.y + 500, 0.25);
    panner6.pan.rampTo(te.partWhite.pos.x * (1/404), 0.001); 
    let WhiteZval = ((te.partWhite.pos.z * -1.0) + 400) * 0.00125; 
    if (WhiteZval > 1.0) {WhiteZval = 1.0};
    if (WhiteZval < 0.0) {WhiteZval = 0.0};
    reverb6.wet.value = WhiteZval;
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

//window.addEventListener('mouseup', e => { osc.stop(); });git