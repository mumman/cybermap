using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Text;

[System.Serializable]
public class country_data
{
    public string name = "";
    public byte byType = 0; //0 省 1 市 3 只有省的数据(北京，海南，太湾，直辖市等)
    public int[] picked_index = null;
    public int[] border_index = null;
    public Vector2 center_location = Vector2.zero;
    public Vector3[] cities_data = null;
    public int uid = -1;
}
public class Country
{

    static public Dictionary<int, country_data> dic_pick_index = new Dictionary<int, country_data>();
    static public void UnProjectMercator(float x, float y, float z, out float x_geo1, out float y_geo1)
    {
        x *= 0.1f;
        y *= 0.1f;

        y_geo1 = x * 180f;
        x_geo1 = (Mathf.Atan(Mathf.Exp(y * Mathf.PI)) - 0.25f * Mathf.PI) * 2f;
        x_geo1 *= Mathf.Rad2Deg;
//         double pi = 3.1415926535897932384626433832795d;
//         double rho = 180d / pi;
//         double er = 6371000d;
// 
//         x_geo1 = (((x * rho) / er) * 100000d);
//         y_geo1 = ((2 * rho * (System.Math.Atan(System.Math.Exp(y / er)) - pi / 4d)) * 100000d);

//         double x = mercator.X / 20037508.34 * 180;
// 
//         double y = mercator.Y / 20037508.34 * 180;
// 
//         double M_PI = Math.PI;
// 
//         y = 180 / M_PI * (2 * Math.Atan(Math.Exp(y * M_PI / 180)) - M_PI / 2);
    }
   
    /// <summary>
    /// 算法中y向内，z向上
    static void UnProjectEcef(double x, double y, double z, out double latitude, out double longitude)
    {
        double deg = 0.01745329252;
        double r = System.Math.Sqrt(x * x + y * y);
        longitude = System.Math.Asin(y / r) / deg;
        if (x < 0d && longitude > 0d)
            longitude = 180d - longitude;
        else if (x < 0d && longitude < 0d)
            longitude = -180d - longitude;

        latitude = System.Math.Atan(z / r) / deg;
    }
    public static ushort[] StringToUShortArray(string str)
    {
        byte[] Data = System.Convert.FromBase64String(str);
        int Ctr = 0;
        int items = Data.Length >> 1;
        ushort[] Arr = new ushort[items];
        for (int i = 0; i < items; ++i)
        {
            Arr[Ctr] = (ushort)(Data[i << 1] | Data[(i << 1) + 1] << 8);
            ++Ctr;
        }
        Data = null;
        return Arr;
    }
    public static uint[] StringToUIntArray(string str)
    {
        byte[] Data = System.Convert.FromBase64String(str);
        int Ctr = 0;
        int items = Data.Length >> 2;
        uint[] Arr = new uint[items];
        for (int i = 0; i < items; ++i)
        {
            Arr[Ctr] = System.BitConverter.ToUInt32(Data, i << 2);
            ++Ctr;
        }
        Data = null;
        return Arr;
    }
    public static short[] StringToShortArray(string str)
    {
        byte[] Data = System.Convert.FromBase64String(str);
        int Ctr = 0;
        int items = Data.Length >> 1;
        short[] Arr = new short[items];
        for (int i = 0; i < items; ++i)
        {
            Arr[Ctr] = (short)(Data[i << 1] | Data[(i << 1) + 1] << 8);
            ++Ctr;
        }
        Data = null;
        return Arr;
    }

    public static void build_geometry(Mesh mesh_country, Mesh mesh_coast)
    {
        CountriesData cd = Resources.Load<CountriesData>("Datas/CountriesData");
        if (cd != null)
        {
            for (int i = 0; i < cd.dic_pick_keys.Length; ++i )
                dic_pick_index.Add(cd.dic_pick_keys[i], cd.dic_pick_values[i]);

            mesh_country.SetVertices(cd.country_pos0);
            //mesh_country.SetNormals(country_normal0);
            mesh_country.subMeshCount = 4;
            mesh_country.SetIndices(cd.country_index, MeshTopology.Triangles, 0);
            mesh_country.SetIndices(cd.boundary_index, MeshTopology.Lines, 1);
            mesh_country.SetIndices(dic_pick_index[0].picked_index, MeshTopology.Triangles, 2);
            mesh_country.SetIndices(dic_pick_index[0].border_index, MeshTopology.Lines, 3);
            mesh_country.SetUVs(0, cd.country_tex);
            mesh_country.SetUVs(1, cd.country_pos1);
            mesh_country.SetUVs(2, cd.country_normal1);

            mesh_coast.SetVertices(cd.coast_pos0);
            mesh_coast.SetNormals(cd.coast_normal0);
            mesh_coast.SetIndices(cd.coast_index, MeshTopology.Triangles, 0);
            mesh_coast.SetUVs(0, cd.coast_tex);
            mesh_coast.SetUVs(1, cd.coast_pos1);
            mesh_coast.SetUVs(2, cd.coast_normal1);
        }
        cd = null;
    }
}