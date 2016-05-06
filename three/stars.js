/**
 * Created by Administrator on 2016/5/5.
 */
define(['shaders'], function(shaders){
    var stars;
    var star_count=2500;
    var radius = 20;
    var geometry=new THREE.BufferGeometry();


    var positions=new THREE.BufferAttribute(new Float32Array(star_count*3), 3);
    var star_size=new THREE.BufferAttribute(new Float32Array(star_count*2), 2);
    var star_index=new Uint32Array(star_count);


    var point=new THREE.Vector3();
    for(var i=0; i<star_count; i++){
        var v=new THREE.Vector3();
        /* v=Random.insideUnitSphere;
         v.Normalize();
         v*=50;
         point[i]=v;
         */

        var px=(Math.random()*100-50)*20;
        var py=(Math.random()*100-50)*20;
        var pz=(Math.random()*100-50)*20;
        positions.setXYZ(i, px, py, pz);


        /*var x=lerp(0.1, 2.5, Math.pow(Math.random(), 10));


         star_size.setX(i, x)*/
        star_index[i]=i;

    }


    geometry.setIndex(new THREE.BufferAttribute(star_index, 1));
    geometry.addAttribute('position', positions);
    geometry.addAttribute('uv', star_size);
    geometry.computeBoundingSphere();

/*    var materials=new THREE.PointsMaterial({color: new THREE.Color( 0xffffff )});*/

    var customUniforms=shaders.shader['stars'].uniforms;
    var materials=new THREE.ShaderMaterial(
        {
            uniforms: customUniforms,
            vertexShader: shaders.shader['stars'].vertexShader,
            fragmentShader: shaders.shader['stars'].fragmentShader
        });

    stars=new THREE.Points(geometry, materials);


    console.log("stars.js");
    return {
        stars: stars
    }

});
