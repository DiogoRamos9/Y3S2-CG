import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);

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

    //Initialize scene objects
    this.axis = new CGFaxis(this, 20, 1);
    this.plane = new MyPlane(this, 64);
    this.sphere = new MySphere(this, false, 64, 64, true);
    this.panorama = new MyPanorama(this, this.panoramaTexture);

    this.displayAxis = true;
    this.displayPlane = false;
    this.displaySphere = true;
    this.displayPanorama = false;


    this.earthTexture = new CGFtexture(this, "texture/earth.jpg");
    this.earthappearance = new CGFappearance(this);
    this.earthappearance.setTexture(this.earthTexture);
    this.earthappearance.setTextureWrap("REPEAT", "REPEAT");

    
    
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
  }
  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;

    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      keysPressed = true;
    }
    if (keysPressed)
      console.log(text);
  }

  update(t) {
    this.checkKeys();
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
      this.scale(400, 1, 400);
      this.rotate(-Math.PI / 2, 1, 0, 0);
      this.plane.display();
    }

    if(this.displaySphere){
      this.scale(10, 10, 10);
      this.rotate(-Math.PI, 0, 1, 0);
      this.earthappearance.apply();
      this.sphere.display();
    }

    if(this.displayPanorama){
      this.panorama.display();
    }
    
  }
}
