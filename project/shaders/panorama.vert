attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float uTime;

varying vec2 vTextureCoord;
varying vec2 vCloudCoord;
varying float vElevation;

void main() {
    // Standard position calculation
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    
    // Pass the regular texture coordinates for the panorama texture
    vTextureCoord = aTextureCoord;
    
    // Calculate cloud coordinates with INCREASED SPEED
    // Multiply the time factor by a larger value (0.08 instead of 0.025)
    float distortionFactor = sin(aVertexPosition.x * 0.2 + uTime * 0.1) * 0.08;
    
    vCloudCoord = vec2(
        aTextureCoord.x * 0.9 + uTime * 0.08 + distortionFactor, // Increased speed 3x
        aTextureCoord.y * 0.8 + cos(uTime * 0.06) * 0.05 // Added vertical motion
    );
    
    // Calculate vertex elevation (y-coordinate in normalized sphere coordinates)
    vElevation = normalize(aVertexPosition).y;
}