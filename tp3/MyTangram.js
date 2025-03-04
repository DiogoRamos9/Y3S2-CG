import {CGFobject} from '../lib/CGF.js';
import {MyDiamond} from './MyDiamond.js';
import {MyTriangle} from './MyTriangle.js';
import {MyParallelogram} from './MyParallelogram.js';
import {MyTriangleSmall} from './MyTriangleSmall.js';
import {MyTriangleBig} from './MyTriangleBig.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
        this.triangleBig = new MyTriangleBig(scene);

        this.initBuffers();
    }

    display() {
        // Triangle Orange
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI, 0, 0, 1); // escuro
        this.scene.setDiffuse(255 / 255, 128 / 255, 0 / 255, 0);
        this.scene.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.scene.setAmbient(255 / 255, 192 / 255, 203 / 255, 1.0);
        this.triangleSmall.display();
        this.scene.popMatrix();

        // Triangle 2
        this.scene.pushMatrix();
        this.scene.translate(-1, 0.5, 0);
        this.scene.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.scene.setAmbient(1.0, 0.5, 0.0, 1.0);
        this.triangle.display();
        this.scene.popMatrix();

        // Triangle Blue
        this.scene.pushMatrix();
        this.scene.translate(1.5, -0.5, 0);
        this.scene.scale(0.75, 0.75, 0.75);
        this.scene.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.scene.setAmbient(0.0, 0.0, 1.0, 1.0);
        this.triangleBig.display();
        this.scene.popMatrix();

        // Triangle Red
        this.scene.pushMatrix();
        this.scene.translate(-2.75, 0, 0);
        this.scene.scale(0.75, 0.75, 0.75);
        this.scene.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.scene.setAmbient(1.0, 0.0, 0.0, 1.0);
        this.triangleSmall.display();
        this.scene.popMatrix();

        // Triangle 5
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.translate(-4.4, 3.4, 0);
        this.scene.rotate(-Math.PI, 0, 0, 1);
        this.scene.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.scene.setAmbient(160 / 255, 32 / 255, 240 / 255, 1.0);
        this.triangle.display();
        this.scene.popMatrix();

        // Parallelogram Yellow
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(-4.25, -0.25, 0);
        this.scene.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.scene.setAmbient(1.0, 1.0, 0.0, 1.0);
        this.scene.scale(0.75, 0.75, 0.75);
        this.parallelogram.display();
        this.scene.popMatrix();

        // Diamond Green
        var sca = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];

        var trans = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            1.70, 1.65, 0, 1,
        ];

        var rot = [
            Math.cos(-Math.PI / 6), -Math.sin(-Math.PI / 6), 0, 0,
            Math.sin(-Math.PI / 6), Math.cos(-Math.PI / 6), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];

        this.scene.pushMatrix();
        this.scene.multMatrix(sca);
        this.scene.multMatrix(trans);
        this.scene.multMatrix(rot);
        this.scene.setAmbient(0.0, 1.0, 0.0, 1.0);
        this.diamond.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangleSmall.enableNormalViz();
        this.triangleBig.enableNormalViz();
    };

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangleSmall.disableNormalViz();
        this.triangleBig.disableNormalViz();
    };
    
}