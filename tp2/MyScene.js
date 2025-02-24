import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram} from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

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
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.parallelogram = new MyParallelogram(this);
    this.triangleSmall = new MyTriangleSmall(this);
    this.triangleBig = new MyTriangleBig(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayTriangle = true;
    this.scaleFactor = 1;
    this.displayDiamond = false;
    this.displayTriangle = false;
    this.displayParallelogram = false;
    this.displayTriangleSmall = false;
    this.displayTriangleBig = false;
    this.displayTangram = false;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
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
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    // ---- BEGIN Primitive drawing section

    if (this.displayDiamond) {
      this.diamond.display();
    }

    if (this.displayTriangle) {
      this.triangle.display();
    }

    if (this.displayParallelogram) {
      this.parallelogram.display();
    }

    if (this.displayTriangleSmall) {
      this.triangleSmall.display();
    }

    if (this.displayTriangleBig) {
      this.triangleBig.display();
    }

    // Triangle 1?
    this.pushMatrix();
    this.translate(0, 0.5, 0);
    this.rotate(Math.PI, 0, 0, 1); // escuro
    this.triangleSmall.display();
    this.popMatrix();

    // Triangle 2
    this.pushMatrix();
    this.translate(-1, 0.5, 0);
    this.triangle.display();
    this.popMatrix();

    // Triangle 3
    this.pushMatrix();
    this.translate(1.5, -0.5, 0);
    this.scale(0.75, 0.75, 0.75);
    this.triangleBig.display();
    this.popMatrix();

    // Triangle 4
    this.pushMatrix();
    this.translate(-2.75, 0, 0);
    this.scale(0.75, 0.75, 0.75);
    this.triangleSmall.display();
    this.popMatrix();

    // Triangle 5?
    this.pushMatrix();
    this.rotate(Math.PI, 1, -1, 0);
    this.scale(0.5, 0.5, 0.5);
    this.translate(-3, 3, 0);
    this.triangle.display();
    this.popMatrix();

    // Parallelogram?
    this.pushMatrix();
    this.rotate(Math.PI, 0, 1, 0);
    this.translate(-4.25, -0.25, 0);
    this.scale(0.75, 0.75, 0.75);
    this.parallelogram.display();
    this.popMatrix();

    // Diamond
    var sca = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]

    var trans = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      2, 1.62, 0, 1,
    ]

    var rot = [
      Math.cos(-Math.PI / 6), -Math.sin(-Math.PI / 6), 0, 0,
      Math.sin(-Math.PI / 6), Math.cos(-Math.PI / 6), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]
    this.pushMatrix();
    this.multMatrix(sca);
    this.multMatrix(trans);
    this.multMatrix(rot);
    this.diamond.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}

