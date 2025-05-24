import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyUnitCube } from './MyUnitCube.js';
import { MyPyramid } from './MyPyramid.js'; // importa a tua pirâmide

export class MyFire extends CGFobject {
    constructor(scene) {
        super(scene);

        // Material para o fogo
        this.fireTexture = new CGFtexture(scene, 'texture/fire.jpg');
        this.fireMaterial = new CGFappearance(scene);
        this.fireMaterial.setTexture(this.fireTexture);
        this.fireMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.fireMaterial.setAmbient(1.0, 0.5, 0.0, 1.0);
        this.fireMaterial.setDiffuse(1.0, 0.5, 0.0, 1.0);
        this.fireMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.fireMaterial.setShininess(10.0);

        this.cube = new MyUnitCube(scene);
        this.pyramid = new MyPyramid(scene, 8, 20 );
        this.extinguished = false;
    }

    display() {

        if(this.extinguished){
            return;
        }

        this.fireMaterial.apply();

        // Desenha a pirâmide central
        this.scene.pushMatrix();
        this.scene.scale(1, 2, 1); // ajusta a escala da pirâmide se quiseres
        this.pyramid.display();
        this.scene.popMatrix();

        // Cubo 1 - Direita
        this.scene.pushMatrix();
        this.scene.translate(0.3, 0.5, 0.3); // ajusta para encostar à face
        this.scene.scale(0.4, 1, 0.4);
        this.cube.display();
        this.scene.popMatrix();

        // Cubo 2 - Esquerda baixo
        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0.6, 0.2);
        this.scene.scale(0.4, 0.4, 0.4);
        this.cube.display();
        this.scene.popMatrix();

        // Cubo 3 - Esquerda cima

        this.scene.pushMatrix();
        this.scene.translate(-0.1, 1.1, 0.1);
        this.scene.scale(0.4, 0.4, 0.4);
        this.cube.display();
        this.scene.popMatrix();

        // Cubo 4- Trás
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, -0.4);
        this.scene.scale(0.4, 1, 0.4);
        this.cube.display();
        this.scene.popMatrix();
    }
}