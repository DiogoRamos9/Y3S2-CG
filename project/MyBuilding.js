import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyDoor } from './MyDoor.js';
import { MyWindow } from './MyWindow.js';
import { MyPlane } from './MyPlane.js';
import { MyCircle } from './MyCircle.js';

export class MyBuilding extends CGFobject {
    constructor(scene, totalWidth, numFloors, windowsPerFloor, windowTexture, buildingColor, doorTexture, signTexture) {
        super(scene);
        this.scene = scene;

        this.totalWidth = totalWidth; // Total width of the building
        this.numFloors = numFloors; // Number of floors for the central module
        this.windowsPerFloor = windowsPerFloor; // Number of windows per floor
        this.buildingColor = buildingColor; // Building color

        this.centralWidth = totalWidth / 2; // Central module width
        this.lateralWidth = this.centralWidth * 0.75; // Lateral module width (75% of central)
        this.centralHeight = numFloors * 5; // Height of the central module
        this.lateralHeight = Math.round((this.centralHeight * 0.75) / 5) * 5; // Height of the lateral modules (75% of central)

        this.door = new MyDoor(scene, doorTexture, signTexture); // Door and sign
        this.window = new MyWindow(scene, windowTexture); // Window
        this.wall = new MyPlane(scene, 64); // Use MyPlane for walls
        this.heliport = new MyCircle(scene, 1, 64); // Helicopter landing pad

        this.isTakingOff = false; // Flag for helicopter taking off
        this.isLanding = false; // Flag for helicopter landing

        this.wallMaterial = new CGFappearance(scene);
        this.wallMaterial.setAmbient(this.buildingColor[0], this.buildingColor[1], this.buildingColor[2], 1.0);
        this.wallMaterial.setDiffuse(0.0, 0.0, 0.0, 1.0);   // Sem difuso
        this.wallMaterial.setSpecular(0.0, 0.0, 0.0, 1.0);  // Sem especular
        this.wallMaterial.setShininess(1.0); 

        // Create textures for different phases of helicopter landing and takeoff
        this.heliTexture = new CGFtexture(scene, 'texture/heliporto.png');
        this.helicopterMaterial = new CGFappearance(scene);
        this.helicopterMaterial.setTexture(this.heliTexture);
        this.helicopterMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        this.heliTextureTakingOff = new CGFtexture(scene, 'texture/heliporto_up.png');
        this.helicopterMaterialTakingOff = new CGFappearance(scene);
        this.helicopterMaterialTakingOff.setTexture(this.heliTextureTakingOff);
        this.helicopterMaterialTakingOff.setTextureWrap('REPEAT', 'REPEAT');

        this.heliTextureLanding = new CGFtexture(scene, 'texture/heliporto_down.png');
        this.helicopterMaterialLanding = new CGFappearance(scene);
        this.helicopterMaterialLanding.setTexture(this.heliTextureLanding);
        this.helicopterMaterialLanding.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        // Central Module
        this.displayModule(0, this.centralWidth, this.centralHeight, this.centralWidth, true);

        // Left Lateral Module
        this.displayModule(-this.centralWidth / 2 - this.lateralWidth / 2, this.lateralWidth, this.lateralHeight, this.lateralWidth, false);

        // Right Lateral Module
        this.displayModule(this.centralWidth / 2 + this.lateralWidth / 2, this.lateralWidth, this.lateralHeight, this.lateralWidth, false);
    }

    helilanding(){
        this.isLanding = true;
        this.isTakingOff = false;
    }

    helitakeoff(){
        this.isTakingOff = true;
        this.isLanding = false;
    }
    
