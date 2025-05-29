import { CGFobject, CGFshader, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPanorama extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.scene = scene;
        this.texture = texture;
        
        // Create sphere for panorama
        this.sphere = new MySphere(this.scene, true, 30, 30);
        
        // Load cloud texture
        this.cloudTexture = new CGFtexture(this.scene, 'texture/clouds.png');  // Make sure you add this texture
        
        // Initialize shader
        this.shader = new CGFshader(this.scene.gl, 'shaders/panorama.vert', 'shaders/panorama.frag');
        
        // Set initial shader uniform values
        this.shader.setUniformsValues({
            uSamplerPanorama: 0,  // Panorama texture unit
            uSamplerClouds: 1,    // Cloud texture unit
            uTime: 0.0,           // Initial time
            uCloudIntensity: 1.5  // Cloud visibility (adjust as needed)
        });
        
        // Start time for animation
        this.startTime = Date.now();
    }
    
    display() {
        // Save current scene state
        this.scene.pushMatrix();
        
        // Position the panorama at camera position
        const cameraPosition = this.scene.camera.position;
        this.scene.translate(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
        
        // Scale the sphere to create a large panorama
        this.scene.scale(400, 400, 400);
        
        // Apply the panorama shader
        this.scene.setActiveShader(this.shader);
        
        // Bind textures to appropriate texture units
        this.texture.bind(0);
        this.cloudTexture.bind(1);
        
        // Render the sphere
        this.sphere.display();
        
        // Reset to default shader
        this.scene.setActiveShader(this.scene.defaultShader);
        
        // Restore scene state
        this.scene.popMatrix();
    }
    
    update(t) {
        const timeValue = t * 0.02;
        this.shader.setUniformsValues({ 
            uTime: timeValue,
            uCloudIntensity: 1.2 + Math.sin(timeValue * 0.08) * 0.15
        });
    }
}