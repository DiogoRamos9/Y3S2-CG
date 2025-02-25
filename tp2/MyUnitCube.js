import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [
            -0.5, -0.5, 0.5,	//0
            -0.5, -0.5, -0.5,	//1
            -0.5, 0.5, -0.5,	//2
            -0.5, 0.5, 0.5,   //3
            0.5, -0.5, 0.5,    //4
            0.5, -0.5, -0.5,   //5
            0.5, 0.5, -0.5,   //6
            0.5, 0.5, 0.5     //7           

        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            // Left Face
            1, 3, 2,
            1, 0, 3,

            2 ,3 ,1,
            3, 0, 1,

            // Front Face

            0, 4, 7,
            7, 4, 0,

            0, 7, 3,
            3, 7, 0,

            // Right Face

            4, 5, 6,
            6, 7, 4,

            6, 5, 4,
            4, 7, 6,

            // Back Face

            5, 1, 2,
            2, 6, 5,

            2, 1, 5,
            5, 6, 2,

            // Top Face

            3, 7, 6,
            6, 2, 3,

            6, 7, 3,
            3, 2, 6,

            // Bottom Face

            0, 1, 5,
            5, 4, 0,

            5, 1, 0,
            0, 4, 5
 
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

