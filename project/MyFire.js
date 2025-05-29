import { CGFobject, CGFappearance, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyUnitCube } from './MyUnitCube.js';
import { MyPyramid } from './MyPyramid.js'; // importa a tua pirâmide

export class MyFire extends CGFobject {
    constructor(scene) {
        super(scene);

        // Fire material and texture
        this.fireTexture = new CGFtexture(scene, 'texture/fire.jpg');
        this.fireMaterial = new CGFappearance(scene);
        this.fireMaterial.setTexture(this.fireTexture);
        this.fireMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.fireMaterial.setAmbient(1.0, 0.5, 0.0, 1.0);
        this.fireMaterial.setDiffuse(1.0, 0.5, 0.0, 1.0);
        this.fireMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.fireMaterial.setShininess(10.0);

        // Initialize the fire shader and objects
        this.fireShader = null;
        this.cube = new MyUnitCube(scene);
        this.pyramid = new MyPyramid(scene, 8, 20 );
        this.extinguished = false;
    }

    initShaders(scene) {
        this.fireShader = new CGFshader(scene.gl, 'shaders/fire.vert', 'shaders/fire.frag');
        this.fireShader.setUniformsValues({ uTime: 0 });
    }

    display() {
        if(this.extinguished){
            return;
        }

        this.scene.setActiveShader(this.fireShader);
        this.fireMaterial.apply();

        // Draw central pyramid
        this.scene.pushMatrix();
        this.scene.scale(1, 2, 1);
        this.pyramid.display();
        this.scene.popMatrix();

        // Cube 1 - right bottom
        this.scene.pushMatrix();
        this.scene.translate(0.3, 0.5, 0.3);
        this.scene.scale(0.4, 1, 0.4);
        this.cube.display();
        this.scene.popMatrix();

        // Cube 2 - left bottom
        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0.6, 0.2);
        this.scene.scale(0.4, 0.4, 0.4);
        this.cube.display();
        this.scene.popMatrix();

        // Cube 3 - left top
        this.scene.pushMatrix();
        this.scene.translate(-0.1, 1.1, 0.1);
        this.scene.scale(0.4, 0.4, 0.4);
        this.cube.display();
        this.scene.popMatrix();

        // Cube 4 - back
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, -0.4);
        this.scene.scale(0.4, 1, 0.4);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);

    }
}