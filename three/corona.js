/**
 * Created by Administrator on 2016/5/6.
 */
define(['shaders'], function(shaders){

    var corona;
    var geometry=new THREE.BufferGeometry();

    var thetaSegments=128;
    var vertexCount=( thetaSegments+1 )*( 1+1 );

    // buffers
    var vertices=new THREE.BufferAttribute(new Float32Array(vertexCount*3), 3);
    var verticesW=new THREE.BufferAttribute(new Float32Array(vertexCount*4), 4);

    // some helper variables
    var index=0, segment;
    var vertex=new THREE.Vector3();

    for(i=0; i<=128+1; i++){
        segment=Math.PI*2*i/128;

        // vertex
        vertex.x=Math.cos(segment);
        vertex.y=Math.sin(segment);
        vertex.z=i/(128+1);

        var index1=index++;
        vertices.setXYZ(index, vertex.x, vertex.y, vertex.z);
        vertices.setXYZ(index1, vertex.x, vertex.y, vertex.z);

        verticesW.setXYZW(index, vertex.x, vertex.y, vertex.z, 0);
        verticesW.setXYZW(index1, vertex.x, vertex.y, vertex.z, 1);
        // increase index
        index++;

    }

    // generate indices
    var indices=[];
    for(var i=0; i<128; i++){
        var a=i*2;
        var b=i*2+1;
        var c=i*2+3;
        var d=i*2+2;

        indices.push(a, c, b);
        indices.push(a, d, c);

    }

    geometry.setIndex(new ( vertices.count>65535 ? THREE.Uint32Attribute : THREE.Uint16Attribute )(indices, 1));
    geometry.addAttribute('position', vertices);
    geometry.addAttribute('positionW', verticesW);


    //材质
    var t_smoke=new THREE.TextureLoader().load('textures/smoke.jpg');
    t_smoke.wrapS=THREE.RepeatWrapping;
    t_smoke.wrapT=THREE.ClampToEdgeWrapping;

    var customUniforms=shaders.shader['corona'].uniforms;
    customUniforms.t_smoke.value=t_smoke;


    var material=new THREE.ShaderMaterial(
        {
            uniforms: customUniforms,
            vertexShader: shaders.shader['corona'].vertexShader,
            fragmentShader: shaders.shader['corona'].fragmentShader,
            transparent: true,
            // blending: THREE.AdditiveBlending
            blending: THREE.CustomBlending,
            blendSrc: THREE.OneFactor,
            blendDst: THREE.OneFactor
        });
    var corona=new THREE.Mesh(geometry, material);

    console.log('corona.js');
    return {
        corona: corona,
        customUniforms: customUniforms
    }

});