export default /* glsl */ `
varying vec2 vUv;
uniform sampler2D pic;
uniform sampler2D pic2;

uniform float uTime;


void coswarp(inout vec3 trip, float warpsScale ){

    trip.xyz += warpsScale * .1 * sin(3. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .05 * sin(11. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .025 * sin(17. * trip.yzx + (uTime * .15));
    
  }  

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    

  vec4 tex = texture2D(pic, uv);
  vec4 tex2 = texture2D(pic2, uv);


vec3 color2 = vec3(uv.x, uv.y, 1.);

 coswarp(color2, 3.);



  vec3 color = mix(tex.rgb, tex2.rgb, color2.r);
    // modelPosition.z = sin(uTime + color.r) * 3.;
    // modelPosition.y += sin(uTime + color.b) * .1;
    // modelPosition.x += color.g;
    // modelPosition.y += color.b;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}`