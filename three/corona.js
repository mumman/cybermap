/**
 * Created by Administrator on 2016/5/6.
 */
define(['shaders'], function(shaders){

    var corona;
    var geometry=new THREE.BufferGeometry();



    var thetaSegments=128;
    var vertexCount = ( thetaSegments + 1 ) * ( 1 + 1 );

    // buffers
    var vertices = new THREE.BufferAttribute( new Float32Array( vertexCount * 3 ), 3 );
    var verticesW = new THREE.BufferAttribute( new Float32Array( vertexCount * 4 ), 4 );




    // some helper variables
    var index = 0, segment;
    var vertex = new THREE.Vector3();

    for ( i = 0; i <= 128+1; i ++ ) {
        segment = Math.PI*2*i/128;

        // vertex
        vertex.x =  Math.cos( segment );
        vertex.y =  Math.sin( segment );
        vertex.z = i/ (128 + 1);

        var index1=index++;
        vertices.setXYZ( index, vertex.x, vertex.y, vertex.z );
        vertices.setXYZ( index1, vertex.x, vertex.y, vertex.z );

        verticesW.setXYZW( index, vertex.x, vertex.y, vertex.z,0 );
        verticesW.setXYZW( index1, vertex.x, vertex.y, vertex.z,1 );
        // increase index
        index++;

    }


    // generate indices


    var indices=[];
    for ( var i = 0; i < 128; i ++ ) {

       /*  var a= i * 2;
         var b= i * 2 + 1;
         var c= i * 2 + 3;
         var d= i * 2 + 2;*/



        var a = i;
        var b = i + 128 + 1;
        var c = i + 128 + 2;
        var d = i + 1;

        indices.push(a,b,c);
        //indices.push(a,c,d);


    }


    // build geometry
    //geometry.setIndex(new ( verticesW.count>65535 ? THREE.Uint32Attribute : THREE.Uint16Attribute )(indices, 1));
    //geometry.addAttribute( 'position', verticesW.xyz );
    //geometry.addAttribute( 'positionW', verticesW );

    geometry.setIndex(new ( vertices.count>65535 ? THREE.Uint32Attribute : THREE.Uint16Attribute )(indices, 1));
    geometry.addAttribute( 'position', vertices );
    geometry.addAttribute( 'positionW', verticesW );



 /* var material=new THREE.MeshBasicMaterial({ color: 0xffffff,wireframe:true});*/

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
            side: THREE.DoubleSide,
            wireframe:true

        });
    var corona=new THREE.Mesh(geometry, material);


/*
    var corona;
    var geometry=new THREE.BufferGeometry();


    //自定义
    var thetaSegments=128;
    var phiSegments=1;
    var innerRadius=10;
    var outerRadius=20;
    var thetaLength=Math.PI*2;



    // these are used to calculate buffer length
    var vertexCount = ( thetaSegments + 1 ) * ( phiSegments + 1 );
    var indexCount = thetaSegments * phiSegments * 2 * 3;

    // buffers
    var indices = new THREE.BufferAttribute( new ( indexCount > 65535 ? Uint32Array : Uint16Array )( indexCount ) , 1 );
    var vertices = new THREE.BufferAttribute( new Float32Array( vertexCount * 3 ), 3 );
    var verticesW = new THREE.BufferAttribute( new Float32Array( vertexCount * 4 ), 4 );
    var normals = new THREE.BufferAttribute( new Float32Array( vertexCount * 3 ), 3 );
    var uvs = new THREE.BufferAttribute( new Float32Array( vertexCount * 2 ), 2 );

    // some helper variables
    var index = 0, indexOffset = 0, segment;
    var radius = innerRadius;
    var radiusStep = ( ( outerRadius - innerRadius ) / phiSegments );
    var vertex = new THREE.Vector3();
    var uv = new THREE.Vector2();
    var j, i;

    // generate vertices, normals and uvs

    // values are generate from the inside of the ring to the outside

    for ( j = 0; j <= phiSegments; j ++ ) {

        for ( i = 0; i <= thetaSegments; i ++ ) {

            segment =  i / thetaSegments * thetaLength;

            // vertex
            vertex.x = radius * Math.cos( segment );
            vertex.y = radius * Math.sin( segment );


            /!*vertex.x =  Math.cos( segment );
            vertex.y =  Math.sin( segment );*!/

            vertices.setXYZ( index, vertex.x, vertex.y, vertex.z );
            vertices.setXYZ( index, vertex.x, vertex.y, vertex.z );

            verticesW.setXYZW(index,vertex.x,vertex.y,vertex.z,0);
            verticesW.setXYZW(index,vertex.x,vertex.y,vertex.z,1);

            // normal
            normals.setXYZ( index, 0, 0, 1 );

          /!*  // uv
            uvs.setXY( index, 0, 0 );
            uvs.setXY( index, 1, 0);*!/

            // uv
            uv.x = ( vertex.x / outerRadius + 1 ) / 2;
            uv.y = ( vertex.y / outerRadius + 1 ) / 2;
            uvs.setXY( index, uv.x, uv.y );
            uvs.setXY( index, uv.x, uv.y );
            // increase index
            index++;

        }

        // increase the radius for next row of vertices
        radius += radiusStep;

    }

    // generate indices

    for ( j = 0; j < phiSegments; j ++ ) {

        var thetaSegmentLevel = j * ( thetaSegments + 1 );

        for ( i = 0; i < thetaSegments; i ++ ) {

            segment = i + thetaSegmentLevel;

            // indices
            var a = segment;
            var b = segment + thetaSegments + 1;
            var c = segment + thetaSegments + 2;
            var d = segment + 1;

            // face one
            indices.setX( indexOffset, a ); indexOffset++;
            indices.setX( indexOffset, b ); indexOffset++;
            indices.setX( indexOffset, c ); indexOffset++;

            // face two
            indices.setX( indexOffset, a ); indexOffset++;
            indices.setX( indexOffset, c ); indexOffset++;
            indices.setX( indexOffset, d ); indexOffset++;

        }

    }

    // build geometry

    geometry.setIndex( indices );
    geometry.addAttribute( 'position', vertices );
    geometry.addAttribute( 'positionW', verticesW );
    geometry.addAttribute( 'normal', normals );
    geometry.addAttribute( 'uv', uvs );




       /!*var material=new THREE.MeshBasicMaterial({ color: 0xffffff,wireframe:true});*!/

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
            side: THREE.DoubleSide

        });




    var corona=new THREE.Mesh(geometry, material);*/



   console.log('corona.js');
   return {
       corona:corona,
       customUniforms: customUniforms
   }

});