import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyCone } from './MyCone.js';
import { MyPyramid } from './MyPyramid.js';

export class MyTree extends CGFobject {
    constructor(scene, treeInclination, xInclination, trunkRadius, treeHeight, treeTopColor) {
        super(scene);
        this.scene = scene;

        this.treeInclination = treeInclination; // Angle of inclination for the tree
        this.xInclination = xInclination; // Axis of inclination (X or Z)
        this.trunkRadius = trunkRadius; // Radius of the trunk base
        this.treeHeight = treeHeight; // Total height of the tree
        this.treeTopColor = treeTopColor; // Color of the top of the tree in RGB

        // Calculate derived parameters for the cup
        this.cupHeight = 0.8 * this.treeHeight; // Height of the cup (80% of the tree height)
        this.numPyramids = Math.ceil(this.cupHeight / 2); // Number of pyramids based on cup height
        this.cupBaseRadius = this.trunkRadius * 2; // Base radius of the largest pyramid

        // Create the trunk
        this.trunk = new MyCone(scene, 100, this.trunkRadius, this.treeHeight - this.cupHeight, this.trunkRadius * 0.8);

        // Create the cup (array of pyramids)
        this.cup = [];
        for (let i = 0; i < this.numPyramids; i++) {
            const scaleFactor = 1 - i / this.numPyramids; // Gradual reduction in size
            const radius = this.cupBaseRadius * scaleFactor;
            const height = this.cupHeight / this.numPyramids;
            this.cup.push(new MyPyramid(scene, 8, radius, height));
        }

        // Create appearances for trunk and cup
        this.trunkAppearance = new CGFappearance(scene);
        this.trunkAppearance.setAmbient(0.4, 0.2, 0.1, 1.0); // Brown color
        this.trunkAppearance.setDiffuse(0.4, 0.2, 0.1, 1.0);
        this.trunkAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.trunkAppearance.setShininess(10.0);

        this.cupAppearance = new CGFappearance(scene);
        this.cupAppearance.setAmbient(this.treeTopColor[0], this.treeTopColor[1], this.treeTopColor[2], 1.0); // Green color
        this.cupAppearance.setDiffuse(this.treeTopColor[0], this.treeTopColor[1], this.treeTopColor[2], 1.0);
        this.cupAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.cupAppearance.setShininess(10.0);
        this.cupAppearance.setAmbient(this.treeTopColor[0] * 0.5, this.treeTopColor[1] * 0.5, this.treeTopColor[2] * 0.5, 1.0); // Darker green
        this.cupAppearance.setDiffuse(this.treeTopColor[0] * 0.5, this.treeTopColor[1] * 0.5, this.treeTopColor[2] * 0.5, 1.0);
    }

    display() {
        // Apply inclination transformation
        this.scene.pushMatrix();
        if (this.xInclination) {
            this.scene.rotate(this.treeInclination, 1, 0, 0); // Rotate around X-axis
        } else {
            this.scene.rotate(this.treeInclination, 0, 0, 1); // Rotate around Z-axis
        }
    
        // Display the trunk
        this.scene.pushMatrix();
        this.trunkAppearance.apply();
        this.scene.scale(1, this.treeHeight - this.cupHeight, 1); // Scale the trunk to match its height
        this.trunk.display();
        this.scene.popMatrix();
    
        // Display the cup (stack of pyramids with overlap)
        // Display the cup (stack of pyramids with overlap)
        for (let i = 0; i < this.numPyramids; i++) {
            // Calcular o deslocamento vertical para cada pirâmide
            const heightOffset = this.treeHeight - this.cupHeight + i * (this.cupHeight / this.numPyramids) * 0.35; // Ajuste para sobreposição (0.7 factor)
            
            // Calcular o fator de escala para reduzir gradualmente o tamanho das pirâmides
            const scaleFactor = 1 - i / this.numPyramids;

            this.scene.pushMatrix();
            this.scene.translate(0, heightOffset, 0); // Posicionar cada pirâmide
            this.scene.scale(scaleFactor, 1, scaleFactor); // Escalar a pirâmide
            this.cupAppearance.apply();
            this.cup[i].display();
            this.scene.popMatrix();
        }
    
        this.scene.popMatrix();
    }
}