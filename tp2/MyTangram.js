import {CGFobject} from '../lib/CGF.js';
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
    }

    display() {
        // Triangle 1?
        this.pushMatrix();
        this.translate(0, 0.5, 0);
        this.rotate(Math.PI, 0, 0, 1); // escuro
        this.triangleSmall.display();
        this.popMatrix();

        // Triangle 2
        this.pushMatrix();
        this.translate(-1, 0.5, 0);
        this.triangle.display();
        this.popMatrix();

        // Triangle 3
        this.pushMatrix();
        this.translate(1.5, -0.5, 0);
        this.scale(0.75, 0.75, 0.75);
        this.triangleBig.display();
        this.popMatrix();

        // Triangle 4
        this.pushMatrix();
        this.translate(-2.75, 0, 0);
        this.scale(0.75, 0.75, 0.75);
        this.triangleSmall.display();
        this.popMatrix();

        // Triangle 5?
        this.pushMatrix();
        this.rotate(Math.PI, 1, -1, 0);
        this.scale(0.5, 0.5, 0.5);
        this.translate(-3, 3, 0);
        this.triangle.display();
        this.popMatrix();

        // Parallelogram?
        this.pushMatrix();
        this.rotate(Math.PI, 0, 1, 0);
        this.translate(-4.25, -0.25, 0);
        this.scale(0.75, 0.75, 0.75);
        this.parallelogram.display();
        this.popMatrix();

        // Diamond
        var sca = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
        ]

        var trans = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        2, 1.62, 0, 1,
        ]

        var rot = [
        Math.cos(-Math.PI / 6), -Math.sin(-Math.PI / 6), 0, 0,
        Math.sin(-Math.PI / 6), Math.cos(-Math.PI / 6), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
        ]
        this.pushMatrix();
        this.multMatrix(sca);
        this.multMatrix(trans);
        this.multMatrix(rot);
        this.diamond.display();
        this.popMatrix();
    }
}