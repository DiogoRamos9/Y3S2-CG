import { CGFobject } from '../lib/CGF.js';
import { MyTree } from './MyTree.js';

export class MyForest extends CGFobject {
    constructor(scene, rows, cols, areaWidth, areaHeight) {
        super(scene);
        this.scene = scene;
        this.rows = rows;
        this.cols = cols;
        this.areaWidth = areaWidth;
        this.areaHeight = areaHeight;

        this.trees = [];

        // Generate trees with random parameters to create a forest
        const cellWidth = this.areaWidth / this.cols;
        const cellHeight = this.areaHeight / this.rows;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                // Random parameters for each tree
                const treeInclination = Math.random() * 0.1;
                const xInclination = Math.random() < 0.5;
                const trunkRadius = 0.2 + Math.random() * 0.3;
                const treeHeight = 2 + Math.random() * 3;
                const treeTopColor = [
                    0.1 + Math.random() * 0.4,  // Random red
                    0.5 + Math.random() * 0.5,  // Random green
                    0.1 + Math.random() * 0.2,  // Random blue
                ];

                // Random offsets for tree position
                const offsetX = (Math.random() - 0.5) * cellWidth * 0.5;
                const offsetZ = (Math.random() - 0.5) * cellHeight * 0.5;

                // Calculate the position of the tree
                const x = j * cellWidth - this.areaWidth / 2 + offsetX;
                const z = i * cellHeight - this.areaHeight / 2 + offsetZ;

                // Create the tree and add it to the forest
                const tree = new MyTree(scene, treeInclination, xInclination, trunkRadius, treeHeight, treeTopColor);
                this.trees.push({ tree, x, z });
            }
        }
    }

    display() {
        // Display each tree in the forest
        for (const { tree, x, z } of this.trees) {
            this.scene.pushMatrix();
            this.scene.translate(x, 0, z);
            tree.display();
            this.scene.popMatrix();
        }
    }
}