varying vec3 vPosition;

void main() {
    gl_FragColor = vec4(1., 0., 0., 1.);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}