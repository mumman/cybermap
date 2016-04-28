using UnityEngine;
using System.Collections;

public class ChinaProvinceCity : MonoBehaviour
{
    Mesh mesh_china;
    MeshRenderer mr_china;
    public Material mat_china, mat_china_pick, mat_china_border, mat_china_border_picked_province, mat_china_border_picked_city, mat_china_boundary;
    Material[] ChinaMats;
    Material[] ChinaPickMats;
    GameObject goChina;
    // Use this for initialization
    public ChinaDetailData cdd;
    static public ChinaProvinceCity Instance = null;

    void Awake()
    {
        Instance = this;

        goChina = new GameObject("ChinaProvinceCity");
        goChina.transform.localScale = new Vector3(-1f, 1f, 1f);
        mr_china = goChina.AddComponent<MeshRenderer>();
        MeshFilter mf_china = goChina.AddComponent<MeshFilter>();
        mesh_china = new Mesh();
        mesh_china.subMeshCount = 5;
        mesh_china.name = "mesh_china";
        mf_china.mesh = mesh_china;
        mat_china = Resources.Load<Material>("Materials/country");
        mat_china.SetFloat("_Deform", 1f);
        mat_china_pick = Resources.Load<Material>("Materials/country_pick");
        mat_china_pick.SetFloat("_Deform", 1f);
        mat_china_border_picked_province = Resources.Load<Material>("Materials/border_picked");
        mat_china_border_picked_province.SetFloat("_Deform", 1f);
        mat_china_border_picked_city = Resources.Load<Material>("Materials/border_picked");
        mat_china_border_picked_city.SetFloat("_Deform", 1f);
        mat_china_border = Resources.Load<Material>("Materials/border_picked");
        mat_china_border.SetFloat("_Deform", 1f);
        mat_china_boundary = Resources.Load<Material>("Materials/boundary");
        mat_china_boundary.SetFloat("_Deform", 1f);
        ChinaMats = new Material[5];
        ChinaMats[0] = mat_china;
        ChinaMats[1] = mat_china_boundary;
        ChinaMats[2] = mat_china_border_picked_province;
        ChinaMats[3] = mat_china_border_picked_city;
        ChinaMats[4] = mat_china_border;
        mr_china.materials = ChinaMats;
        ChinaPickMats = new Material[1];
        ChinaPickMats[0] = mat_china_pick;

        cdd = Resources.Load<ChinaDetailData>("Datas/ChinaDetailData");

        mesh_china.SetVertices(cdd.vertex_mecator);
        mesh_china.SetUVs(0, cdd.id_all);
        mesh_china.SetUVs(1, cdd.vertex_ecef);
        mesh_china.SetUVs(2, cdd.color_all);

        mesh_china.subMeshCount = 5;
        mesh_china.SetIndices(cdd.index_all, MeshTopology.Triangles, 0);
        mesh_china.SetIndices(cdd.index_boundary, MeshTopology.Lines, 1);
        mesh_china.SetIndices(cdd.index_no_picked, MeshTopology.Lines, 2);
        mesh_china.SetIndices(cdd.index_no_picked, MeshTopology.Lines, 3);
        mesh_china.SetIndices(cdd.index_no_picked, MeshTopology.Lines, 4);
        mesh_china.bounds = new Bounds(Vector3.zero, new Vector3(100f, 100f, 100f));
        //         cdd.index_all = null;
        //         cdd.index_boundary = null;
        //         
        //         cdd.id_all = null;
        //         cdd.vertex_ecef = null;
        //         cdd.vertex_mecator = null;
        //         cdd.color_all = null;

    }
    void Start()
    {

    }

    void SetPickedUid(country_data cd)
    {
        if (cd.byType == 0)
            Shader.SetGlobalFloat("My_province_picked_uid", cd.uid);
        else if (cd.byType == 1)
            Shader.SetGlobalFloat("My_city_picked_uid", cd.uid);
        else if (cd.byType == 3)
            Shader.SetGlobalFloat("My_municipalities_picked_uid", cd.uid);
    }

