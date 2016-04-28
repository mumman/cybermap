using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Text;

public class Earth_Grid
{
    static float e = 1f, t = 10f;
    static public void project_mercator(ref Vector3 r, Vector3 n)
    {

        float o = n[0];
        float a = n[1];
        float i = Mathf.PI * a / 180f;
        float u = 90f / Mathf.PI * Mathf.Log(Mathf.Tan(0.25f * Mathf.PI + 0.5f * i));
        r[0] = -o / 180f;
        r[1] = Mathf.Clamp(u / 90f, -1f, 1f);
        r[2] = -e * n[2];
        r = r * t;
    }
    static public void project_ecef(ref Vector3 r, Vector3 n)
    {
        float o = Mathf.Deg2Rad * n[0];
        float a = Mathf.Deg2Rad * n[1];
        float i = e * n[2];
        float u = Mathf.Cos(a);
        float c = Mathf.Sin(a);
        float l = 1f;
        float s = 1f;
        r[0] = -(l + i) * u * Mathf.Cos(o);
        r[2] = (l + i) * u * Mathf.Sin(o);
        r[1] = (s + i) * c;
        r = r * t;
    }
    static int tt(int e, int t)
    {
        return 181 * e + t;
    }

    static float r = 0.014f;
    //static float n = 10f * r;
    static public void build_earth_grid(Mesh mesh)// 原网页中shader并未处理法线所以，这里去掉了法线数据
    {
        List<Vector3> pos0 = new List<Vector3>();
        List<Vector3> pos1 = new List<Vector3>();
        List<Vector2> tex0 = new List<Vector2>();

        List<int> o = new List<int>();

        Vector3 a = new Vector3(0f, 0f, -r); //a[2] = -r;
        Vector3 i = new Vector3();
        Vector3 u = new Vector3();
        Vector2 c = new Vector2();
        for (int l = -180; 180 >= l; l += 2) // for (var i = vec3.create(), u = vec3.create(), c = vec2.create(), l = -180; 180 >= l; l += 1)
        {
            for (int s = -90; 90 >= s; ++s) // for (var s = -90; 90 >= s; s += 1)
            {
                a.x = l; a.y = s; // vec2.set(a, l, s);
                c.x = ((float)l + 180f) / 360f; c.y = 1f - ((float)s + 90f) / 180f; //vec2.set(c, (l + 180) / 360, 1 - (s + 90) / 180);
                project_mercator(ref i, a); // GTW.project_mercator(i, a);
                u.x = 0; u.y = 0; u.z = -1; //vec3.set(u, 0, 0, -1);
                pos0.Add(i); // e(n, i, u);

                project_ecef(ref i, a); // GTW.project_ecef(i, a);
                pos1.Add(i); //e(n, i, u); //将i和u的数据加入n中
                //u = Vector3.Normalize(i); //vec3.normalize(u, i);
                //pos1.Add(i);
                tex0.Add(c); //e(n, c);
            }
        }
        for (int f = 0; f < 180; ++f) //for (var f = 0; 360 > f; ++f)
        {
            for (int v = 0; v < 180; ++v) //for (var v = 0; 180 > v; ++v)
            {
                //o.push(tt(f, v), tt(f + 1, v), tt(f + 1, v + 1), tt(f + 1, v + 1), tt(f, v + 1), tt(f, v)); 
                o.Add(tt(f, v));
                o.Add(tt(f + 1, v));
                o.Add(tt(f + 1, v + 1));
                o.Add(tt(f + 1, v + 1));
                o.Add(tt(f, v + 1));
                o.Add(tt(f, v));
            }
        }

        mesh.vertices = pos0.ToArray();
        mesh.uv = tex0.ToArray();
        mesh.SetUVs(1, pos1);
        mesh.SetIndices(o.ToArray(), MeshTopology.Triangles, 0);

        pos0 = null;
        pos1 = null;
        tex0 = null;
        o = null;
    }
}


// #if UNITY_STANDALONE
 //  #define IMPORT_GLENABLE
 //  #endif
 //  
 //  using UnityEngine;
 //  using System;
 //  using System.Collections;
 //  using System.Runtime.InteropServices;
 //  
 //  public class EnablePointSize : MonoBehaviour 
 //  {
 //      const UInt32 GL_VERTEX_PROGRAM_POINT_SIZE = 0x8642;
 //  
 //      const string LibGLPath =
 //  #if UNITY_STANDALONE_WIN
 //          "opengl32.dll";
 //  #elif UNITY_STANDALONE_OSX
 //          "/System/Library/Frameworks/OpenGL.framework/OpenGL";
 //  #elif UNITY_STANDALONE_LINUX
 //          "libGL";    // Untested on Linux, this may not be correct
 //  #else
 //          null;   // OpenGL ES platforms don't require this feature
 //  #endif
 //      
 //  #if IMPORT_GLENABLE
 //      [DllImport(LibGLPath)]
 //      public static extern void glEnable(UInt32 cap);
 //  
 //      private bool mIsOpenGL;
 //  
 //      void Start()
 //      {
 //          mIsOpenGL = SystemInfo.graphicsDeviceVersion.Contains("OpenGL");
 //      }
 //  
 //      void OnPreRender()
 //      {
 //          if (mIsOpenGL)
 //              glEnable(GL_VERTEX_PROGRAM_POINT_SIZE);
 //      }
 //  #endif
 //  }