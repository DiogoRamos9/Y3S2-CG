import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyWindow } from "./Mywindow.js";
import { MyDoor } from "./MyDoor.js";
import { MyBuilding } from "./MyBuilding.js";
import { MyCircle } from "./MyCircle.js";
import { MyTree } from "./MyTree.js";
import { MyForest } from "./MyForest.js";
import { MyHeli } from "./MyHeli.js";
import { MyLake } from "./MyLake.js";
import { MyFire } from "./MyFire.js";


/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();

    // Default tree parameters
    this.treeInclination = 0; // Inclination in radians
    this.xInclination = true; // Inclination axis (true for X, false for Z)
    this.trunkRadius = 0.5; // Radius of the trunk
    this.treeHeight = 5; // Height of the tree
    this.treeTopColor = [51, 204, 51]; // Default green color in RGB

    this.buildingwidth = 30; // Width of the building
    this.numfloors = 4; // Number of floors
    this.numwindows = 2; // Number of windows per floor

    this.speedFactor = 1;

    this.focusheli = false; // Flag to check if the camera should focus on the helicopter
    this.defaultCamera = null; 
    this.heliCamera = null;
  }

  init(application) {
    super.init(application);

    this.setGlobalAmbientLight(1.0, 1.0, 1.0, 1.0);

    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0, 0, 0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.enableTextures(true);

    this.setUpdatePeriod(50);


    this.panoramaTexture = new CGFtexture(this, "texture/panorama.jpg");
    this.panoramaappearance = new CGFappearance(this);
    this.panoramaappearance.setTexture(this.panoramaTexture);
    this.panoramaappearance.setTextureWrap("REPEAT", "REPEAT");

    this.windowTexture = new CGFtexture(this, "texture/window.jpg");
    this.windowappearance = new CGFappearance(this);
    this.windowappearance.setTexture(this.windowTexture);
    this.windowappearance.setTextureWrap("REPEAT", "REPEAT");

    this.doorTexture = new CGFtexture(this, "texture/door.png");
    this.doorappearance = new CGFappearance(this);
    this.doorappearance.setTexture(this.doorTexture);
    this.doorappearance.setTextureWrap("REPEAT", "REPEAT");

    this.placarTexture = new CGFtexture(this, "texture/letreiro.png");
    this.placarappearance = new CGFappearance(this);
    this.placarappearance.setTexture(this.placarTexture);
    this.placarappearance.setTextureWrap("REPEAT", "REPEAT");

    //Initialize scene objects
    this.axis = new CGFaxis(this, 20, 1);
    this.plane = new MyPlane(this, 64);
    this.sphere = new MySphere(this, false, 64, 64, true);
    this.panorama = new MyPanorama(this, this.panoramaTexture);
    this.window = new MyWindow(this, this.windowTexture);
    this.door = new MyDoor(this, this.doorTexture, this.placarTexture);

    this.currentBuildingWidth = this.buildingwidth;
    this.currentNumFloors = this.numfloors;
    this.currentNumWindows = this.numwindows;
    this.building = new MyBuilding(this, this.buildingwidth , this.numfloors, this.numwindows, this.windowTexture, [0.6, 0.6, 0.6], this.doorTexture, this.placarTexture);
    this.tree = new MyTree(
        this,
        this.treeInclination,
        this.xInclination,
        this.trunkRadius,
        this.treeHeight,
        this.treeTopColor.map(c => c / 255) // Convert RGB to [0, 1] range
    );
    this.forest = new MyForest(this, 5, 4, 22, 22);
    this.heli = new MyHeli(this, 0, this.building.getCentralHeight() + 3, 0, 0, 0);
    this.lake = new MyLake(this);
    this.fire = new MyFire(this);

    this.fire.initShaders(this);


    this.displayAxis = false;
    this.displayPlane = true;
    this.displaySphere = false;
    this.displayPanorama = true;
    this.displayWindow = false;
    this.displayDoor = false;
    this.displayBuilding = true;
    this.displayTree = false;
    this.displayForest = true;
    this.displayHeli = true;
    this.displayFire = true;
    this.displayLake = true;
    this.fireReignite = 0;
    

    this.setUpdatePeriod(20);
    this.startime = Date.now();


    this.earthTexture = new CGFtexture(this, "texture/earth.jpg");
    this.earthappearance = new CGFappearance(this);
    this.earthappearance.setTexture(this.earthTexture);
    this.earthappearance.setTextureWrap("REPEAT", "REPEAT");
    

    this.grassTexture = new CGFtexture(this, "texture/grass.jpg");
    this.grassappearance = new CGFappearance(this);
    this.grassappearance.setTexture(this.grassTexture);
    this.grassappearance.setTextureWrap("REPEAT", "REPEAT");
    
    
  }
  initLights() {
    this.lights[0].setPosition(200, 200, 200, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.9,
      1.0,
      1000,
      vec3.fromValues(20, 20, 20),
      vec3.fromValues(0, 0, 0)
    );
    this.defaultCamera = this.camera;
  }
  checkKeys(value) {
    var text = "Keys pressed: ";
    var keysPressed = false;

    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW") || this.gui.isKeyPressed("ArrowUp")) {
      text += " W ";
      keysPressed = true;
      this.heli.accelerate(value*10);
    }

    if (this.gui.isKeyPressed("KeyS") || this.gui.isKeyPressed("ArrowDown")) {
      text += " S ";
      keysPressed = true;
      this.heli.accelerate(-value*20);
    }

    if (this.gui.isKeyPressed("KeyA") || this.gui.isKeyPressed("ArrowLeft")) {
      text += " A ";
      keysPressed = true;
      this.heli.turn(value*10);
    }

    if (this.gui.isKeyPressed("KeyD") || this.gui.isKeyPressed("ArrowRight")) {
      text += " D ";
      keysPressed = true;
      this.heli.turn(-value*10);
    }

    if (this.gui.isKeyPressed("KeyR")){
      text += " R ";
      keysPressed = true;
      this.heli.reset();
    }

    if (this.gui.isKeyPressed("KeyP") && this.displayHeli){
      text += " P ";
      keysPressed = true;
      this.heli.takeOff();
    }

    if (this.gui.isKeyPressed("KeyL")) {
      text += " L ";
      keysPressed = true;
      this.heli.land();
    }

    if (this.gui.isKeyPressed("KeyF")) {
    text += " F ";
    keysPressed = true;
    this.focusheli = true;
    if (this.heliCamera === null) { 
        this.heliCamera = new CGFcamera(
            1.9,
            1.0,
            1000,
            vec3.fromValues(0, 0, 0), 
            vec3.fromValues(0, 0, 0)
        );
    }
    this.camera = this.heliCamera;
}

    if (this.gui.isKeyPressed("KeyC")) {
      text += " C ";
      keysPressed = true;
      this.focusheli = false;
      this.camera = this.defaultCamera;
    }

    if (this.gui.isKeyPressed("KeyO")){
      text += " O ";
      keysPressed = true;
      const wasActive = !this.fire.extinguished;
      this.heli.dropwater(this.fire);
    }

    if (keysPressed)
      console.log(text);
  }

  update(t) {
    const newBuildingHeight = this.building.getCentralHeight() + 3;

    if(this.lastupdatetime === undefined){
      this.lastupdatetime = t;
    }
    let deltaTime = (t - this.lastupdatetime)/1000;
    this.lastupdatetime = t;


    if(this.heli.landingPos.y !== newBuildingHeight) {
      this.heli.landingPos.y = newBuildingHeight;
    }

    if (!this.heli.isflying && !this.heli.landing && !this.heli.isOverLake) {
      if(this.heli.position.y !== newBuildingHeight) {
        this.heli.position.y = newBuildingHeight;
      }
    }

    if (this.heli.cruiseAltitude !== newBuildingHeight + 3) {
        this.heli.cruiseAltitude = newBuildingHeight + 3;

        
        if (this.heli.isflying && !this.heli.landing) {
            this.heli.position.y = this.heli.cruiseAltitude;
        }
    }
    
    if (this.focusheli && this.heliCamera !== null) {
    // Distância atrás e acima do helicóptero
    const dist = 3;
    const altura = 8;

    // Calcula a posição atrás do helicóptero com base na orientação
    const camX = this.heli.position.x - dist * Math.sin(this.heli.orientation);
    const camY = this.heli.position.y + altura;
    const camZ = this.heli.position.z - dist * Math.cos(this.heli.orientation);

    this.heliCamera.setPosition(
        vec3.fromValues(camX, camY, camZ)
    );
    this.heliCamera.setTarget(
        vec3.fromValues(
            this.heli.position.x,
            this.heli.position.y,
            this.heli.position.z
        )
    );
  }

  if(this.fire.extinguished && this.fireReignite > 0){
    this.fireReignite -= deltaTime;
    if(this.fireReignite <= 0){
      this.fire.extinguished = false;
      this.fireReignite = 0;
    }
}
    
    
    let time = (t - this.startime) / 1000.0;
    this.heli.update(time, this.speedFactor);
    this.checkKeys(this.speedFactor/200);

    if(this.fire.fireShader){
      this.fire.fireShader.setUniformsValues({ uTime: time/5 });
    }
  }

  setDefaultAppearance() {
    this.setAmbient(0.5, 0.5, 0.5, 1.0);
    this.setDiffuse(0.5, 0.5, 0.5, 1.0);
    this.setSpecular(0.5, 0.5, 0.5, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) {
      this.axis.display();
    }
    

    this.setDefaultAppearance();
    
    if(this.displayPlane){
      this.pushMatrix();
      this.scale(400, 1, 400);
      this.rotate(-Math.PI / 2, 1, 0, 0);
      this.grassappearance.apply();
      this.plane.display();
      this.popMatrix();
    }

    if(this.displaySphere){
      this.pushMatrix();
      this.scale(10, 10, 10);
      this.rotate(-Math.PI, 0, 1, 0);
      this.earthappearance.apply();
      this.sphere.display();
      this.popMatrix();
    }

    if(this.displayPanorama){
      this.panorama.display();
    }
    
    
    if (this.displayBuilding) {
  
    if (
        this.currentBuildingWidth !== this.buildingwidth ||
        this.currentNumFloors !== this.numfloors ||
        this.currentNumWindows !== this.numwindows
    ) {
        
        this.currentBuildingWidth = this.buildingwidth;
        this.currentNumFloors = this.numfloors;
        this.currentNumWindows = this.numwindows;

        
        this.building = new MyBuilding(
            this,
            this.buildingwidth,
            this.numfloors,
            this.numwindows,
            this.windowTexture,
            [0.8, 0.8, 0.8],
            this.doorTexture,
            this.placarTexture,

        );
    }

   
    this.building.display();
}

    if (this.displayTree) {
        this.tree = new MyTree(
            this,
            this.treeInclination,
            this.xInclination,
            this.trunkRadius,
            this.treeHeight,
            this.treeTopColor.map(c => c / 255) // Converter RGB para o intervalo [0, 1]
        );
        this.tree.display();
    }
    
    if (this.displayForest) {
      this.pushMatrix();
      this.translate(20, 0, 25);
      this.forest.display();
      this.popMatrix();
    }

    if (this.displayHeli) {
      this.pushMatrix();
      this.translate(this.heli.position.x, this.heli.position.y , this.heli.position.z);
      this.rotate(this.heli.orientation, 0, 1, 0);
      this.rotate(this.heli.inclination, 1, 0, 0);
      this.scale(7 , 6 , 6); 
      this.heli.display();
      this.popMatrix();

    }

    if (this.displayFire) {
      this.pushMatrix();
      this.translate(16, 0, 22);
      this.scale(5, 3, 6);
      this.fire.display();
      this.popMatrix();
    }

    if (this.displayLake) {
      this.pushMatrix();
      this.translate(-50, 0.02, 50);
      this.rotate(Math.PI/2, 1, 0 ,0) // Ajustar a escala do lago
      this.scale(5, 5, 5 );
      this.lake.display();
      this.popMatrix();
    }

    // ---- END Background, camera and axis setup

   
    
    

  }
}
