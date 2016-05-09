/**
 * Created by Administrator on 2016/5/6.
 */
define(['shaders'], function(shaders){
/*    var corona;
    var vertexCount=129;
    var geometry=new THREE.BufferGeometry();
    var positions=new THREE.BufferAttribute(new Float32Array(vertexCount*3), 3);
    var uvs=new THREE.BufferAttribute(new Float32Array(vertexCount*2), 2);
    var index=0,vertices=[];
    for(var r=128,n=0;n<r+1;n++){
        var o=Math.PI*2*n/r;
        var a=n/r+1;
        var i=Math.cos(o);
        var u=Math.sin(o);
        positions.setXYZ(index, i,u,a);
        positions.setXYZ(index, i,u,a);
        uvs.setXYZ(index,0,0);
        uvs.setXY(index,1,0);
        vertices.push(index);
        index++;
    }
  /!*  var indices=[];
    for(var n=0;n<128;n++){
        var p1=vertices[n*2];
        var p2=vertices[n * 2 + 1];
        var p3=vertices[n * 2 + 3];
        var p4=vertices[n * 2 + 2];
        indices.push(p1,p2,p3);
        indices.push(p2,p3,p4);
    }

    geometry.setIndex(new ( positions.count>65535 ? THREE.Uint32Attribute : THREE.Uint16Attribute )(indices, 1));*!/
    geometry.addAttribute('position', positions);
    geometry.addAttribute('uv', uvs);
    geometry.computeBoundingSphere();

/!*
    public class Corona
    {
        static public void build_corona(Mesh mesh)
    {
        List<Vector3> corona_vertex = new List<Vector3>();
        List<Vector2> corona_vertex_offset = new List<Vector2>();
        List<int> corona_index = new List<int>();
        for (int r = 128, n = 0; n < r + 1; ++n)//         for (var e = [], r = 128, n = 0; r + 1 > n; ++n)
    {                                       //         {
        float o = Mathf.PI * 2f * (float)n / (float)r;// 			var o = TWO_PI * n / r,
        float a = (float)n / (float)(r + 1);// 				a = n / (r + 1),
        float i = Mathf.Cos(o);// 				i = Math.cos(o),
        float u = Mathf.Sin(o);// 				u = Math.sin(o);
        corona_vertex.Add(new Vector3(i, u, a));
        corona_vertex.Add(new Vector3(i, u, a));
        corona_vertex_offset.Add(new Vector2(0f, 0f));
        corona_vertex_offset.Add(new Vector2(1f, 0f));// 			e.push(i, u, a, 0, i, u, a, 1)

    }                                           // 		}

    for (int n = 0; n < 128; ++n)
    {
        corona_index.Add(n * 2 );
        corona_index.Add(n * 2 + 1);
        corona_index.Add(n * 2 + 3);
        corona_index.Add(n * 2 + 2);
    }

    mesh.SetVertices(corona_vertex);
    mesh.SetUVs(0, corona_vertex_offset);
    mesh.SetIndices(corona_index.ToArray(), MeshTopology.Quads, 0);
}
}
*!/



    /!*var material=new THREE.ShaderMaterial(
        {
            uniforms: customUniforms,

            vertexShader: shaders.shader['grid'].vertexShader,
            fragmentShader: shaders.shader['grid'].fragmentShader,
            side: THREE.DoubleSide
        });*!/









   /!* var material=new THREE.MeshBasicMaterial({ color: 0xffffff});
    corona=new THREE.Mesh(geometry, material);*!/

     var material=new THREE.PointsMaterial({ color: 0xffffff,size:20});
     corona=new THREE.Mesh(geometry, material);



    */




    var corona;
    var geometry=new THREE.BufferGeometry();


    var innerRadius=10.35;
    var outerRadius=15;
    var thetaSegments=128;
    var thetaLength=6.3;

    // these are used to calculate buffer length
    var vertexCount = ( thetaSegments + 1 ) * ( 1 + 1 );
    var indexCount = thetaSegments * 1 * 2 * 3;

    // buffers
    var indices = new THREE.BufferAttribute( new ( indexCount > 65535 ? Uint32Array : Uint16Array )( indexCount ) , 1 );
    var vertices = new THREE.BufferAttribute( new Float32Array( vertexCount * 3 ), 3 );
    var verticesW = new THREE.BufferAttribute( new Float32Array( vertexCount * 4 ), 4 );
    var normals = new THREE.BufferAttribute( new Float32Array( vertexCount * 3 ), 3 );
    var uvs = new THREE.BufferAttribute( new Float32Array( vertexCount * 2 ), 2 );

    // some helper variables
    var index = 0, indexOffset = 0, segment;
    var radiusStep = ( ( outerRadius - innerRadius ) / 1 );
    var vertex = new THREE.Vector3();
    var uv = new THREE.Vector2();

    // generate vertices, normals and uvs

    // values are generate from the inside of the ring to the outside
/*
    for ( var j = 0; j <= 1; j ++ ) {*/

        for ( var n = 0; n <= thetaSegments; n ++ ) {

            var o=Math.PI*2*n/128;

             vertex.x=Math.cos(o);
             vertex.y =Math.sin(o);
             vertex.z =n/128+1;

          /*  segment = n / thetaSegments * thetaLength;

            // vertex
            vertex.x = innerRadius * Math.cos( segment );
            vertex.y = innerRadius * Math.sin( segment );*/

            vertices.setXYZ( index, vertex.x, vertex.y, vertex.z );
            vertices.setXYZ( index+1, vertex.x, vertex.y, vertex.z );

            verticesW.setXYZW( index+1, vertex.x, vertex.y, vertex.z,0 );
            verticesW.setXYZW( index+1, vertex.x, vertex.y, vertex.z,1 );

            // uv
            uvs.setXY( index, 0, 0 );
            uvs.setXY( index+1, 1, 0);

            // increase index
            index++;

        }

/*
        // increase the radius for next row of vertices
        innerRadius += radiusStep;

    }

*/





    // generate indices



        for ( i = 0; i < 128; i ++ ) {
            // indices
            var a = i;
            var b = i + 128 + 1;
            var c = i + 128 + 2;
            var d = i + 1;
            // face one
            indices.setX( indexOffset, a ); indexOffset++;
            indices.setX( indexOffset, b ); indexOffset++;
            indices.setX( indexOffset, c ); indexOffset++;

            // face two
            indices.setX( indexOffset, a ); indexOffset++;
            indices.setX( indexOffset, c ); indexOffset++;
            indices.setX( indexOffset, d ); indexOffset++;
        }




















    // build geometry

    geometry.setIndex( indices );
    geometry.addAttribute( 'position', vertices );
    geometry.addAttribute( 'positionW', verticesW );
    geometry.addAttribute( 'normal', normals );
    geometry.addAttribute( 'uv', uvs );




    /*var material=new THREE.MeshBasicMaterial({ color: 0xffffff,wireframe:true});*/


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




    var corona=new THREE.Mesh(geometry, material);




    console.log('corona.js');
   return {
       corona:corona,
       customUniforms: customUniforms

   }
});