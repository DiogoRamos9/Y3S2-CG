import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

export class MyDoor extends CGFobject {
    constructor(scene, texture , texture2) {
        super(scene);
        this.scene = scene;

        this.plane = new MyPlane(scene,64);

        this.material = new CGFappearance(scene); 
        this.material.setTexture(texture); 
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        this.material.setEmission(0.5, 0.5, 0.5, 1.0);

        this.material2 = new CGFappearance(scene);
        this.material2.setTexture(texture2);
        this.material2.setTextureWrap('REPEAT', 'REPEAT');
        this.material2.setEmission(0.5, 0.5, 0.5, 1.0);
    }

    display() {
        // Door
        this.scene.pushMatrix();
        this.material.apply(); 
        this.scene.scale(6,7,10);
        this.plane.display(); 
        this.scene.popMatrix();

        // Door handle
        this.scene.pushMatrix();
        this.material2.apply();
        this.scene.translate(0,5.5,0);
        this.scene.scale(8,3,10);
        this.plane.display();
        this.scene.popMatrix();
    }

}