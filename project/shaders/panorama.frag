#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec2 vCloudCoord;
varying float vElevation;

uniform sampler2D uSamplerPanorama;  // The original panorama texture
uniform sampler2D uSamplerClouds;    // The cloud texture with alpha channel
uniform float uCloudIntensity;       // Control cloud visibility (0.0 - 1.0)
uniform float uTime;                 // Time for additional effects

void main() {
    // Get the sky color from the panorama texture
    vec4 skyColor = texture2D(uSamplerPanorama, vTextureCoord);
    
    // Create multiple layers of clouds with FASTER speeds
    // First cloud layer - base layer with increased speed
    vec2 cloudCoord1 = vCloudCoord;
    vec4 cloudColor1 = texture2D(uSamplerClouds, cloudCoord1);
    
    // Second cloud layer - fast moving larger pattern
    vec2 cloudCoord2 = vec2(
        vTextureCoord.x + uTime * 0.05, // 5x faster than before
        vTextureCoord.y * 0.8 + sin(uTime * 0.04) * 0.07
    );
    vec4 cloudColor2 = texture2D(uSamplerClouds, cloudCoord2 * 0.6);
    
    // Third cloud layer - medium speed, different direction
    vec2 cloudCoord3 = vec2(
        vTextureCoord.x - uTime * 0.07, // Moving in opposite direction
        vTextureCoord.y * 0.9 + cos(uTime * 0.05) * 0.06
    );
    vec4 cloudColor3 = texture2D(uSamplerClouds, cloudCoord3 * 0.85);
    
    // Fourth cloud layer - very fast, small scale for dynamic effect
    vec2 cloudCoord4 = vec2(
        vTextureCoord.x * 1.2 + uTime * 0.12, // Very fast movement
        vTextureCoord.y * 1.1
    );
    vec4 cloudColor4 = texture2D(uSamplerClouds, cloudCoord4 * 1.5);
    
    // Combine cloud layers for more coverage and movement
    float combinedAlpha = min(1.0, 
        cloudColor1.a * 1.1 + 
        cloudColor2.a * 0.7 + 
        cloudColor3.a * 0.6 +
        cloudColor4.a * 0.3
    );
    
    // Make clouds darker by mixing with a dark gray color
    vec3 darkCloudColor = mix(
        vec3(0.3, 0.3, 0.35),  // Darker gray with slight blue tint
        vec3(0.5, 0.5, 0.55),  // Medium gray for highlights
        (cloudColor1.r + cloudColor2.r + cloudColor3.r + cloudColor4.r) / 4.0
    );
    
    // Determine cloud visibility based on elevation
    float cloudVisibility = smoothstep(-0.2, 0.6, vElevation);
    
    // Adjust combined alpha based on elevation and intensity
    combinedAlpha *= cloudVisibility * uCloudIntensity;
    
    // Create a more overcast look by increasing cloud coverage
    combinedAlpha = min(1.0, combinedAlpha * 1.6);
    
    // Blend the sky color with the dark cloud color
    vec4 finalColor = mix(skyColor, vec4(darkCloudColor, 1.0), combinedAlpha * 0.85);
    
    gl_FragColor = finalColor;
}