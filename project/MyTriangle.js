import { CGFobject } from '../lib/CGF.js';

export class MyTriangle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 1, 0,  // Vértice superior
            -1, 0, 0, // Vértice inferior esquerdo
            1, 0, 0   // Vértice inferior direito
        ];

        this.indices = [
            0, 1, 2, // Triângulo
            2, 1, 0
        ];

        this.normals = [
            0, 0, 1, // Normal para o vértice superior
            0, 0, 1, // Normal para o vértice inferior esquerdo
            0, 0, 1,  // Normal para o vértice inferior direito

            0, 0, -1, // Normal para o vértice superior (verso)
            0, 0, -1, // Normal para o vértice inferior esquerdo (verso)
            0, 0, -1  // Normal para o vértice inferior direito (verso)
        ];

        this.texCoords = [
            0.5, 1,   // Coordenada de textura para o vértice superior
            0, 0,     // Coordenada de textura para o vértice inferior esquerdo
            1, 0      // Coordenada de textura para o vértice inferior direito
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}