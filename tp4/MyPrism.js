import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
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

        
        
        let index = 0;
        let vert_posi = 2 * Math.PI / this.slices;
        let vert_posiZ = 1 / this.stacks

        for (let i = 0; i < this.slices; i++) {
            let x1 = Math.cos(i * vert_posi);
            let y1 = Math.sin(i * vert_posi);
            let x2 = Math.cos((i + 1) * vert_posi);
            let y2 = Math.sin((i + 1) * vert_posi);
        
            for (let j = 0; j < this.stacks; j++) {
                let z1 = j * vert_posiZ;
                let z2 = (j + 1) * vert_posiZ;
        
                let nx = Math.cos((i + 0.5) * vert_posi);
                let ny = Math.sin((i + 0.5) * vert_posi);
                let normalSize = Math.sqrt(nx * nx + ny * ny);
        
                this.vertices.push(x1, y1, z1, x2, y2, z1, x1, y1, z2, x2, y2, z2);
                this.indices.push(index + 2, index, index + 1, index + 1, index + 3, index + 2);
                this.normals.push(nx / normalSize, ny / normalSize, 0, nx / normalSize, ny / normalSize, 0, nx / normalSize, ny / normalSize, 0, nx / normalSize, ny / normalSize, 0);
                index += 4;
            }
        }
        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

