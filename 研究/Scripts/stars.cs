using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Text;


public class Stars
{
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

//         for (var e = vec3.create(), r = new Float32Array(t << 2), n = 0; n < r.length; n += 4) Random.unitVec3(e),
// 				vec3.scale(e, e, 50),
// 				r[n + 0] = e[0],
// 				r[n + 1] = e[1],
// 				r[n + 2] = e[2],
// 				r[n + 3] = lerp(0.1, 2.5, Math.pow(Math.random(), 10));
    }
}