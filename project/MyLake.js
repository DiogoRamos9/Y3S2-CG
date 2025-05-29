import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyHexagon } from './MyHexagon.js';

export class MyLake extends CGFobject {
    constructor(scene) {
        super(scene);
        this.hexagon = new MyHexagon(scene);

        // Lake material and texture
        this.waterTexture = new CGFtexture(scene, 'texture/water.jpg');
        this.waterMaterial = new CGFappearance(scene);
        this.waterMaterial.setTexture(this.waterTexture);
        this.waterMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.waterMaterial.setAmbient(0.8, 0.8, 0.8, 1.0); 
        this.waterMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0); 
        this.waterMaterial.setSpecular(0.0, 0.0, 0.0, 1.0);
        this.waterMaterial.setShininess(10.0);

    }

    display() {
        this.scene.pushMatrix();
        this.waterMaterial.apply();
        this.scene.scale(5, 5, 1);
        this.hexagon.display();
        this.scene.popMatrix();
    }}