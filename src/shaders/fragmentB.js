export default /* glsl */`uniform float uTime;

varying vec2 vUv;
uniform sampler2D pic;
uniform sampler2D pic2;


float PI = 3.142;


void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * sin(3. * trip.yzx + (uTime * .15));
  trip.xyz += warpsScale * .05 * sin(11. * trip.yzx + (uTime * .15));
  trip.xyz += warpsScale * .025 * sin(17. * trip.yzx + (uTime * .15));
  
}  




void main() {
  vec2 uv = vUv;



  vec4 tex = texture2D(pic, uv);
  vec4 tex2 = texture2D(pic2, uv);


vec3 color2 = vec3(uv.x, uv.y, 1.);

 coswarp(color2, 3.);



  vec3 color = mix(tex.rgb, tex2.rgb, color2.r);

  coswarp(color, 3.);


  // else{

  //   coswarp(color, 3.);
  //   coswarp(color, 3.);

  //   // color = vec3(step(color.r, .9));
  // }



  



  gl_FragColor = vec4(color, 1.);
}`