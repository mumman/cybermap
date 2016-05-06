/**
 * Created by Administrator on 2016/5/6.
 */
define(['shaders'], function(shaders){
    var corona;
    var vertexCount=129;
    var geometry=new THREE.BufferGeometry();
    var positions=new THREE.BufferAttribute(new Float32Array(vertexCount*3), 3);
    var uvs=new THREE.BufferAttribute(new Float32Array(vertexCount*2), 2);
    var index=0,vertices=[];
    for(var r=128,n=0;n<r+1;n++){
        var o=Math.PI*2*n;
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
    var indices=[];
    for(var n=0;n<128;n++){
        var p1=vertices[n*2];
        var p2=vertices[n * 2 + 1];
        var p3=vertices[n * 2 + 3];
        var p4=vertices[n * 2 + 2];
        indices.push(p1,p2,p3);
        indices.push(p2,p3,p4);
    }

    geometry.setIndex(new ( positions.count>65535 ? THREE.Uint32Attribute : THREE.Uint16Attribute )(indices, 1));
    geometry.addAttribute('position', positions);
    geometry.addAttribute('uv', uvs);
    geometry.computeBoundingSphere();

/*
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
*/



    /*var material=new THREE.ShaderMaterial(
        {
            uniforms: customUniforms,

            vertexShader: shaders.shader['grid'].vertexShader,
            fragmentShader: shaders.shader['grid'].fragmentShader,
            side: THREE.DoubleSide
        });*/

    var material=new THREE.MeshBasicMaterial({ color: 0xffffff});
    corona=new THREE.Mesh(geometry, material);



    console.log('corona.js');
   return {
       corona:corona

   }
});