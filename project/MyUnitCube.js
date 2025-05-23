import { CGFobject } from '../lib/CGF.js';

export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            // Frente
            -0.5, -0.5,  0.5, // 0
             0.5, -0.5,  0.5, // 1
             0.5,  0.5,  0.5, // 2
            -0.5,  0.5,  0.5, // 3
            // Trás
            -0.5, -0.5, -0.5, // 4
             0.5, -0.5, -0.5, // 5
             0.5,  0.5, -0.5, // 6
            -0.5,  0.5, -0.5, // 7
        ];

        this.indices = [
            // Frente
            0, 1, 2,
            2, 3, 0,
            // Direita
            1, 5, 6,
            6, 2, 1,
            // Trás
            5, 4, 7,
            7, 6, 5,
            // Esquerda
            4, 0, 3,
            3, 7, 4,
            // Topo
            3, 2, 6,
            6, 7, 3,
            // Base
            4, 5, 1,
            1, 0, 4
        ];

        this.normals = [
            // Frente
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            // Trás
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
        ];

        this.texCoords = [
            // Frente (0,1,2,3)
            0, 0,
            1, 0,
            1, 1,
            0, 1,
            // Trás (4,5,6,7)
            1, 0,
            0, 0,
            0, 1,
            1, 1,
        ];

        // Repete as texCoords para cada face (6 faces * 4 vértices)
        this.texCoords = [
            // Frente
            0, 0, 1, 0, 1, 1, 0, 1,
            // Direita
            0, 0, 1, 0, 1, 1, 0, 1,
            // Trás
            0, 0, 1, 0, 1, 1, 0, 1,
            // Esquerda
            0, 0, 1, 0, 1, 1, 0, 1,
            // Topo
            0, 0, 1, 0, 1, 1, 0, 1,
            // Base
            0, 0, 1, 0, 1, 1, 0, 1,
        ];

        // E duplica os vértices para cada face (24 vértices no total)
        this.vertices = [
            // Frente
            -0.5, -0.5,  0.5,
             0.5, -0.5,  0.5,
             0.5,  0.5,  0.5,
            -0.5,  0.5,  0.5,
            // Direita
             0.5, -0.5,  0.5,
             0.5, -0.5, -0.5,
             0.5,  0.5, -0.5,
             0.5,  0.5,  0.5,
            // Trás
             0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,
            -0.5,  0.5, -0.5,
             0.5,  0.5, -0.5,
            // Esquerda
            -0.5, -0.5, -0.5,
            -0.5, -0.5,  0.5,
            -0.5,  0.5,  0.5,
            -0.5,  0.5, -0.5,
            // Topo
            -0.5,  0.5,  0.5,
             0.5,  0.5,  0.5,
             0.5,  0.5, -0.5,
            -0.5,  0.5, -0.5,
            // Base
            -0.5, -0.5, -0.5,
             0.5, -0.5, -0.5,
             0.5, -0.5,  0.5,
            -0.5, -0.5,  0.5,
        ];

        this.normals = [
            // Frente
            0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
            // Direita
            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
            // Trás
            0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
            // Esquerda
            -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
            // Topo
            0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
            // Base
            0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
        ];

        this.indices = [
            0, 1, 2, 2, 3, 0,       // Frente
            4, 5, 6, 6, 7, 4,       // Direita
            8, 9,10,10,11, 8,       // Trás
           12,13,14,14,15,12,       // Esquerda
           16,17,18,18,19,16,       // Topo
           20,21,22,22,23,20        // Base
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}