    import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
    import { MySphere } from './MySphere.js';
    import { MyCone } from './MyCone.js';
    import { MyCylinder } from './MyCylinder.js';
    import { MyCircle } from './MyCircle.js';
    import { MyPlane } from './MyPlane.js';
    import { MyRoundedSquare } from './MyRoundedSquare.js';

    export class MyHeli extends CGFobject {
        constructor(scene, x = 0, y = 0, z = 0, orientation = 0, velocity = 0) {
            super(scene);

            this.x = x;
            this.y = y;
            this.z = z;
            this.position = {x: x, y: y, z: z};
            this.landingPos = {x: x, y: y, z: z};
            this.orientation = orientation;
            this.velocity = velocity;
            this.cruiseAltitude = this.y + 3;
            this.isflying = false;
            this.bucketdeployed = false;
            this.inclination = 0;

            this.bladespeed = 0;
            this.takingOff = false;
            this.landing = false;


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

        update(deltaTime, speedFactor){

            if(this.takingOff){
                this.position.y += 0.2 * deltaTime * speedFactor;
                console.log(this.position.y);
                this.bladespeed = Math.min(this.bladespeed + 0.1, 1);
                if(this.position.y >= this.cruiseAltitude){
                    this.position.y = this.cruiseAltitude;
                    this.takingOff = false;
                    this.isflying = true;
                    this.bucketdeployed = true;
                }

            }

            else if(this.landing){
                this.position.y -= 0.1 * deltaTime * speedFactor;
                console.log(this.position.y);
                this.bladespeed = Math.max(this.bladespeed - 0.001, 0);
                

                if(this.position.y <= this.landingPos.y){
                    this.position.y = this.landingPos.y;
                    this.landing = false;
                    this.isflying = false;
                    this.bucketdeployed = false;
                    this.velocity = 0;
                }
            }

            else if(this.isflying){
                this.position.x += this.velocity * Math.sin(this.orientation) * speedFactor * deltaTime / 1000;
                this.position.z += this.velocity * Math.cos(this.orientation) * speedFactor * deltaTime / 1000;

                this.position.y = this.cruiseAltitude;

                 if (this.inclination > 0) {
                    this.inclination = Math.max(this.inclination - 0.005, 0); // Reduz a inclinação para frente
                } else if (this.inclination < 0) {
                    this.inclination = Math.min(this.inclination + 0.005, 0); // Reduz a inclinação para trás
                }
            }

        }

        turn(angle){
            this.orientation += angle*this.scene.speedFactor;
        }

        accelerate(value){
            if(this.isflying){
            this.velocity = Math.max(this.velocity + value, 0);
            
            if(value > 0){
                this.inclination = Math.min(this.inclination + 0.009, Math.PI / 12);
            }
            else if(value < 0 && this.velocity > 0){
                this.inclination = Math.max(this.inclination - 0.009, -Math.PI / 12);
            }
           
        }
        }

        takeOff(){
            if(!this.isflying && !this.takingOff){
                this.takingOff = true;  
                this.bladespeed = 0.2;
            }
        }

        land(){
            if(this.isflying && !this.landing){
                this.landing = true;
                
            }
        }

        reset(){
            this.isflying = false;
            this.position.x = this.landingPos.x;
            this.position.z = this.landingPos.z;
            this.position.y = this.landingPos.y;
            this.orientation = 0;
            this.velocity = 0;
            this.bucketdeployed = false;
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
            this.scene.rotate(this.bladespeed * Date.now() * 0.02, 0, 1, 0);
            this.scene.rotate(Math.PI / 4, 0, 1, 0);
            this.scene.rotate(- Math.PI / 2, 1, 0, 0);
            this.scene.translate(bladeLength / 2, 0, 0);
            this.scene.scale(bladeLength, 0.05, 1);
            this.heliceMaterial.apply();
            this.mainRotorBlade.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();
            this.scene.translate(0, 0.53, 0);
            this.scene.rotate(this.bladespeed * Date.now() * 0.02, 0, 1, 0);
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
            this.scene.rotate(this.bladespeed * Date.now() * 0.02, 0, 1, 0);
            this.scene.rotate(-Math.PI / 4, 0, 1, 0);
            this.scene.rotate(- Math.PI / 2, 1, 0, 0);
            this.scene.translate(bladeLength / 2, 0, 0);
            this.scene.scale(bladeLength, 0.05, 1);
            this.heliceMaterial.apply();
            this.mainRotorBlade.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, 0.53, 0);
            this.scene.rotate(this.bladespeed * Date.now() * 0.02, 0, 1, 0);
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
            this.scene.rotate(this.bladespeed * Date.now() * 0.02, 0, 1, 0);
            this.scene.rotate((3 * Math.PI) / 4, 0, 1, 0);
            this.scene.rotate(- Math.PI / 2, 1, 0, 0);
            this.scene.translate(bladeLength / 2, 0, 0);
            this.scene.scale(bladeLength, 0.05, 1);
            this.heliceMaterial.apply();
            this.mainRotorBlade.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, 0.53, 0);
            this.scene.rotate(this.bladespeed * Date.now() * 0.02, 0, 1, 0);
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
            this.scene.rotate(this.bladespeed * Date.now() * 0.02, 0, 1, 0);
            this.scene.rotate(-(3 * Math.PI) / 4, 0, 1, 0);
            this.scene.rotate(- Math.PI / 2, 1, 0, 0);
            this.scene.translate(bladeLength / 2, 0, 0);
            this.scene.scale(bladeLength, 0.05, 1);
            this.heliceMaterial.apply();
            this.mainRotorBlade.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, 0.53, 0);
            this.scene.rotate(this.bladespeed * Date.now() * 0.02, 0, 1, 0);
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
            if(this.bucketdeployed){
            this.scene.pushMatrix();
            this.scene.translate(0, -0.7, 0);     
            this.scene.scale(0.5, 0.5, 0.5);
            this.tremMaterial.apply();
            this.bucket.display();
            this.scene.popMatrix();
            }
        }
    }