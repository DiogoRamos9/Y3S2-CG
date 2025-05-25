precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float uTime;

varying vec2 vTextureCoord;
varying vec3 vNormal;

void main() {
    // Aleatoriedade baseada na posição
    float rand = fract(sin(dot(aVertexPosition.xz, vec2(12.9898,78.233))) * 43758.5453);

    // Oscilação cíclica horizontal
    float waveX = sin(uTime * 2.0 + aVertexPosition.y * 3.0 + rand * 10.0) * 0.15 * (1.0 + rand);

    // Oscilação cíclica vertical (mais suave)
    float waveY = cos(uTime * 2.5 + aVertexPosition.x * 2.0 + rand * 8.0) * 0.10 * (0.7 + rand);

    // Aplica deslocamento
    vec3 displacedPosition = aVertexPosition;
    displacedPosition.x += waveX;
    displacedPosition.y += waveY;

    gl_Position = uPMatrix * uMVMatrix * vec4(displacedPosition, 1.0);

    vTextureCoord = aTextureCoord;
    vNormal = aVertexNormal;
}