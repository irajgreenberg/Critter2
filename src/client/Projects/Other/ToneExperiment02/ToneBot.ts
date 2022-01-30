import { Box3, Color, Group, Mesh, MeshPhongMaterial, SphereGeometry, Vector3 } from "three";
import * as Tone from 'tone'
import { ToneOscillatorType } from "tone";

export class ToneBot extends Group {

    pos: Vector3;
    spd: Vector3;
    rad: number
    col: Color;
    freq: number;
    func: ToneOscillatorType;

    osc: Tone.Oscillator;
    mesh: Mesh;
    bounds: Box3 | undefined;

    constructor(pos: Vector3, spd: Vector3, rad: number, col: Color, freq: number, func: ToneOscillatorType) {
        super();
        this.pos = pos;
        this.spd = spd;
        this.rad = rad;
        this.col = col;
        this.freq = freq;
        this.func = func;

        this.osc = new Tone.Oscillator((freq), func).toDestination();

        const geom = new SphereGeometry(this.rad);
        const mat = new MeshPhongMaterial({ color: this.col });
        this.mesh = new Mesh(geom, mat);
        this.add(this.mesh);
    }


    move(time: number): void {
        this.pos.add(this.spd);
        this.mesh.position.setX(this.pos.x)
        this.mesh.position.setY(this.pos.y)
        this.mesh.position.setZ(this.pos.z)
        this.osc.frequency.rampTo(this.spd.y + 500, 2);
        //this.osc.volume.rampTo(this.pos.z, 12);


        if (this.bounds) {
            if (this.pos.x >= this.bounds.max.x) {
                this.pos.x == this.bounds.max.x;
                this.spd.x *= -1;
            } else if (this.pos.x <= this.bounds.min.x) {
                this.pos.x == this.bounds.min.x;
                this.spd.x *= -1;
            }

            if (this.pos.y >= this.bounds.max.y) {
                this.pos.y == this.bounds.max.y;
                this.spd.y *= -1;
            } else if (this.pos.y <= this.bounds.min.y) {
                this.pos.y == this.bounds.min.y;
                this.spd.y *= -1;
            }

            if (this.pos.z >= this.bounds.max.z) {
                this.pos.z == this.bounds.max.z;
                this.spd.z *= -1;
            } else if (this.pos.z <= this.bounds.min.z) {
                this.pos.z == this.bounds.min.z;
                this.spd.z *= -1;
            }
        }

    }

    beginSpeak(): void {
        this.osc.start();
    }

    setBounds(bounds: Box3): void {
        this.bounds = bounds;
    }

}