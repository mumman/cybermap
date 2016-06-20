using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Text;

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
