import { CGFobject } from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene, baseRadius, topRadius, height, slices, stacks) {
        super(scene);
        this.baseRadius = baseRadius || 1;
        this.topRadius = topRadius || 1;
        this.height = height || 1;
        this.slices = slices || 20;
        this.stacks = stacks || 1;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const angleIncrement = (2 * Math.PI) / this.slices;
        const heightIncrement = this.height / this.stacks;

        // Generate vertices, normals, and texture coordinates for the sides
        for (let stack = 0; stack <= this.stacks; stack++) {
            const currentHeight = stack * heightIncrement;
            const radius = this.baseRadius + (stack / this.stacks) * (this.topRadius - this.baseRadius);

            for (let slice = 0; slice <= this.slices; slice++) {
                const angle = slice * angleIncrement;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                this.vertices.push(x, currentHeight, z);
                this.normals.push(x, 0, z);
                this.texCoords.push(slice / this.slices, stack / this.stacks);
            }
        }

        // Generate indices for the sides
        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                const first = stack * (this.slices + 1) + slice;
                const second = first + this.slices + 1;

                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
            }
        }

        
        const bottomCenterIndex = this.vertices.length / 3;
        this.vertices.push(0, 0, 0); 
        this.normals.push(0, -1, 0);
        this.texCoords.push(0.5, 0.5);

        for (let slice = 0; slice <= this.slices; slice++) {
            const angle = slice * angleIncrement;
            const x = Math.cos(angle) * this.baseRadius;
            const z = Math.sin(angle) * this.baseRadius;

            this.vertices.push(x, 0, z);
            this.normals.push(0, -1, 0);
            this.texCoords.push(0.5 + 0.5 * Math.cos(angle), 0.5 - 0.5 * Math.sin(angle));

            if (slice > 0) {
                this.indices.push(bottomCenterIndex, bottomCenterIndex + slice, bottomCenterIndex + slice + 1);
            }
        }

        
        const topCenterIndex = this.vertices.length / 3;
        this.vertices.push(0, this.height, 0); 
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5, 0.5);

        for (let slice = 0; slice <= this.slices; slice++) {
            const angle = slice * angleIncrement;
            const x = Math.cos(angle) * this.topRadius;
            const z = Math.sin(angle) * this.topRadius;

            this.vertices.push(x, this.height, z);
            this.normals.push(0, 1, 0);
            this.texCoords.push(0.5 + 0.5 * Math.cos(angle), 0.5 - 0.5 * Math.sin(angle));

            if (slice > 0) {
                this.indices.push(topCenterIndex, topCenterIndex + slice + 1, topCenterIndex + slice);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}