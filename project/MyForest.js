import { CGFobject } from '../lib/CGF.js';
import { MyTree } from './MyTree.js';

export class MyForest extends CGFobject {
    constructor(scene, rows, cols, areaWidth, areaHeight) {
        super(scene);
        this.scene = scene;
        this.rows = rows; // Número de linhas
        this.cols = cols; // Número de colunas
        this.areaWidth = areaWidth; // Largura da área arborizada
        this.areaHeight = areaHeight; // Altura da área arborizada

        this.trees = [];

        // Gerar árvores com parâmetros aleatórios
        const cellWidth = this.areaWidth / this.cols;
        const cellHeight = this.areaHeight / this.rows;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                // Parâmetros aleatórios para cada árvore
                const treeInclination = Math.random() * 0.1; // Inclinação entre 0 e 0.1 radianos
                const xInclination = Math.random() < 0.5; // Aleatório entre eixo X ou Z
                const trunkRadius = 0.2 + Math.random() * 0.3; // Raio do tronco entre 0.2 e 0.5
                const treeHeight = 2 + Math.random() * 3; // Altura da árvore entre 2 e 5
                const treeTopColor = [
                    0.1 + Math.random() * 0.4, // Verde (R)
                    0.5 + Math.random() * 0.5, // Verde (G)
                    0.1 + Math.random() * 0.2, // Verde (B)
                ];

                // Offset aleatório na posição
                const offsetX = (Math.random() - 0.5) * cellWidth * 0.5;
                const offsetZ = (Math.random() - 0.5) * cellHeight * 0.5;

                // Posição da árvore na matriz
                const x = j * cellWidth - this.areaWidth / 2 + offsetX;
                const z = i * cellHeight - this.areaHeight / 2 + offsetZ;

                // Criar e armazenar a árvore
                const tree = new MyTree(scene, treeInclination, xInclination, trunkRadius, treeHeight, treeTopColor);
                this.trees.push({ tree, x, z });
            }
        }
    }

    display() {
        for (const { tree, x, z } of this.trees) {
            this.scene.pushMatrix();
            this.scene.translate(x, 0, z); // Posicionar a árvore
            tree.display();
            this.scene.popMatrix();
        }
    }
}