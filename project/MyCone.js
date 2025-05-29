import {CGFobject} from '../lib/CGF.js';
/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCone extends CGFobject {
    constructor(scene, slices, baseRadius, height, topRadius = 0) {
        super(scene);
        this.slices = slices;
        this.baseRadius = baseRadius;
        this.topRadius = topRadius;
        this.height = height;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const angleIncrement = (2 * Math.PI) / this.slices;

        for (let i = 0; i <= this.slices; i++) {
            const angle = i * angleIncrement;
            const xBase = Math.cos(angle) * this.baseRadius;
            const zBase = Math.sin(angle) * this.baseRadius;
            const xTop = Math.cos(angle) * this.topRadius;
            const zTop = Math.sin(angle) * this.topRadius;

            // Base inferior
            this.vertices.push(xBase, 0, zBase);
            this.normals.push(xBase, 0, zBase);
            this.texCoords.push(i / this.slices, 1);

            // Topo
            this.vertices.push(xTop, this.height, zTop);
            this.normals.push(xTop, 0, zTop);
            this.texCoords.push(i / this.slices, 0);
        }

        for (let i = 0; i < this.slices; i++) {
            const base = i * 2;

            // Triangles for the sides
            this.indices.push(base, base + 1, base + 2);
            this.indices.push(base + 1, base + 3, base + 2);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


