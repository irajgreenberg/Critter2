// ToneExperiment
// Ira Greenberg
// Bacon Bits Cooperative
// Dallas, TX

import { BoxGeometry, Color, Group, Mesh, MeshBasicMaterial, Vector3 } from "three";
import { randFloat } from "three/src/math/MathUtils";
import { debuglog } from "util";
import { Particle } from "../../../PByte3/IJGUtils";

export class ToneExperiment extends Group {

    cubeMesh: Mesh

    partRed: Particle;
    partBlue: Particle;
    partGreen: Particle;
    partYellow: Particle;
    partBlack: Particle;
    partWhite: Particle;

    parts: Particle[] = [];


    constructor() {
        super();
        let gen = new BoxGeometry(800, 800, 800);
        let mat = new MeshBasicMaterial({ color: 0x994422, wireframe: true });
        this.cubeMesh = new Mesh(gen, mat);
        this.add(this.cubeMesh);

        this.partRed = new Particle(new Vector3(0, 0, 0), new Vector3(randFloat(-5, 5), randFloat(-5, 5), randFloat(-5, 5)), 20, new Color(1, 0, 0));
        this.partBlue = new Particle(new Vector3(0, 0, 0), new Vector3(randFloat(-5, 5), randFloat(-5, 5), randFloat(-5, 5)), 20, new Color(0, 0, 1));
        this.partGreen = new Particle(new Vector3(0, 0, 0), new Vector3(randFloat(-5, 5), randFloat(-5, 5), randFloat(-5, 5)), 20, new Color(0, 1, 0));
        this.partYellow = new Particle(new Vector3(0, 0, 0), new Vector3(randFloat(-5, 5), randFloat(-5, 5), randFloat(-5, 5)), 20, new Color(1, 1, 0));
        this.partBlack = new Particle(new Vector3(0, 0, 0), new Vector3(randFloat(-5, 5), randFloat(-5, 5), randFloat(-5, 5)), 20, new Color(.1, .1, .1));
        this.partWhite = new Particle(new Vector3(0, 0, 0), new Vector3(randFloat(-5, 5), randFloat(-5, 5), randFloat(-5, 5)), 20, new Color(.9, .9, .9));

        this.add(this.partRed);
        this.add(this.partBlue);
        this.add(this.partGreen);
        this.add(this.partYellow);
        this.add(this.partBlack);
        this.add(this.partWhite);

        this.parts.push(this.partRed);
        this.parts.push(this.partBlue);
        this.parts.push(this.partGreen);
        this.parts.push(this.partYellow);
        this.parts.push(this.partWhite);
        this.parts.push(this.partBlack);
    }


    move(time: number) {
        this.partRed.move();
        this.partBlue.move();
        this.partGreen.move();
        this.partYellow.move();
        this.partBlack.move();
        this.partWhite.move();

        for (let i = 0; i < this.parts.length; i++) {
            if (this.parts[i].pos.x >= this.cubeMesh.position.x + 400) {
                this.parts[i].pos.x == this.cubeMesh.position.x + 400;
                this.parts[i].spd.x *= -1;
            } else if (this.parts[i].pos.x <= this.cubeMesh.position.x - 400) {
                this.parts[i].pos.x == this.cubeMesh.position.x - 400;
                this.parts[i].spd.x *= -1;
            }

            if (this.parts[i].pos.y >= this.cubeMesh.position.y + 400) {
                this.parts[i].pos.y == this.cubeMesh.position.y + 400;
                this.parts[i].spd.y *= -1;
            } else if (this.parts[i].pos.y <= this.cubeMesh.position.y - 400) {
                this.parts[i].pos.y == this.cubeMesh.position.y - 400;
                this.parts[i].spd.y *= -1;
            }

            if (this.parts[i].pos.z >= this.cubeMesh.position.z + 400) {
                this.parts[i].pos.z == this.cubeMesh.position.z + 400;
                this.parts[i].spd.z *= -1;
            } else if (this.parts[i].pos.z <= this.cubeMesh.position.z - 400) {
                this.parts[i].pos.z == this.cubeMesh.position.z - 400;
                this.parts[i].spd.z *= -1;
            }
        }
    }


    print() {
        //console.log("**************************************************************************");
        //let maxX: number = 0;
        if (this.partRed.pos.x > 403) {console.log("Red Cube Max x = ", this.partRed.pos.x);};
        if (this.partRed.pos.y > 403) {console.log("Red Cube Max y = ", this.partRed.pos.y);};
        if (this.partRed.pos.z > 403) {console.log("Red Cube Max z = ", this.partRed.pos.z);};
        //console.log("Red Cube Max x = ", maxX);
        //console.log("Red Cube Position x = ", this.partRed.pos.x);
        //console.log("Red Cube Position y = ", this.partRed.pos.y);
        //console.log("Red Cube Position z = ", this.partRed.pos.z);
        //console.log("Red Cube Position = ", this.partRed.pos);
        //console.log("Red Cube Speed = ", this.partRed.spd);
        //console.log("--------------------------------------------------------------------------");
        //console.log("-------------------------------------------------------------------------");
        //console.log("Blue Cube Position y = ", this.partBlue.pos.x);
        //console.log("Blue Cube Position = ", this.partBlue.pos);
        //console.log("Blue Cube Speed = ", this.partBlue.spd);
        //console.log("-------------------------------------------------------------------------");
        //console.log("-------------------------------------------------------------------------");
        //console.log("Green Cube Position = ", this.partGreen.pos)
        //console.log("Green Cube Speed = ", this.partGreen.spd)
        //console.log("-------------------------------------------------------------------------");
        //console.log("-------------------------------------------------------------------------");
        //console.log("Yellow Cube Position = ", this.partYellow.pos)
        //console.log("Yellow Cube Speed = ", this.partYellow.spd)
        //console.log("-------------------------------------------------------------------------");
        //console.log("-------------------------------------------------------------------------");
        //console.log("White Cube Position = ", this.partWhite.pos)
        //console.log("White Cube Speed = ", this.partWhite.spd)
        //console.log("-------------------------------------------------------------------------");
        //console.log("-------------------------------------------------------------------------");
        //console.log("Black Cube Position = ", this.partBlack.pos)
        //console.log("Black Cube Speed = ", this.partBlack.spd)
        //console.log("**************************************************************************");
    }

}



