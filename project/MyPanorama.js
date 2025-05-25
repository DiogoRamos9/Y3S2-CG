import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPanorama extends CGFobject {
    constructor(scene, normalTexture) {
        super(scene);
        this.scene = scene;

    
        this.sphere = new MySphere(scene, true, 64, 32);

        
        this.material = new CGFappearance(scene);
        this.material.setEmission(1.0, 1.0, 1.0, 1.0); // Apenas emissiva
        this.material.setTexture(normalTexture); 
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0],this.scene.camera.position[1],this.scene.camera.position[2]) 
        this.scene.scale(200, 200, 200); 
        this.material.apply(); 
        this.sphere.display(); 
        this.scene.popMatrix();
    }
}