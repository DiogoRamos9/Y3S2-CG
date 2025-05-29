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
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    
    vTextureCoord = aTextureCoord;
    
    float distortionFactor = sin(aVertexPosition.x * 0.2 + uTime * 0.3) * 0.15;
    
    vCloudCoord = vec2(
        aTextureCoord.x + uTime * 5.0 + distortionFactor,
        aTextureCoord.y + sin(uTime * 0.1) * 0.05
    );
    
    vElevation = normalize(aVertexPosition).y;
}