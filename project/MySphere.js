import {CGFobject} from '../lib/CGF.js';
/**
* MySphere
*/
export class MySphere extends CGFobject {
    constructor(scene, inside, slices, stacks, fullSphere = true) {
		super(scene);
		this.inside = inside;
		this.slices = slices;
		this.stacks = stacks;
		this.fullSphere = fullSphere;
		this.initBuffers();
	}

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let maxStacks = this.fullSphere ? this.stacks : Math.ceil(this.stacks / 2);

        for (let i = 0; i <= maxStacks; i++) {
            let theta = (i * Math.PI) / this.stacks;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);

            for (let j = 0; j <= this.slices; j++) {
                let phi = (j * 2 * Math.PI) / this.slices;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);

                let x = cosPhi * sinTheta;
                let y = cosTheta;
                let z = sinPhi * sinTheta;
                let u = this.inside ? (j / this.slices) : (1 - j / this.slices);
                let v = i / this.stacks;
                
                this.vertices.push(x, y, z);
                this.normals.push(this.inside ? -x : x, this.inside ? -y : y, this.inside ? -z : z);
                this.texCoords.push(u, v);
            }
        }

        for (let i = 0; i < maxStacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                let first = i * (this.slices + 1) + j;
                let second = first + this.slices + 1;

                if (i !== 0 || this.fullSphere) {
                    this.indices.push(this.inside ? first : second, this.inside ? second : first, first + 1);
                }

                if (i !== (maxStacks - 1) || this.fullSphere) {
                    this.indices.push(this.inside ? second : second + 1, this.inside ? second + 1 : second, first + 1);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


