/**
 * Created by Administrator on 2016/5/5.
 */
defind(function(){
    var stars;
    var star_count=2500;

    var geometry = new THREE.BufferGeometry();
    var positions = new Float32Array( particles * 3 );
    var colors = new Float32Array( particles * 3 );
    var color=new THREE.Color(1, 1, 1);


    var star_vertex = new THREE.Vector3();
    var star_size = new THREE.Vector2();
    var star_index=new Array(star_count);

    for(var i=0; i<star_count;i++){
        var v = new THREE.Vector3();
        v=Random.insideUnitSphere;
        v.Normalize();
        v *= 50;
        star_vertex[i] = v;
        positions.setXYZ(index,star_vertex[i].x,star_vertex[i].y,star_vertex[i].z);
        star_size[i].x =lerp(0.1, 2.5, Math.pow(Math.random(), 10));
        star_index[i] = i;

    }}

    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
    geometry.computeBoundingSphere();

    var materials = new THREE.PointsMaterial( { color: size } );
    stars = new THREE.Points( geometry, materials[i] );






    static int star_count = 2500;
    static public void build_stars(Mesh mesh)
    {
        Vector3[] star_vertex = new Vector3[star_count];
        Vector2[] star_size = new Vector2[star_count];
        int[] star_index = new int[star_count];
        for (int i = 0; i < star_count; ++i)
        {
            Vector3 v = Random.insideUnitSphere;
            v.Normalize();
            v *= 50f;
            star_vertex[i] = v;//.Set(v.x, v.y, v.z, Mathf.Lerp(0.1f, 2.5f, Mathf.Pow(Random.value, 10f)));
            star_size[i].x = Mathf.Lerp(0.1f, 2.5f, Mathf.Pow(Random.value, 10f));
            star_index[i] = i;
        }

        mesh.vertices = star_vertex;
        mesh.SetIndices(star_index, MeshTopology.Points, 0);
        mesh.uv = star_size;






    return {


    }

});