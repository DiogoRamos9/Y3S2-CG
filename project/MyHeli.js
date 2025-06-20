    import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
    import { MySphere } from './MySphere.js';
    import { MyCone } from './MyCone.js';
    import { MyCylinder } from './MyCylinder.js';
    import { MyPlane } from './MyPlane.js';
    import { MyRoundedSquare } from './MyRoundedSquare.js';
    import { MyUnitCube } from './MyUnitCube.js';

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
            this.cruiseAltitude = this.landingPos.y + 3;
            this.isflying = false;
            this.bucketdeployed = false;
            this.inclination = 0;

            this.bladespeed = 0;
            this.takingOff = false;
            this.landing = false;
            this.manover = false;
            this.isOverLake = false;
            this.bucketfull = false;

            this.heliSound = new Audio('sounds/helisound.mp3');
            this.heliSound.loop = true;
            this.heliSound.volume = 0.5;

            // Helicopter parts
            this.body = new MySphere(scene, false, 20, 20);
            this.tail = new MyCone(scene, 20, 0.2, 2);
            this.tailend = new MySphere(scene, false, 20, 20);
            this.mainRotor = new MyCylinder(scene, 0.05, 0.05, 0.70, 10, 1);
            this.mainRotorBlade = new MyPlane(scene, 10);
            this.tailRotor = new MyCylinder(scene, 0.05, 0.05, 0.70, 10, 1);
            this.tailRotorBlade = new MyPlane(scene, 10);
            this.landingGear = new MyCylinder(scene, 0.05, 0.05, 1, 10, 1);
            this.bucket = new MyCone(scene, 20, 0.3, 0.5);
            this.window = new MyRoundedSquare(scene, 0.4, 0.08);
            this.cabin = new MySphere(scene, false, 30, 30, false);

            // Water
            this.waterDrops = [];
            this.cube = new MyUnitCube(scene);

            // Water textures and materials
            this.waterTexture = new CGFtexture(scene, 'texture/water.jpg');
            this.waterMaterial = new CGFappearance(scene);
            this.waterMaterial.setTexture(this.waterTexture);
            this.waterMaterial.setTextureWrap('REPEAT', 'REPEAT');
            this.waterMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
            this.waterMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
            this.waterMaterial.setSpecular(0.5, 0.5, 0.5, 1.0);
            this.waterMaterial.setShininess(10.0);
            
            // Helices textures and materials
            this.helicetexture = new CGFtexture(scene, 'texture/helice.jpg');
            this.heliceMaterial = new CGFappearance(scene);
            this.heliceMaterial.setTexture(this.helicetexture);
            this.heliceMaterial.setTextureWrap('REPEAT', 'REPEAT');
            this.heliceMaterial.setAmbient(0.6, 0.6, 0.6, 1.0); 
            this.heliceMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0); 
            this.heliceMaterial.setSpecular(0.5, 0.5, 0.5, 1.0); 
            this.heliceMaterial.setShininess(50.0);

            // Landing gear textures and materials
            this.tremtexture = new CGFtexture(scene, 'texture/metal.jpg');
            this.tremMaterial = new CGFappearance(scene);
            this.tremMaterial.setTexture(this.tremtexture);
            this.tremMaterial.setTextureWrap('REPEAT', 'REPEAT');
            this.tremMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
            this.tremMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
            this.tremMaterial.setSpecular(0.5, 0.5, 0.5, 1.0);
            this.tremMaterial.setShininess(50.0);

            // Helice textures and materials
            this.helicetexture = new CGFtexture(scene, 'texture/heli.png');
            this.heliMaterial = new CGFappearance(scene);
            this.heliMaterial.setTexture(this.helicetexture);
            this.heliMaterial.setTextureWrap('REPEAT', 'REPEAT');
            this.heliMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
            this.heliMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
            this.heliMaterial.setSpecular(0.5, 0.5, 0.5, 1.0);
            this.heliMaterial.setShininess(10.0);

            // Window textures and materials
            this.windowtexture = new CGFtexture(scene, 'texture/cabin.jpg');
            this.windowMaterial = new CGFappearance(scene);
            this.windowMaterial.setTexture(this.windowtexture);
            this.windowMaterial.setTextureWrap('REPEAT', 'REPEAT');
            this.windowMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
            this.windowMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
            this.windowMaterial.setSpecular(0.5, 0.5, 0.5, 1.0);
            this.windowMaterial.setShininess(10.0);
        }

        // Update the helicopter's position and state
        update(deltaTime, speedFactor) {
            this.isManover = this.takingOff || this.landing;    // Checks if the helicopter is in a maneuver state

            // Update position based on current state
            // takingOff -> ascending to cruise altitude
            if (this.takingOff) {
                const elapsedTime = (Date.now() - this.startTime) / 1000;
                if (this.isOverLake) {
                    this.position.y = Math.min(this.startlake + elapsedTime * 1.5, this.cruiseAltitude); 
                }
                else {
                    if (this.scene.building) {
                        this.scene.building.heliLandingTakeOff(false, true);
                    }
                    this.position.y = Math.min(this.landingPos.y + elapsedTime * 0.9, this.cruiseAltitude);
                }
                
                this.bladespeed = Math.min(this.bladespeed + 0.1, 1);
                if(this.position.y >= this.cruiseAltitude){
                    this.position.y = this.cruiseAltitude;
                    this.takingOff = false;
                    this.isflying = true;
                    this.bucketdeployed = true;
                }

            }

            // landing -> descending to landing position depending if over lake or not
            else if (this.landing) {
                const elapsedTime = (Date.now() - this.startTime) / 1000; 
            
                if(this.isOverLake && !this.bucketfull){
                    const bucketHeight = this.position.y - 3.8; 
                    const lakeHeight = 0.1;

                    if(bucketHeight > lakeHeight+0.001){
                        this.position.y = Math.max(this.cruiseAltitude - elapsedTime * 1.5, lakeHeight + 3.8);
                    }
                    else{
                        this.landing = false;
                        this.isflying = false;
                        this.bucketdeployed = true;
                        this.bucketfull = true;
                        this.velocity = 0;
                        this.inclination = 0;
                    }
                }
                else if(!this.isOverLake && !this.bucketfull){
                    const progress = Math.max(this.cruiseAltitude - elapsedTime * 0.5, this.landingPos.y) / this.cruiseAltitude;
                    
                    // Don not alter the building state even though the helicopter is landing (it is not landing on the building)
                    if (this.scene.building) {
                        this.scene.building.heliLandingTakeOff(true, false);
                    }

                    this.position.y = Math.max(this.cruiseAltitude - elapsedTime * 0.7, this.landingPos.y);
                    this.position.x = this.landingPos.x + (this.position.x - this.landingPos.x) * progress;
                    this.position.z = this.landingPos.z + (this.position.z - this.landingPos.z) * progress;

                    this.bladespeed = Math.max(this.bladespeed - 0.005, 0);

                    if (this.position.y <= this.landingPos.y && Math.abs(this.position.x - this.landingPos.x) < 0.01 && Math.abs(this.position.z - this.landingPos.z) < 0.01) {
                        this.position.y = this.landingPos.y;
                        this.position.x = this.landingPos.x;
                        this.position.z = this.landingPos.z;
                        this.landing = false;
                        this.isflying = false;
                        this.bucketdeployed = false;
                        this.velocity = 0;
                        this.bladespeed = 0;
                        this.inclination = 0;
                        
                        // Reset the helicopter position to the landing position
                        if (this.scene.building) {
                            this.scene.building.heliLandingTakeOff(false, false);
                        }
                    }
                }
            }

            // flying -> moving
            else if (this.isflying) {
                if (this.scene.building) {
                    this.scene.building.heliLandingTakeOff(false, false);
                }
                this.position.x += this.velocity * Math.sin(this.orientation) * speedFactor * deltaTime / 1000;
                this.position.z += this.velocity * Math.cos(this.orientation) * speedFactor * deltaTime / 1000;

                this.position.y = this.cruiseAltitude;
                
                 if (this.inclination > 0) {
                    this.inclination = Math.max(this.inclination - 0.005, 0);
                } else if (this.inclination < 0) {
                    this.inclination = Math.min(this.inclination + 0.005, 0);
                }
            }

            // Check if the helicopter has already been filled with water
            if (this.waterDrops.length > 0) {
                const elapsedTime = (Date.now() - this.startTime) / 1000; 
                for (let drop of this.waterDrops) {
                    drop.y += drop.speed * elapsedTime; 
                }

                const fireX=16, fireZ=22, fireRadius=10;
                for (let drop of this.waterDrops) {
                    const distanceToFire = Math.sqrt(Math.pow(drop.x - fireX, 2) + Math.pow(drop.z - fireZ, 2));
                    if (drop.y <= 0.5 && distanceToFire <= fireRadius) {
                        if (this.targetFire && this.targetFire.extinguished === false) {
                            this.targetFire.extinguished = true;
                            this.scene.fireReignite = 10; 
                        }
                    }
                }

                this.waterDrops = this.waterDrops.filter(drop => drop.y > 0); 
            }

            // If the helicopter is flying or taking off, play the sound
            if ((this.isflying || this.takingOff) && this.heliSound.paused) {
                this.heliSound.play();
            }
            if (!this.isflying && !this.takingOff && !this.isOverLake && !this.heliSound.paused) {
                this.heliSound.pause();
                this.heliSound.currentTime = 0;
            }

        }

        // Control methods
        turn(angle) {
            this.orientation += angle*this.scene.speedFactor;
        }

        accelerate(value) {
            if (this.isflying) {
                this.velocity = Math.max(this.velocity + value, 0);
                
                if (value > 0) {
                    this.inclination = Math.min(this.inclination + 0.009, Math.PI / 12);
                }
                else if (value < 0 && this.velocity > 0) {
                    this.inclination = Math.max(this.inclination - 0.009, -Math.PI / 12);
                }
            }
        }

        takeOff() {
            if ((!this.isflying && !this.takingOff )|| (this.isOverLake)) {
                this.takingOff = true;  
                this.bladespeed = 0.2;
                this.startTime = Date.now();
                this.startlake = this.position.y;
            }
        }

        land() {
            if (this.isflying && !this.landing) {
                const lakeCenterX = -50;
                const lakeCenterZ = 50;
                const lakeRadius = 24;

                const distanceToLakeCenter = Math.sqrt(Math.pow(this.position.x - lakeCenterX, 2) + Math.pow(this.position.z - lakeCenterZ, 2));

                if(distanceToLakeCenter <= lakeRadius){
                    this.landing = true;
                    this.startTime = Date.now();
                    this.inclination = 0;
                    this.isOverLake = true;
                    this.velocity = 0;
                }
                else{
                    this.landing = true;
                    this.startTime = Date.now();
                    this.inclination = 0;
                    this.isOverLake = false;
                }
            }
        }

        reset() {
            this.isflying = false;
            this.position.x = this.landingPos.x;
            this.position.z = this.landingPos.z;
            this.position.y = this.landingPos.y;
            this.orientation = 0;
            this.velocity = 0;
            this.bladespeed = 0;
            this.bucketdeployed = false;
            this.takingOff = false;
            this.landing = false;
            this.inclination = 0;
            this.bucketfull = false;
            if (this.scene.building) {
                this.scene.building.heliLandingTakeOff(false, false);
            }
        }

        dropwater(fire) {
            this.targetFire = fire;
            const fireX = 16;
            const fireZ = 22;
            const fireRadius = 10;

            const distanceToFire = Math.sqrt(Math.pow(this.position.x - fireX, 2) + Math.pow(this.position.z - fireZ, 2));

            if (this.bucketdeployed && this.bucketfull && distanceToFire <= fireRadius) {
                this.startTime = Date.now();
                 for (let i = 0; i < 10; i++) {
                    this.waterDrops.push({
                        x: this.position.x + (Math.random() - 0.5) * 2,
                        y: this.position.y - 1,
                        z: this.position.z + (Math.random() - 0.5) * 2,
                        speed: -0.5 - Math.random() * 0.5
                    });
                }
                this.bucketfull = false;
                
            }
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

            // Tail
            this.scene.pushMatrix();
            this.scene.translate(0, 0, -1.2);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.tremMaterial.apply();
            this.tail.display();
            this.scene.popMatrix();

            // Tail end
            this.scene.pushMatrix();
            this.scene.translate(0, 0, -1.2);
            this.scene.scale(0.19, 0.19, 0.19);
            this.tremMaterial.apply();
            this.tailend.display();
            this.scene.popMatrix();

            // Tail rotor
            this.scene.pushMatrix();
            this.scene.translate(-0.15, 0, -1.2);
            this.scene.rotate(Math.PI / 2, 0, 0, 1); 
            this.scene.scale(1, 0.1, 1);
            this.tremMaterial.apply();
            this.tailRotor.display();
            this.scene.popMatrix();

            // Tail rotor - blades
            this.scene.pushMatrix();
            this.scene.translate(-0.20, 0, -1.7);
            this.scene.rotate(-Math.PI / 2, 0, 0, 1);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.scene.translate(0, 0.5, 0);
            this.scene.scale(0.5, 0.03, 1);
            this.heliceMaterial.apply();
            this.tailRotorBlade.display();
            this.scene.popMatrix();

            // Every helix
            this.scene.pushMatrix();
            this.scene.translate(-0.20, 0, -1.7);
            this.scene.rotate(Math.PI / 2, 0, 0, 1);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.scene.translate(0, 0.5, 0);
            this.scene.scale(0.4, 0.03, 1);
            this.heliceMaterial.apply();
            this.tailRotorBlade.display();
            this.scene.popMatrix();

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

            this.scene.pushMatrix();
            this.scene.translate(0.15, 0, -1.2);
            this.scene.rotate(-Math.PI / 2, 0, 0, 1); 
            this.scene.scale(1, 0.1, 1);
            this.tremMaterial.apply();
            this.tailRotor.display();
            this.scene.popMatrix();
            
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
            
            this.scene.pushMatrix();
            this.scene.translate(0, 0.50, 0);
            this.scene.scale(2, 0.1, 2);
            this.tremMaterial.apply();
            this.mainRotor.display();
            this.scene.popMatrix();

            const bladeLength = 0.7;

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

            // Landing gear
            this.scene.pushMatrix();
            this.scene.translate(-0.4, -0.5, -0.5);      
            this.scene.scale(0.85, 1, 1); 
            this.scene.rotate(Math.PI / 2, 1, 0, 0);  
            this.tremMaterial.apply();  
            this.landingGear.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate( 0.4, -0.5, -0.5);    
            this.scene.scale(0.85, 1.0, 1);    
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.tremMaterial.apply();  
            this.landingGear.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-0.4, -0.5,  0.3);    
            this.scene.scale(1, 0.25, 1);
            this.scene.rotate( - Math.PI / 10, 0, 0, 1);  
            this.tremMaterial.apply();    
            this.landingGear.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-0.4, -0.5 , -0.3);    
            this.scene.scale(1, 0.25, 1);
            this.scene.rotate( - Math.PI / 10, 0, 0, 1); 
            this.tremMaterial.apply();   
            this.landingGear.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate( 0.4, -0.5,  0.3);    
            this.scene.scale(1, 0.25, 1);
            this.scene.rotate( Math.PI / 10, 0, 0, 1);  
            this.tremMaterial.apply();  
            this.landingGear.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate( 0.4, -0.5, -0.3);    
            this.scene.scale(1, 0.25, 1);
            this.scene.rotate( Math.PI / 10, 0, 0, 1);  
            this.tremMaterial.apply();  
            this.landingGear.display();
            this.scene.popMatrix();

            // Windows
            this.scene.pushMatrix();
            this.scene.translate(0.432, 0.22, -0.2); 
            this.scene.rotate(Math.PI / 1.8, 0, 1, 0); 
            this.scene.rotate(-Math.PI / 8, 1, 0, 0);
            this.scene.scale(0.7, 0.4, 1); 
            this.window.display(); 
            this.scene.popMatrix();
            
            this.scene.pushMatrix();
            this.scene.translate(0.432, 0.22, 0.2);
            this.scene.rotate(Math.PI / 2.2, 0, 1, 0);
            this.scene.rotate(-Math.PI / 8, 1, 0, 0); 
            this.scene.scale(0.7, 0.4, 1); 
            this.window.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-0.432, 0.22, -0.2); 
            this.scene.rotate(-Math.PI / 1.8, 0, 1, 0); 
            this.scene.rotate(-Math.PI / 8, 1, 0, 0); 
            this.scene.scale(0.7, 0.4, 1); 
            this.window.display(); 
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-0.432, 0.22, 0.2); 
            this.scene.rotate(-Math.PI / 2.2, 0, 1, 0); 
            this.scene.rotate(-Math.PI / 8, 1, 0, 0); 
            this.scene.scale(0.7, 0.4, 1); 
            this.window.display(); 
            this.scene.popMatrix(); 


            // Water bucket
            if (this.bucketdeployed) {
                this.scene.pushMatrix();
                
                if (this.bucketfull) { 
                    this.scene.rotate(Math.PI, 1, 0, 0);
                    this.scene.translate(0, 0.48, 0);
                    this.waterMaterial.apply();
                
                }
                else {
                    this.scene.translate(0, -0.7, 0);     
                    this.tremMaterial.apply();
                }

                this.scene.scale(0.5, 0.5, 0.5);
                this.bucket.display();
                this.scene.popMatrix();
            }

            // Water drops
            if (this.waterDrops.length > 0) {
                for (let drop of this.waterDrops) {
                    this.scene.pushMatrix();
                    this.scene.translate(drop.x - this.position.x, drop.y - this.position.y, drop.z - this.position.z);
                    this.scene.scale(0.2, 0.2, 0.2);
                    this.waterMaterial.apply();
                    this.cube.display();
                    this.scene.popMatrix();
                    }
            }
        }
    }