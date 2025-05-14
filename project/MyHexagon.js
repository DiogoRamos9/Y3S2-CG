import { CGFobject } from '../lib/CGF.js';

export class MyHexagon extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 1, 0,   // V0
            Math.sqrt(3) / 2, 0.5, 0,   // V1
            Math.sqrt(3) / 2, -0.5, 0,  // V2
            0, -1, 0,  // V3
            -Math.sqrt(3) / 2, -0.5, 0, // V4
            -Math.sqrt(3) / 2, 0.5, 0   // V5
        ];

        this.indices = [
            0, 1, 5,
            1, 2, 5,
            2, 3, 5,
            3, 4, 5,

            5, 1, 0,  // Verso
            5, 2, 1,
            5, 3, 2,
            5, 4, 3
        ];

        this.normals = [
            1, 0, 0, // Normal para V0
            1, 0, 0, // Normal para V1
            1, 0, 0, // Normal para V2
            1, 0, 0, // Normal para V3
            1, 0, 0, // Normal para V4
            1, 0, 0  // Normal para V5

            -1, 0, 0, // Normal para V0
            -1, 0, 0, // Normal para V1
            -1, 0, 0, // Normal para V2
            -1, 0, 0, // Normal para V3
            -1, 0, 0, // Normal para V4
            -1, 0, 0  // Normal para V5
        ];
        this.texCoords = [
            0.5, 1,
            1, 0.75,
            1, 0.25,
            0.5, 0,
            0, 0.25,
            0, 0.75
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}