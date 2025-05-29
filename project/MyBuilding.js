import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyDoor } from './MyDoor.js';
import { MyWindow } from './MyWindow.js';
import { MyPlane } from './MyPlane.js';
import { MyCircle } from './MyCircle.js';
import { MyUnitCube } from './MyUnitCube.js';

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
        this.window = new MyWindow(scene, windowTexture); // Windows 
        this.wall = new MyPlane(scene, 64); // Wall of the building 
        this.heliport = new MyCircle(scene, 1, 64); // Helicopter landing pad

        this.isTakingOff = false; // Flag for helicopter taking off
        this.isLanding = false; // Flag for helicopter landing
        this.isManeuver = false; // Flag for helicopter maneuvering

        // Create material for the walls of the building
        this.wallMaterial = new CGFappearance(scene);
        this.wallMaterial.setAmbient(this.buildingColor[0], this.buildingColor[1], this.buildingColor[2], 1.0);
        this.wallMaterial.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.wallMaterial.setSpecular(0.0, 0.0, 0.0, 1.0);
        this.wallMaterial.setShininess(1.0); 

        // Create textures for different phases of helicopter landing and takeoff
        this.heliTexture = new CGFtexture(scene, 'texture/heliporto.png');
        this.heliportMaterial = new CGFappearance(scene);
        this.heliportMaterial.setTexture(this.heliTexture);
        this.heliportMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        // Textures for helicopter taking off and landing
        this.heliTextureTakingOff = new CGFtexture(scene, 'texture/heliporto_up.png');
        this.heliportMaterialTakingOff = new CGFappearance(scene);
        this.heliportMaterialTakingOff.setTexture(this.heliTextureTakingOff);
        this.heliportMaterialTakingOff.setTextureWrap('REPEAT', 'REPEAT');
        
        this.heliTextureLanding = new CGFtexture(scene, 'texture/heliporto_down.png');
        this.heliportMaterialLanding = new CGFappearance(scene);
        this.heliportMaterialLanding.setTexture(this.heliTextureLanding);
        this.heliportMaterialLanding.setTextureWrap('REPEAT', 'REPEAT');

        // Add maneuver lights
        this.warningLight = new MyUnitCube(scene);
        
        // Warning light material (non-emissive)
        this.warningLightMaterial = new CGFappearance(scene);
        this.warningLightMaterial.setAmbient(0.8, 0.0, 0.0, 1.0);
        this.warningLightMaterial.setDiffuse(0.8, 0.0, 0.0, 1.0);
        this.warningLightMaterial.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.warningLightMaterial.setShininess(10);
        
        // Warning light emissive material (for pulsating effect)
        this.warningLightEmissiveMaterial = new CGFappearance(scene);
        this.warningLightEmissiveMaterial.setAmbient(1.0, 0.7, 0.0, 1.0);
        this.warningLightEmissiveMaterial.setDiffuse(1.0, 0.7, 0.0, 1.0);
        this.warningLightEmissiveMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.warningLightEmissiveMaterial.setShininess(100);
        
        // Start time for pulsating lights
        this.startTime = Date.now();

        // Control texture swapping
        this.lastTextureToggleTime = Date.now();
        this.showNormalTexture = true;
        this.textureToggleInterval = 500;
    }

    display() {
        this.isManeuver = this.isLanding || this.isTakingOff;
        // Central Module
        this.displayModule(0, this.centralWidth, this.centralHeight, this.centralWidth, true);

        // Left Lateral Module
        this.displayModule(-this.centralWidth / 2 - this.lateralWidth / 2, this.lateralWidth, this.lateralHeight, this.lateralWidth, false);

        // Right Lateral Module
        this.displayModule(this.centralWidth / 2 + this.lateralWidth / 2, this.lateralWidth, this.lateralHeight, this.lateralWidth, false);
    }

    // Toggle heliport texture based on landing/taking off state
    toggleHeliportTexture() {
        const currentTime = Date.now();
        if (currentTime - this.lastTextureToggleTime > this.textureToggleInterval) {
            this.showNormalTexture = !this.showNormalTexture;
            this.lastTextureToggleTime = currentTime;
        }
    }

    // To get the current state of the helicopter landing/taking off to display the heliport correctly
    heliLandingTakeOff(isLanding, isTakingOff) {
        this.isLanding = isLanding;
        this.isTakingOff = isTakingOff;
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

        // Central Building has a heliport and warning lights
        if (isCentral) {
            // Top Wall
            this.scene.pushMatrix();
            this.scene.translate(x, height, 0);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.scene.scale(width, depth, 1);
            this.wallMaterial.apply();
            this.wall.display();
            this.scene.popMatrix();

            // Door
            this.scene.pushMatrix();
            this.scene.translate(x, 5.0, depth / 2 + 0.01);
            this.scene.scale(0.50, 0.50, 0.50);
            this.scene.translate(0, -6.5, 0);
            this.door.display();
            this.scene.popMatrix();

            // Heliport Circle
            this.scene.pushMatrix();
            this.scene.translate(x, height + 0.01, 0);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.scene.scale(width / 2, width / 2, 1);
        
            // Apply the appropriate material based on the helicopter's state
            // Taking off -> heliportMaterialTakingOff
            // Landing -> heliportMaterialLanding
            // Normal state -> heliportMaterial
            if (this.isTakingOff) {
                if (this.showNormalTexture) {
                    this.heliportMaterial.apply();
                }
                else {
                    this.heliportMaterialTakingOff.apply();
                }
            }
            else if (this.isLanding) {
                if (this.showNormalTexture) {
                    this.heliportMaterial.apply();
                }
                else {
                    this.heliportMaterialLanding.apply();
                }
            }
            else {
                this.heliportMaterial.apply();
            }

            this.heliport.display();
            this.scene.popMatrix();

            // Draw warning lights on the heliport corners
            this.scene.pushMatrix();
            const isManeuver = this.isLanding || this.isTakingOff;
            if (isManeuver) {
                this.updatePulsatingLights();
            }
            const lightSize = 0.7;
            const lightOffset = width * 0.6;
            for (let i = 0; i < 4; i++) {
                const angle = (i * Math.PI / 2) + (Math.PI / 4);
                const cornerX = x + Math.cos(angle) * lightOffset;
                const cornerZ = Math.sin(angle) * lightOffset;
                
                this.scene.pushMatrix();
                this.scene.translate(cornerX, height + 0.15, cornerZ);
                this.scene.scale(lightSize, lightSize, lightSize);
                // Apply the appropriate material based on the helicopter's state
                if (isManeuver) {
                    this.warningLightEmissiveMaterial.apply();
                }
                else {
                    this.warningLightMaterial.apply();
                }
                
                this.warningLight.display();
                this.scene.popMatrix();
            }

            this.scene.popMatrix();
        }
        else {
            this.scene.pushMatrix();
            this.scene.translate(x, height, 0);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.scene.scale(width, depth, 1);
            this.wallMaterial.apply();
            this.wall.display();
            this.scene.popMatrix();
        }

        // Bottom Wall (optional, not visible)
        this.scene.pushMatrix();
        this.scene.translate(x, 0, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(width, depth, 1);
        this.wallMaterial.apply();
        this.wall.display();
        this.scene.popMatrix();
        
        // Windows considering if it's a central building or lateral bulding
        const floors = isCentral ? this.numFloors : Math.round(this.lateralHeight / 5);
        for (let floor = 0; floor < floors; floor++) {
            // Do not draw windows on the ground floor of the central building
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

    updatePulsatingLights() {
        const currentTime = Date.now();
        const elapsedSeconds = (currentTime - this.startTime) / 1000;
        
        // Variação sinusoidal mais pronunciada para a emissividade (de 0.1 a 1.0)
        const emissiveValue = 0.1 + 0.9 * Math.abs(Math.sin(elapsedSeconds * 3));
        
        // Cor laranja/âmbar mais viva e emissiva
        this.warningLightEmissiveMaterial.setAmbient(1.0, 0.5, 0.0, 1.0);
        this.warningLightEmissiveMaterial.setDiffuse(1.0, 0.5, 0.0, 1.0);
        this.warningLightEmissiveMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
        
        // Configurar a emissividade (importante - este é o valor que cria o efeito de "brilho")
        this.warningLightEmissiveMaterial.setEmission(
            emissiveValue * 1.0,    // Componente vermelho mais forte
            emissiveValue * 0.5,    // Componente verde médio (para cor laranja)
            0.0,                   // Sem componente azul
            1.0
        );
    }

    // Update heliport texture and lights based on the helicopter's state
    update() {
        if (this.isLanding || this.isTakingOff) {
            this.updatePulsatingLights();
            this.toggleHeliportTexture();
        } else {
            this.showNormalTexture = true;
        }
    }
}