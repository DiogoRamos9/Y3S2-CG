import { CGFobject } from '../lib/CGF.js';
import { MyCircle } from './MyCircle.js';
import { MyPlane } from './MyPlane.js';

export class MyRoundedSquare extends CGFobject {
    constructor(scene, size, cornerRadius, slices) {
        super(scene);
        this.size = size; // Tamanho do quadrado
        this.cornerRadius = cornerRadius; // Raio dos cantos arredondados
        this.slices = slices; // Número de divisões para os arcos

        // Componentes
        this.corner = new MyCircle(scene, cornerRadius, slices); // Arco para os cantos
        this.side = new MyPlane(scene); // Retângulo para os lados
    }

    display() {
        const halfSize = this.size / 2;
        const innerSize = this.size - 2 * this.cornerRadius;

        // Canto superior esquerdo
        this.scene.pushMatrix();
        this.scene.translate(-halfSize + this.cornerRadius, halfSize - this.cornerRadius, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.corner.display();
        this.scene.popMatrix();

        // Canto superior direito
        this.scene.pushMatrix();
        this.scene.translate(halfSize - this.cornerRadius, halfSize - this.cornerRadius, 0);
        this.corner.display();
        this.scene.popMatrix();

        // Canto inferior direito
        this.scene.pushMatrix();
        this.scene.translate(halfSize - this.cornerRadius, -halfSize + this.cornerRadius, 0);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.corner.display();
        this.scene.popMatrix();

        // Canto inferior esquerdo
        this.scene.pushMatrix();
        this.scene.translate(-halfSize + this.cornerRadius, -halfSize + this.cornerRadius, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.corner.display();
        this.scene.popMatrix();

        // Lado superior
        this.scene.pushMatrix();
        this.scene.translate(0, halfSize - this.cornerRadius, 0);
        this.scene.scale(innerSize, this.cornerRadius, 1);
        this.side.display();
        this.scene.popMatrix();

        // Lado inferior
        this.scene.pushMatrix();
        this.scene.translate(0, -halfSize + this.cornerRadius, 0);
        this.scene.scale(innerSize, this.cornerRadius, 1);
        this.side.display();
        this.scene.popMatrix();

        // Lado esquerdo
        this.scene.pushMatrix();
        this.scene.translate(-halfSize + this.cornerRadius, 0, 0);
        this.scene.scale(this.cornerRadius, innerSize, 1);
        this.side.display();
        this.scene.popMatrix();

        // Lado direito
        this.scene.pushMatrix();
        this.scene.translate(halfSize - this.cornerRadius, 0, 0);
        this.scene.scale(this.cornerRadius, innerSize, 1);
        this.side.display();
        this.scene.popMatrix();
    }
}