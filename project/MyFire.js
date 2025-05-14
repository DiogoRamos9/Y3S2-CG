import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';

export class MyFire extends CGFobject {
    constructor(scene) {
        super(scene);
        this.triangle = new MyTriangle(scene);

        // Material para o fogo
        this.fireTexture = new CGFtexture(scene, 'texture/fire.jpg');
        this.fireMaterial = new CGFappearance(scene);
        this.fireMaterial.setTexture(this.fireTexture);
        this.fireMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.fireMaterial.setAmbient(1.0, 0.5, 0.0, 1.0);
        this.fireMaterial.setDiffuse(1.0, 0.5, 0.0, 1.0);
        this.fireMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.fireMaterial.setShininess(10.0);
    }

    display() {
        this.scene.pushMatrix();
        this.fireMaterial.apply();

        // Triângulo 1
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.scale(1, 2, 1);
        this.triangle.display();
        this.scene.popMatrix();

        // Triângulo 2 (rotacionado)
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 3, 0, 1, 0);
        this.scene.scale(1, 2, 1);
        this.triangle.display();
        this.scene.popMatrix();

        // Triângulo 3 (rotacionado)
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 3, 0, 1, 0);
        this.scene.scale(1, 2, 1);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}