    displayModule(x, width, height, depth, isCentral) {
        
        // Front Wall
        this.scene.pushMatrix();
        this.scene.translate(x, height / 2, depth / 2);
        this.scene.scale(width, height, 1);
        this.wallMaterial.apply();
        this.wall.display();
        this.scene.popMatrix();

        // Back Wall
        this.scene.pushMatrix();
        this.scene.translate(x, height / 2, -depth / 2);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(width, height, 1);
        this.wallMaterial.apply();
        this.wall.display();
        this.scene.popMatrix();

        // Left Wall
        this.scene.pushMatrix();
        this.scene.translate(x - width / 2, height / 2, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.scale(depth, height, 1);
        this.wallMaterial.apply();
        this.wall.display();
        this.scene.popMatrix();

        // Right Wall
        this.scene.pushMatrix();
        this.scene.translate(x + width / 2, height / 2, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(depth, height, 1);
        this.wallMaterial.apply();
        this.wall.display();
        this.scene.popMatrix();

        // Top Wall
        if (isCentral) {
            // Top Wall (Plano como base)
            this.scene.pushMatrix();
            this.scene.translate(x, height, 0);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.scene.scale(width, depth, 1);
            this.wallMaterial.apply(); // Aplicar a cor do prédio
            this.wall.display(); // Exibir o plano como base
            this.scene.popMatrix();
        
            // Heliporto (Círculo dentro do plano)
            if (this.isTakingOff) {
                this.scene.pushMatrix();
                this.scene.translate(x, height + 0.01, 0); // Ligeiramente acima do plano para evitar z-fighting
                this.scene.rotate(-Math.PI / 2, 1, 0, 0);
                this.scene.scale(width / 2, width / 2, 1); // Ajustar o tamanho do círculo
                this.helicopterMaterialTakingOff.apply(); // Aplicar a textura do heliporto
                this.heliport.display(); // Exibir o círculo
                this.scene.popMatrix();
            }

            else if (this.isLanding) {
                this.scene.pushMatrix();
                this.scene.translate(x, height + 0.01, 0); // Ligeiramente acima do plano para evitar z-fighting
                this.scene.rotate(-Math.PI / 2, 1, 0, 0);
                this.scene.scale(width / 2, width / 2, 1); // Ajustar o tamanho do círculo
                this.helicopterMaterialLanding.apply(); // Aplicar a textura do heliporto
                this.heliport.display(); // Exibir o círculo
                this.scene.popMatrix();
            }
            else {
                this.scene.pushMatrix();
                this.scene.translate(x, height + 0.01, 0); // Ligeiramente acima do plano para evitar z-fighting
                this.scene.rotate(-Math.PI / 2, 1, 0, 0);
                this.scene.scale(width / 2, width / 2, 1); // Ajustar o tamanho do círculo
                this.helicopterMaterial.apply(); // Aplicar a textura do heliporto
                this.heliport.display(); // Exibir o círculo
                this.scene.popMatrix();

            }
            
        }
        else{
        this.scene.pushMatrix();
        this.scene.translate(x, height, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(width, depth, 1);
        this.wallMaterial.apply();
        this.wall.display();
        this.scene.popMatrix();}

        // Bottom Wall (optional, not visible)
        this.scene.pushMatrix();
        this.scene.translate(x, 0, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(width, depth, 1);
        this.wallMaterial.apply();
        this.wall.display();
        this.scene.popMatrix();

        // Add door and windows only for the central module
        if (isCentral) {
            // Door
            this.scene.pushMatrix();
            this.scene.translate(x, 5.0, depth / 2 + 0.01);
            this.scene.scale(0.50, 0.50, 0.50);
            this.scene.translate(0, -6.5, 0);
            this.door.display();
            this.scene.popMatrix();
        }
        
        const floors = isCentral ? this.numFloors : Math.round(this.lateralHeight / 5);

        // Windows (only on front and back walls)
        for (let floor = 0; floor < floors; floor++) {
            // Se for módulo central e estiver no R/C, não desenhar janelas
            if (isCentral && floor === 0) continue;
        
            for (let i = 0; i < this.windowsPerFloor; i++) {
                const zOffset = (i - (this.windowsPerFloor - 1) / 2) * (width / this.windowsPerFloor);
                const yOffset = floor * 5 + 2.0;
        
                // Front Windows
                this.scene.pushMatrix();
                this.scene.translate(x + zOffset, yOffset, depth / 2 + 0.01);
                this.window.display();
                this.scene.popMatrix();
            }
        }
        

    
    }

    getCentralHeight() {
        return this.centralHeight;
    }
}