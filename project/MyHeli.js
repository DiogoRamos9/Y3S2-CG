    import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
    import { MySphere } from './MySphere.js';
    import { MyCone } from './MyCone.js';
    import { MyCylinder } from './MyCylinder.js';
    import { MyCircle } from './MyCircle.js';
    import { MyPlane } from './MyPlane.js';
    import { MyRoundedSquare } from './MyRoundedSquare.js';

    export class MyHeli extends CGFobject {
        constructor(scene) {
            super(scene);

            // Componentes do helicóptero
            this.body = new MySphere(scene, false, 20, 20); // Cabeça/cabine
            this.tail = new MyCone(scene, 20, 0.2, 2); // Cauda
            this.tailend = new MySphere(scene, false, 20, 20); // Extremidade da cauda
            this.mainRotor = new MyCylinder(scene, 0.05, 0.05, 0.70, 10, 1); // Hélice superior
            this.mainRotorBlade = new MyPlane(scene, 10); // Pá da hélice
            this.tailRotor = new MyCylinder(scene, 0.05, 0.05, 0.70, 10, 1); // Hélice da cauda
            this.tailRotorBlade = new MyPlane(scene, 10); // Pá da hélice da cauda
            this.landingGear = new MyCylinder(scene, 0.05, 0.05, 1, 10, 1); // Trem de aterragem
            this.bucket = new MyCone(scene, 20, 0.3, 0.5); // Balde de água
            this.window = new MyRoundedSquare(scene, 0.4, 0.08); // Janela
            this.cabin = new MySphere(scene, false, 30, 30, false); // Cabeça/cabine


            // Materiais 
            
            this.helicetexture = new CGFtexture(scene, 'texture/helice.jpg');
            this.heliceMaterial = new CGFappearance(scene);
            this.heliceMaterial.setTexture(this.helicetexture);
            this.heliceMaterial.setTextureWrap('REPEAT', 'REPEAT');
            this.heliceMaterial.setAmbient(0.6, 0.6, 0.6, 1.0); 
            this.heliceMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0); 
            this.heliceMaterial.setSpecular(0.5, 0.5, 0.5, 1.0); 
            this.heliceMaterial.setShininess(50.0);


            this.tremtexture = new CGFtexture(scene, 'texture/metal.jng');
            this.tremMaterial = new CGFappearance(scene);
            this.tremMaterial.setTexture(this.tremtexture);
            this.tremMaterial.setTextureWrap('REPEAT', 'REPEAT');
            this.tremMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
            this.tremMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
            this.tremMaterial.setSpecular(0.5, 0.5, 0.5, 1.0);
            this.tremMaterial.setShininess(50.0);

            this.helicetexture = new CGFtexture(scene, 'texture/heli.png');
            this.heliMaterial = new CGFappearance(scene);
            this.heliMaterial.setTexture(this.helicetexture);
            this.heliMaterial.setTextureWrap('REPEAT', 'REPEAT');
            this.heliMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
            this.heliMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
            this.heliMaterial.setSpecular(0.5, 0.5, 0.5, 1.0);
            this.heliMaterial.setShininess(10.0);

            this.windowtexture = new CGFtexture(scene, 'texture/cabin.jpg');
            this.windowMaterial = new CGFappearance(scene);
            this.windowMaterial.setTexture(this.windowtexture);
            this.windowMaterial.setTextureWrap('REPEAT', 'REPEAT');
            this.windowMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
            this.windowMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
            this.windowMaterial.setSpecular(0.5, 0.5, 0.5, 1.0);
            this.windowMaterial.setShininess(10.0);
        }

        display() {
            // Body
            this.scene.pushMatrix();
            this.scene.scale(0.5, 0.5, 0.8);
            this.heliMaterial.apply();
            this.body.display();
            this.scene.popMatrix();

            // Cabine
            this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.50); 
            this.scene.scale(0.35, 0.35, 0.35); 
            this.scene.rotate(Math.PI / 2, 1, 0, 0); 
            this.windowMaterial.apply(); 
            this.cabin.display(); 
            this.scene.popMatrix();

            // Cauda
            this.scene.pushMatrix();
            this.scene.translate(0, 0, -1.2);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.tremMaterial.apply();
            this.tail.display();
            this.scene.popMatrix();

            // Extremidade da cauda
            this.scene.pushMatrix();
            this.scene.translate(0, 0, -1.2);
            this.scene.scale(0.19, 0.19, 0.19);
            this.tremMaterial.apply();
            this.tailend.display();
            this.scene.popMatrix();

            // Rotor traseiro Esquerda 
            this.scene.pushMatrix();
            this.scene.translate(-0.15, 0, -1.2);
            this.scene.rotate(Math.PI / 2, 0, 0, 1); 
            this.scene.scale(1, 0.1, 1);
            this.tremMaterial.apply();
            this.tailRotor.display();
            this.scene.popMatrix();

            // Hélice traseira - pá vertical
            this.scene.pushMatrix();
            this.scene.translate(-0.20, 0, -1.7);
            this.scene.rotate(-Math.PI / 2, 0, 0, 1);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.scene.translate(0, 0.5, 0);
            this.scene.scale(0.5, 0.03, 1);
            this.heliceMaterial.apply();
            this.tailRotorBlade.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-0.20, 0, -1.7);
            this.scene.rotate(Math.PI / 2, 0, 0, 1);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.scene.translate(0, 0.5, 0);
            this.scene.scale(0.4, 0.03, 1);
            this.heliceMaterial.apply();
            this.tailRotorBlade.display();
            this.scene.popMatrix();

            // Hélice traseira - pá horizontal
            this.scene.pushMatrix();
            this.scene.translate(-0.20, 0, -1.18); 
            this.scene.rotate(-Math.PI / 2, 0, 1, 0); 
            this.scene.scale(0.4, 0.03, 1);
            this.heliceMaterial.apply();
            this.tailRotorBlade.display();
            this.scene.popMatrix();

             this.scene.pushMatrix();
            this.scene.translate(-0.20, 0, -1.18); 
            this.scene.rotate(Math.PI / 2, 0, 1, 0); 
            this.scene.scale(0.4, 0.03, 1);
            this.heliceMaterial.apply();
            this.tailRotorBlade.display();
            this.scene.popMatrix();


            
            // Rotor traseiro Direita 
            this.scene.pushMatrix();
            this.scene.translate(0.15, 0, -1.2);
            this.scene.rotate(-Math.PI / 2, 0, 0, 1); 
            this.scene.scale(1, 0.1, 1);
            this.tremMaterial.apply();
            this.tailRotor.display();
            this.scene.popMatrix();
             // Hélice traseira - pá vertical
            this.scene.pushMatrix();
            this.scene.translate(0.20, 0, -1.7);
            this.scene.rotate(-Math.PI / 2, 0, 0, 1);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.scene.translate(0, 0.5, 0);
            this.scene.scale(0.5, 0.03, 1);
            this.heliceMaterial.apply();
            this.tailRotorBlade.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.20, 0, -1.7);
            this.scene.rotate(Math.PI / 2, 0, 0, 1);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.scene.translate(0, 0.5, 0);
            this.scene.scale(0.4, 0.03, 1);
            this.heliceMaterial.apply();
            this.tailRotorBlade.display();
            this.scene.popMatrix();

            // Hélice traseira - pá horizontal
            this.scene.pushMatrix();
            this.scene.translate(0.20, 0, -1.18); 
            this.scene.rotate(-Math.PI / 2, 0, 1, 0); 
            this.scene.scale(0.4, 0.03, 1);
            this.heliceMaterial.apply();
            this.tailRotorBlade.display();
            this.scene.popMatrix();

             this.scene.pushMatrix();
            this.scene.translate(0.20, 0, -1.18); 
            this.scene.rotate(Math.PI / 2, 0, 1, 0); 
            this.scene.scale(0.4, 0.03, 1);
            this.heliceMaterial.apply();
            this.tailRotorBlade.display();
            this.scene.popMatrix();
            



            // Hélice superior
            this.scene.pushMatrix();
            this.scene.translate(0, 0.50, 0);
            this.scene.scale(2, 0.1, 2);
            this.tremMaterial.apply();
            this.mainRotor.display();
            this.scene.popMatrix();

            // Hélice superior - pás diagonais
            const bladeLength = 0.7;

            // Pá 1 (diagonal trás-direita)
            this.scene.pushMatrix();
            this.scene.translate(0, 0.53, 0);
            this.scene.rotate(Math.PI / 4, 0, 1, 0);
            this.scene.rotate(- Math.PI / 2, 1, 0, 0);
            this.scene.translate(bladeLength / 2, 0, 0);
            this.scene.scale(bladeLength, 0.05, 1);
            this.heliceMaterial.apply();
            this.mainRotorBlade.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();
            this.scene.translate(0, 0.53, 0);
            this.scene.rotate(Math.PI / 4, 0, 1, 0);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.scene.translate(bladeLength / 2, 0, 0);
            this.scene.scale(bladeLength, 0.05, 1);
            this.heliceMaterial.apply();
            this.mainRotorBlade.display();
            this.scene.popMatrix();

            // Pá 2 (diagonal frente-direita)
            this.scene.pushMatrix();
            this.scene.translate(0, 0.53, 0);
            this.scene.rotate(-Math.PI / 4, 0, 1, 0);
            this.scene.rotate(- Math.PI / 2, 1, 0, 0);
            this.scene.translate(bladeLength / 2, 0, 0);
            this.scene.scale(bladeLength, 0.05, 1);
            this.heliceMaterial.apply();
            this.mainRotorBlade.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, 0.53, 0);
            this.scene.rotate(-Math.PI / 4, 0, 1, 0);
            this.scene.rotate( Math.PI / 2, 1, 0, 0);
            this.scene.translate(bladeLength / 2, 0, 0);
            this.scene.scale(bladeLength, 0.05, 1);
            this.heliceMaterial.apply();
            this.mainRotorBlade.display();
            this.scene.popMatrix();

            // Pá 3 (diagonal trás-esquerda)
            this.scene.pushMatrix();
            this.scene.translate(0, 0.53, 0);
            this.scene.rotate((3 * Math.PI) / 4, 0, 1, 0);
            this.scene.rotate(- Math.PI / 2, 1, 0, 0);
            this.scene.translate(bladeLength / 2, 0, 0);
            this.scene.scale(bladeLength, 0.05, 1);
            this.heliceMaterial.apply();
            this.mainRotorBlade.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, 0.53, 0);
            this.scene.rotate((3 * Math.PI) / 4, 0, 1, 0);
            this.scene.rotate( Math.PI / 2, 1, 0, 0);
            this.scene.translate(bladeLength / 2, 0, 0);
            this.scene.scale(bladeLength, 0.05, 1);
            this.heliceMaterial.apply();
            this.mainRotorBlade.display();
            this.scene.popMatrix();

            // Pá 4 (diagonal frente-esquerda)
            this.scene.pushMatrix();
            this.scene.translate(0, 0.53, 0);
            this.scene.rotate(-(3 * Math.PI) / 4, 0, 1, 0);
            this.scene.rotate(- Math.PI / 2, 1, 0, 0);
            this.scene.translate(bladeLength / 2, 0, 0);
            this.scene.scale(bladeLength, 0.05, 1);
            this.heliceMaterial.apply();
            this.mainRotorBlade.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, 0.53, 0);
            this.scene.rotate(-(3 * Math.PI) / 4, 0, 1, 0);
            this.scene.rotate( Math.PI / 2, 1, 0, 0);
            this.scene.translate(bladeLength / 2, 0, 0);
            this.scene.scale(bladeLength, 0.05, 1);
            this.heliceMaterial.apply();
            this.mainRotorBlade.display();
            this.scene.popMatrix();

            // ===== Trem de aterragem =====

            // --- Skid ESQUERDO ---
            this.scene.pushMatrix();
            // posiciona & centraliza o cilindro deitado no eixo Z
            this.scene.translate(-0.4, -0.5, -0.5);      
            this.scene.scale(0.85, 1, 1); 
            this.scene.rotate(Math.PI / 2, 1, 0, 0);  
            this.tremMaterial.apply();  
            this.landingGear.display();
            this.scene.popMatrix();

            // --- Skid DIREITO ---
            this.scene.pushMatrix();
            this.scene.translate( 0.4, -0.5, -0.5);    
            this.scene.scale(0.85, 1.0, 1);    
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.tremMaterial.apply();  
            this.landingGear.display();
            this.scene.popMatrix();

            // --- Suporte VERTICAL ESQUERDO-FRENTE ---
            this.scene.pushMatrix();
            this.scene.translate(-0.4, -0.5,  0.3);    
            this.scene.scale(1, 0.25, 1);
            this.scene.rotate( - Math.PI / 10, 0, 0, 1);  
            this.tremMaterial.apply();    
            this.landingGear.display();
            this.scene.popMatrix();

            // --- Suporte VERTICAL ESQUERDO-TRÁS ---
            this.scene.pushMatrix();
            this.scene.translate(-0.4, -0.5 , -0.3);    
            this.scene.scale(1, 0.25, 1);
            this.scene.rotate( - Math.PI / 10, 0, 0, 1); 
            this.tremMaterial.apply();   
            this.landingGear.display();
            this.scene.popMatrix();

            // --- Suporte VERTICAL DIREITO-FRENTE ---
            this.scene.pushMatrix();
            this.scene.translate( 0.4, -0.5,  0.3);    
            this.scene.scale(1, 0.25, 1);
            this.scene.rotate( Math.PI / 10, 0, 0, 1);  
            this.tremMaterial.apply();  
            this.landingGear.display();
            this.scene.popMatrix();

            // --- Suporte VERTICAL DIREITO-TRÁS ---
            this.scene.pushMatrix();
            this.scene.translate( 0.4, -0.5, -0.3);    
            this.scene.scale(1, 0.25, 1);
            this.scene.rotate( Math.PI / 10, 0, 0, 1);  
            this.tremMaterial.apply();  
            this.landingGear.display();
            this.scene.popMatrix();


            // Janela Direita Traseira
            this.scene.pushMatrix();
            this.scene.translate(0.432, 0.22, -0.2); 
            this.scene.rotate(Math.PI / 1.8, 0, 1, 0); 
            this.scene.rotate(-Math.PI / 8, 1, 0, 0);
            this.scene.scale(0.7, 0.4, 1); 
            this.window.display(); 
            this.scene.popMatrix();
            
            // Janela Direita Frontal
            this.scene.pushMatrix();
            this.scene.translate(0.432, 0.22, 0.2);
            this.scene.rotate(Math.PI / 2.2, 0, 1, 0);
            this.scene.rotate(-Math.PI / 8, 1, 0, 0); 
            this.scene.scale(0.7, 0.4, 1); 
            this.window.display();
            this.scene.popMatrix();

            // Janela Esquerda Traseira
            this.scene.pushMatrix();
            this.scene.translate(-0.432, 0.22, -0.2); 
            this.scene.rotate(-Math.PI / 1.8, 0, 1, 0); 
            this.scene.rotate(-Math.PI / 8, 1, 0, 0); 
            this.scene.scale(0.7, 0.4, 1); 
            this.window.display(); 
            this.scene.popMatrix();

            // Janela Esquerda Frontal
            this.scene.pushMatrix();
            this.scene.translate(-0.432, 0.22, 0.2); 
            this.scene.rotate(-Math.PI / 2.2, 0, 1, 0); 
            this.scene.rotate(-Math.PI / 8, 1, 0, 0); 
            this.scene.scale(0.7, 0.4, 1); 
            this.window.display(); 
            this.scene.popMatrix(); 


            // Balde de água
            this.scene.pushMatrix();
            this.scene.translate(0, -0.7, 0);     
            this.scene.scale(0.5, 0.5, 0.5);
            this.bucket.display();
            this.scene.popMatrix();
        }
    }