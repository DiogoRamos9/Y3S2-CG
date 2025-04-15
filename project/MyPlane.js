import {CGFobject} from '../lib/CGF.js';
/**
* MyPlane
* @constructor
 * @param scene - Reference to MyScene object
 * @param nDivs - number of divisions in both directions of the surface
 * @param minS - minimum texture coordinate in S
 * @param maxS - maximum texture coordinate in S
 * @param minT - minimum texture coordinate in T
 * @param maxT - maximum texture coordinate in T
*/
export class MyPlane extends CGFobject {
	constructor(scene, nrDivs, minS, maxS, minT, maxT) {
		super(scene);
		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;
		this.nrDivs = nrDivs;
		this.patchLength = 1.0 / nrDivs;
		this.minS = minS || 0;
		this.maxS = maxS || 1;
		this.minT = minT || 0;
		this.maxT = maxT || 1;
		this.q = (this.maxS - this.minS) / this.nrDivs;
		this.w = (this.maxT - this.minT) / this.nrDivs;
		this.initBuffers();
	}
	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];
		var yCoord = 0.5;
		for (var j = 0; j <= this.nrDivs; j++) {
			var xCoord = -0.5;
			for (var i = 0; i <= this.nrDivs; i++) {
				this.vertices.push(xCoord, yCoord, 0);
				this.normals.push(0, 0, 1); // Normals for front face
				this.texCoords.push(this.minS + i * this.q, this.minT + j * this.w);
				xCoord += this.patchLength;
			}
			yCoord -= this.patchLength;
		}
	
		// Duplicate normals for back faces (inverted)
		const originalVertices = [...this.vertices];
		const originalNormals = [...this.normals];
		for (let i = 0; i < originalVertices.length; i += 3) {
			this.vertices.push(originalVertices[i], originalVertices[i + 1], originalVertices[i + 2]); // Duplicar vértices
			this.normals.push(-originalNormals[i], -originalNormals[i + 1], -originalNormals[i + 2]); // Normais invertidas
		}
	
		// Generating indices
		this.indices = [];
		var ind = 0;
		for (var j = 0; j < this.nrDivs; j++) {
			for (var i = 0; i <= this.nrDivs; i++) {
				this.indices.push(ind);
				this.indices.push(ind + this.nrDivs + 1);
				ind++;
			}
			if (j + 1 < this.nrDivs) {
				this.indices.push(ind + this.nrDivs);
				this.indices.push(ind);
			}
		}
	
		// Duplicate indices for back faces (inverted order)
		const originalIndices = [...this.indices];
		for (let i = 0; i < originalIndices.length; i += 2) {
			this.indices.push(originalIndices[i + 1], originalIndices[i]);
		}
	
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	}

	setFillMode() { 
		this.primitiveType=this.scene.gl.TRIANGLE_STRIP;
	}

	setLineMode() 
	{ 
		this.primitiveType=this.scene.gl.LINES;
	};

}


