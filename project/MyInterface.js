import { CGFinterface, dat } from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
    
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();
    
        // Add controls for scene objects
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayPlane').name('Display Plane');
        this.gui.add(this.scene, 'displaySphere').name('Display Sphere');
        this.gui.add(this.scene, 'displayPanorama').name('Display Panorama');
        this.gui.add(this.scene, 'displayBuilding').name('Display Building');
        this.gui.add(this.scene, 'displayTree').name('Display Tree');
        this.gui.add(this.scene, 'displayForest').name('Display Forest');
        this.gui.add(this.scene, 'displayHeli').name('Display Helicopter');
        this.gui.add(this.scene, 'displayFire').name('Display Fire');
        this.gui.add(this.scene, 'displayLake').name('Display Lake');
        this.gui.add(this.scene, 'speedFactor', 0.1, 3.0).name('Speed Factor');

        const BuildingFolder = this.gui.addFolder('Building Parameters');
        BuildingFolder.add(this.scene, 'buildingwidth', 1.0, 200.0).name('Building Width');
        BuildingFolder.add(this.scene, 'numfloors', 1, 30).name('Number Floors');
        BuildingFolder.add(this.scene, 'numwindows', 1, 10).name('Number Windows');
        
        // Add controls for MyTree parameters
        const treeFolder = this.gui.addFolder('Tree Parameters');
        treeFolder.add(this.scene, 'treeInclination', -1.5, Math.PI / 2).name('Inclination (rad)');
        treeFolder.add(this.scene, 'xInclination').name('Inclination Axis');
        treeFolder.add(this.scene, 'trunkRadius', 0.1, 2.0).name('Trunk Radius');
        treeFolder.add(this.scene, 'treeHeight', 1.0, 6.0).name('Tree Height');
        treeFolder.addColor(this.scene, 'treeTopColor').name('Tree Top Color');
    
        this.initKeys();
    
        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui = this;

        // disable the processKeyboard function
        this.processKeyboard = function () { };

        // create a named array to store which keys are being pressed
        this.activeKeys = {};
    }
    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code] = true;
    };

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code] = false;
    };

    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }

}