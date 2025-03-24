attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float normScale;
uniform float timeFactor;

varying vec4 posi;

void main() {
    vec4 vetor = vec4(aVertexPosition, 1.0);
    vetor.x += normScale*sin(timeFactor);
	gl_Position = uPMatrix * uMVMatrix*vetor;
    posi = gl_Position;
}

