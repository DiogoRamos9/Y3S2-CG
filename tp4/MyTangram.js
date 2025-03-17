import {CGFobject, CGFappearance} from '../lib/CGF.js';
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

        

        this.initMaterials();
    }

    initMaterials() {

        // Diamond Material
        this.diamondMaterial = new CGFappearance(this.scene);
        this.diamondMaterial.setAmbient(0.0, 1.0, 0.0, 1.0);

        // Triangle Orange Material
        this.triangleOrangeMaterial = new CGFappearance(this.scene);
        this.triangleOrangeMaterial.setDiffuse(255 / 255, 128 / 255, 0 / 255, 0);
        this.triangleOrangeMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleOrangeMaterial.setAmbient(255 / 255, 192 / 255, 203 / 255, 1.0);

        // Triangle Two Material
        this.triangleTwoMaterial = new CGFappearance(this.scene);
        this.triangleTwoMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleTwoMaterial.setAmbient(1.0, 0.5, 0.0, 1.0);
        
        // Triangle Blue Material
        this.triangleBlueMaterial = new CGFappearance(this.scene);
        this.triangleBlueMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleBlueMaterial.setAmbient(0.0, 0.0, 1.0, 1.0);

        // Triangle Red Material
        this.triangleRedMaterial = new CGFappearance(this.scene);
        this.triangleRedMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleRedMaterial.setAmbient(1.0, 0.0, 0.0, 1.0);

        // Triangle Five Material
        this.triangleFiveMaterial = new CGFappearance(this.scene);
        this.triangleFiveMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleFiveMaterial.setAmbient(160 / 255, 32 / 255, 240 / 255, 1.0);

        // Parallelogram Material
        this.parallelogramMaterial = new CGFappearance(this.scene);
        this.parallelogramMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.parallelogramMaterial.setAmbient(1.0, 1.0, 0.0, 1.0);

        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(0.1, 0.1, 0.1, 1);
        this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.texture.setShininess(10.0);    
        this.texture.loadTexture('images/tangram.png');
    
    }

    display() {
        // Triangle Orange
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI, 0, 0, 1); // escuro
        this.triangleOrangeMaterial.apply();
        this.texture.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();

        // Triangle 2
        this.scene.pushMatrix();
        this.scene.translate(-1, 0.5, 0);
        this.triangleTwoMaterial.apply();
        this.texture.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // Triangle Blue
        this.scene.pushMatrix();
        this.scene.translate(1.5, -0.5, 0);
        this.scene.scale(0.75, 0.75, 0.75);
        this.triangleBlueMaterial.apply();
        this.texture.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        // Triangle Red
        this.scene.pushMatrix();
        this.scene.translate(-2.75, 0, 0);
        this.scene.scale(0.75, 0.75, 0.75);
        this.triangleRedMaterial.apply();
        this.texture.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();

        // Triangle 5
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.translate(-4.4, 3.4, 0);
        this.scene.rotate(-Math.PI, 0, 0, 1);
        this.triangleFiveMaterial.apply();
        this.texture.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // Parallelogram Yellow
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(-4.25, -0.25, 0);
        this.scene.scale(0.75, 0.75, 0.75);
        this.parallelogramMaterial.apply();
        this.texture.apply();
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
        this.diamondMaterial.apply();
        this.texture.apply();
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