    int iCurPickId = 0;
    public void Pick(int pick_id)
    {
        iCurPickId = pick_id;
        if (pick_id >= 300)
        {
            if (cdd.bIncCity && iCurPickId >= cdd.iCityIdBeg)
            {
                mesh_china.SetIndices(cdd.china_cities[iCurPickId - cdd.iCityIdBeg].border_index, MeshTopology.Lines, 3);
                mesh_china.SetIndices(cdd.china_provinces[cdd.city_province_map[iCurPickId - cdd.iCityIdBeg]].border_index, MeshTopology.Lines, 2);
                SetPickedUid(cdd.china_cities[iCurPickId - cdd.iCityIdBeg]);
                SetPickedUid(cdd.china_provinces[cdd.city_province_map[iCurPickId - cdd.iCityIdBeg]]);
                Shader.SetGlobalFloat("My_municipalities_picked_uid", -2f);
            }
            else
            {
                mesh_china.SetIndices(cdd.china_provinces[iCurPickId - 301].border_index, MeshTopology.Lines, 2);
                SetPickedUid(cdd.china_provinces[iCurPickId - 301]);
                Shader.SetGlobalFloat("My_city_picked_uid", -2f);
            }
            mesh_china.SetIndices(cdd.china_border, MeshTopology.Lines, 4);
        }
        else
        {
            mesh_china.SetIndices(cdd.index_no_picked, MeshTopology.Lines, 2);
            mesh_china.SetIndices(cdd.index_no_picked, MeshTopology.Lines, 3);
            mesh_china.SetIndices(cdd.index_no_picked, MeshTopology.Lines, 4);
            Shader.SetGlobalFloat("My_province_picked_uid", -2f);
            Shader.SetGlobalFloat("My_municipalities_picked_uid", -2f);
            Shader.SetGlobalFloat("My_city_picked_uid", -2f);
        }
    }


    public void UpdateDeform(float fDeform)
    {
        mat_china.SetFloat("_Deform", fDeform);
        mat_china_pick.SetFloat("_Deform", fDeform);
        mat_china_border_picked_province.SetFloat("_Deform", fDeform);
        mat_china_border_picked_city.SetFloat("_Deform", fDeform);
        mat_china_boundary.SetFloat("_Deform", fDeform);
        mat_china.SetFloat("_Deform", fDeform);
        if (fDeform > 0.5f)
            mat_china_boundary.SetFloat("_Height", 0.002f);
        else
            mat_china_boundary.SetFloat("_Height", 0.001f);

//         if (iCurPickId >= 300)
//         {
//             if (cdd.bIncCity && iCurPickId >= cdd.iCityIdBeg)
//             {
//                 Shader.SetGlobalFloat("My_province_picked_uid", (float)cdd.china_cities[iCurPickId - cdd.iCityIdBeg].uid);
//                 Shader.SetGlobalFloat("My_city_picked_uid", (float)cdd.china_provinces[cdd.city_province_map[iCurPickId - cdd.iCityIdBeg]].uid);
//             }
//             else
//             {
//                 Shader.SetGlobalFloat("My_province_picked_uid", (float)cdd.china_provinces[iCurPickId - 301].uid);
//                 Shader.SetGlobalFloat("My_city_picked_uid", -2f);
//             }
//         }
//         else
//         {
//             Shader.SetGlobalFloat("My_province_picked_uid", -2f);
//             Shader.SetGlobalFloat("My_city_picked_uid", -2f);
//         }
    }
    public void SwitchPick(bool bPick)
    {
        if (goChina == null)
            return;

        if (bPick)
        {
            goChina.layer = 14;
            mesh_china.subMeshCount = 2;
            mr_china.materials = ChinaPickMats;
        }
        else
        {
            goChina.layer = 0;
            mesh_china.subMeshCount = 5;
            mr_china.materials = ChinaMats;
            Pick(iCurPickId);
        }
    }
}
