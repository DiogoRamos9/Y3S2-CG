import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyQuarterCircle } from './MyQuarterCircle.js';
import { MyPlane } from './MyPlane.js';

export class MyRoundedSquare extends CGFobject {
    constructor(scene, size = 1, radius = 0.2) {
        super(scene);
        this.size = size;
        this.radius = radius;

        this.center = new MyPlane(scene, 10);
        this.edge = new MyPlane(scene, 10);
        this.corner = new MyQuarterCircle(scene, 1, 10); 
        
        this.edgeMaterial = new CGFappearance(scene);
        this.edgeMaterial.setAmbient(0, 0, 0, 1.0);
        this.edgeMaterial.setDiffuse(0, 0, 0, 1.0);
        this.edgeMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.edgeMaterial.setShininess(10.0);
        
        this.centerTexture = new CGFtexture(scene, 'texture/cabin.jpg');
        this.centerMaterial = new CGFappearance(scene);
        this.centerMaterial.setTexture(this.centerTexture);
        this.centerMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.centerMaterial.setAmbient(0.4, 0.4, 0.4, 1.0);
        this.centerMaterial.setDiffuse(0.4, 0.4, 0.4, 1.0);
        this.centerMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.centerMaterial.setShininess(10.0);
    }

    display() {
        const s = this.size / 2;
        const r = this.radius * 0.3;

        // Center
        this.scene.pushMatrix();
        this.scene.scale(this.size - 2 * r, this.size - 2 * r, 1);
        this.centerMaterial.apply();
        this.center.display();
        this.scene.popMatrix();

        // Top border
        this.scene.pushMatrix();
        this.scene.translate(0, s - r / 2, 0);
        this.scene.scale(this.size - 2 * r, r, 1);
        this.edgeMaterial.apply();
        this.edge.display();
        this.scene.popMatrix();

        // Bottom border
        this.scene.pushMatrix();
        this.scene.translate(0, -s + r / 2, 0);
        this.scene.scale(this.size - 2 * r, r, 1);
        this.edgeMaterial.apply();
        this.edge.display();
        this.scene.popMatrix();

        // Left border
        this.scene.pushMatrix();
        this.scene.translate(-s + r / 2, 0, 0);
        this.scene.scale(r, this.size - 2 * r, 1);
        this.edgeMaterial.apply();
        this.edge.display();
        this.scene.popMatrix();

        // Right border
        this.scene.pushMatrix();
        this.scene.translate(s - r / 2, 0, 0);
        this.scene.scale(r, this.size - 2 * r, 1);
        this.edgeMaterial.apply();
        this.edge.display();
        this.scene.popMatrix();

        // Top left
        this.scene.pushMatrix();
        this.scene.translate(-s + r, s - r, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(r, r, 1);
        this.corner.display();
        this.scene.popMatrix();

        // Top right
        this.scene.pushMatrix();
        this.scene.translate(s - r, s - r, 0);
        this.scene.scale(r, r, 1);
        this.corner.display();
        this.scene.popMatrix();

        // Bottom right
        this.scene.pushMatrix();
        this.scene.translate(s - r, -s + r, 0);
        this.scene.rotate(3 * Math.PI / 2, 0, 0, 1);
        this.scene.scale(r, r, 1);
        this.corner.display();
        this.scene.popMatrix();

        // Bottom left
        this.scene.pushMatrix();
        this.scene.translate(-s + r, -s + r, 0);
        this.scene.rotate(Math.PI, 0, 0, 1); 
        this.scene.scale(r, r, 1);
        this.corner.display();
        this.scene.popMatrix();
    }
}
