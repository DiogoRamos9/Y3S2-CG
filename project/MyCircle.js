import { CGFobject } from '../../lib/CGF.js';

export class MyCircle extends CGFobject {
    constructor(scene, radius, slices) {
        super(scene);
        this.radius = radius || 1;
        this.slices = slices || 20;
        
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const theta = (2 * Math.PI) / this.slices;

        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, 1);
        this.texCoords.push(0.5, 0.5); 
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, -1); 
        this.texCoords.push(0.5, 0.5); 

        for (let i = 0; i <= this.slices; i++) {
            const x = this.radius * Math.cos(i * theta);
            const y = this.radius * Math.sin(i * theta);

            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, 1); 
            this.texCoords.push(0.5 + 0.5 * Math.cos(i * theta), 0.5 - 0.5 * Math.sin(i * theta));
            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, -1);
            this.texCoords.push(0.5 + 0.5 * Math.cos(i * theta), 0.5 - 0.5 * Math.sin(i * theta));
        }

        for (let i = 1; i <= this.slices; i++) {
            this.indices.push(0, i * 2, ((i % this.slices) * 2) + 2);
        }

        for (let i = 1; i <= this.slices; i++) {
            this.indices.push(1, ((i % this.slices) * 2) + 3, i * 2 + 1);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}