import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

export class MyWindow extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.scene = scene;

        this.plane = new MyPlane(scene,64);

        this.material = new CGFappearance(scene); 
        this.material.setTexture(texture); 
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        this.material.setEmission(0.5, 0.5, 0.5, 1.0);
    }

    display() {
        this.scene.pushMatrix();
        this.material.apply(); 
        this.scene.scale(3,3,3);
        this.plane.display(); 
        this.scene.popMatrix();
    }
}