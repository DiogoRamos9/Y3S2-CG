import {CGFobject} from '../lib/CGF.js';

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        let vert_posi = 2 * Math.PI / this.slices;
        let vert_posiZ = 1 / this.stacks;

        for (let i = 0; i <= this.slices; i++) {
            let x = Math.cos(i * vert_posi);
            let y = Math.sin(i * vert_posi);

            for (let j = 0; j <= this.stacks; j++) {
            let z = j * vert_posiZ;

            this.vertices.push(x, y, z);
            this.normals.push(x, y, 0);
            }
        }

        for (let i = 0; i < this.slices; i++) {
            for (let j = 0; j < this.stacks; j++) {
            let first = i * (this.stacks + 1) + j;
            let second = first + this.stacks + 1;

            this.indices.push(first, second, first + 1);
            this.indices.push(second, second + 1, first + 1);
            }
        }

        // Normalize normals
        for (let i = 0; i < this.normals.length; i += 3) {
            let length = Math.sqrt(this.normals[i] * this.normals[i] + this.normals[i + 1] * this.normals[i + 1] + this.normals[i + 2] * this.normals[i + 2]);
            this.normals[i] /= length;
            this.normals[i + 1] /= length;
            this.normals[i + 2] /= length;
        }

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}
