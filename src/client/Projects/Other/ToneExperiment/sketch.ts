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
//import { Freeverb } from 'tone';

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

const reverb1 = new Tone.Reverb(2.5).toDestination();
const reverb2 = new Tone.Reverb(2).toDestination();
const reverb3 = new Tone.Reverb(2).toDestination();
const reverb4 = new Tone.Reverb(2).toDestination();
const reverb5 = new Tone.Reverb(2).toDestination();
const reverb6 = new Tone.Reverb(2).toDestination();
// === const osc1 = new Tone.Oscillator().toDestination(); // original
const panner1 = new Tone.Panner(1).connect(reverb1);
const osc1 = new Tone.Oscillator().connect(panner1);
//const osc1 = new Tone.MonoSynth({
//	oscillator: {
//		type: "sine"
//	},
//	envelope: {
//		attack: 0.1
//	}
//}).connect(panner1);
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

const synth = new Tone.PolySynth().toDestination();
const chordEvent = new Tone.ToneEvent(((time, chord) => {
	// the chord as well as the exact time of the event
	// are passed in as arguments to the callback function
	synth.triggerAttackRelease(chord, 1, time);
}), ["D4", "E4", "F4"]);
// The bit beow probably goes in animate() to happen
// start the chord at the beginning of the transport timeline
//chordEvent.start();
// loop it every measure for 8 measures
//chordEvent.loop = 8;
//chordEvent.loopEnd = "1m";


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

        //Tone.Transport.start();
        // start the chord at the beginning of the transport timeline
        //chordEvent.start();
        // loop it every measure for 8 measures
        //chordEvent.loop = 20;
        //chordEvent.loopEnd = "1m";
    });
    //let osc1Freq = te.partBlue.pos.y + 500;
    //Tone.Transport.scheduleRepeat(function(time){
     //   osc1.triggerAttackRelease(440, 0.200, time);
     //   }, 0.400);

    //osc1.frequency.rampTo(te.partBlue.pos.y + 500, 0.25);
    osc1.frequency.setValueAtTime(te.partBlue.pos.y + 500, 0.01);
    let blueValX = (te.partBlue.pos.x * 0.0025); 
    if (blueValX > 1.0) {blueValX = 1.0};
    if (blueValX < -1.0) {blueValX = -1.0};
    panner1.pan.setValueAtTime(blueValX, 0.015);
    let blueValZ = ((te.partBlue.pos.z * -1.0) + 400) * 0.00125; 
    if (blueValZ > 1.0) {blueValZ = 1.0};
    if (blueValZ < 0.0) {blueValZ = 0.0};
    reverb1.wet.value = blueValZ;
    
    osc2.frequency.setValueAtTime(te.partRed.pos.y + 500, 0.02);
    let redValX = (te.partRed.pos.x * 0.0025); 
    if (redValX > 1.0) {redValX = 1.0};
    if (redValX < -1.0) {redValX = -1.0};
    panner2.pan.setValueAtTime(redValX, 0.0025); 
    let redValZ = ((te.partRed.pos.z * -1.0) + 400) * 0.00125; 
    if (redValZ > 1.0) {redValZ = 1.0};
    if (redValZ < 0.0) {redValZ = 0.0};
    reverb2.wet.value = redValZ;

    osc3.frequency.setValueAtTime(te.partGreen.pos.y + 500, 0.03);
    let greenValX = (te.partGreen.pos.x * 0.0025); 
    if (greenValX > 1.0) {greenValX = 1.0};
    if (greenValX < -1.0) {greenValX = -1.0};
    panner3.pan.setValueAtTime(greenValX, 0.035); 
    let greenValZ = ((te.partGreen.pos.z * -1.0) + 400) * 0.00125; 
    if (greenValZ > 1.0) {greenValZ = 1.0};
    if (greenValZ < 0.0) {greenValZ = 0.0};
    reverb3.wet.value = greenValZ;

    osc4.frequency.setValueAtTime(te.partBlack.pos.y + 500, 0.04);
    let blackValX = (te.partBlack.pos.x * 0.0025); 
    if (blackValX > 1.0) {blackValX = 1.0};
    if (blackValX < -1.0) {blackValX = -1.0};
    panner4.pan.setValueAtTime(blackValX, 0.045); 
    let blackValZ = ((te.partBlack.pos.z * -1.0) + 400) * 0.00125;
    if (blackValZ > 1.0) {blackValZ = 1.0};
    if (blackValZ < 0.0) {blackValZ = 0.0};
    reverb4.wet.value = blackValZ;

    osc5.frequency.setValueAtTime(te.partYellow.pos.y + 500, 0.05);
    let yellowValX = (te.partYellow.pos.x * 0.0025); 
    if (yellowValX > 1.0) {yellowValX = 1.0};
    if (yellowValX < -1.0) {yellowValX = -1.0};
    panner5.pan.setValueAtTime(yellowValX, 0.055);
    let yellowValZ = ((te.partYellow.pos.z * -1.0) + 400) * 0.00125; 
    if (yellowValZ > 1.0) {yellowValZ = 1.0};
    if (yellowValZ < 0.0) {yellowValZ = 0.0};
    reverb5.wet.value = yellowValZ;

    osc6.frequency.setValueAtTime(te.partWhite.pos.y + 500, 0.06);
    let whiteValX = (te.partYellow.pos.x * 0.0025); 
    if (whiteValX > 1.0) {whiteValX = 1.0};
    if (whiteValX < -1.0) {whiteValX = -1.0};
    panner6.pan.setValueAtTime(whiteValX, 0.065);
    let whiteValZ = ((te.partWhite.pos.z * -1.0) + 400) * 0.00125; 
    if (whiteValZ > 1.0) {whiteValZ = 1.0};
    if (whiteValZ < 0.0) {whiteValZ = 0.0};
    reverb6.wet.value = whiteValZ;
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