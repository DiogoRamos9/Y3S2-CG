#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec2 vCloudCoord;
varying float vElevation;

uniform sampler2D uSamplerPanorama;  
uniform sampler2D uSamplerClouds;    
uniform float uCloudIntensity;       
uniform float uTime;                 

void main() {
    // Get the sky color from the panorama texture
    vec4 skyColor = texture2D(uSamplerPanorama, vTextureCoord);
        
    vec2 cloudCoord1 = vCloudCoord;
    vec4 cloudColor1 = texture2D(uSamplerClouds, cloudCoord1);
    
    vec2 cloudCoord2 = vec2(
        vTextureCoord.x + uTime * 0.15,
        vTextureCoord.y * 0.8 + sin(uTime * 0.02) * 0.02 
    );
    vec4 cloudColor2 = texture2D(uSamplerClouds, cloudCoord2 * 0.6);
    
    vec2 cloudCoord3 = vec2(
        vTextureCoord.x - uTime * 0.1,             
        vTextureCoord.y * 0.9                      
    );
    vec4 cloudColor3 = texture2D(uSamplerClouds, cloudCoord3 * 0.85);
    
    vec2 cloudCoord4 = vec2(
        vTextureCoord.x * 1.2 + uTime * 0.25,      
        vTextureCoord.y * 1.1                      
    );
    vec4 cloudColor4 = texture2D(uSamplerClouds, cloudCoord4 * 1.5);
    
    float combinedAlpha = min(1.0, 
        cloudColor1.a * 1.1 + 
        cloudColor2.a * 0.7 + 
        cloudColor3.a * 0.6 +
        cloudColor4.a * 0.3
    );
    
    vec3 darkCloudColor = mix(
        vec3(0.3, 0.3, 0.35),  
        vec3(0.5, 0.5, 0.55),
        (cloudColor1.r + cloudColor2.r + cloudColor3.r + cloudColor4.r) / 4.0
    );
    
    float cloudVisibility = smoothstep(-0.2, 0.6, vElevation);
    
    combinedAlpha *= cloudVisibility * uCloudIntensity;
    
    combinedAlpha = min(1.0, combinedAlpha * 1.6);
    
    vec4 finalColor = mix(skyColor, vec4(darkCloudColor, 1.0), combinedAlpha * 0.85);
    
    gl_FragColor = finalColor;
}