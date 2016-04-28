using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class HotspotData
{
    int id;
    float fLon;
    float fLat;
    byte type;
}

public class Hotspot : MonoBehaviour
{
    static public short V2toS(Vector2 v2)
    {
        int tmp1 = ((int)((v2.y + 0.005f) * 256f) >> 3) *  256;
        int tmp = (int)((v2.x + 0.005f) * 256f);
        return (short)((tmp1 + tmp) >> 3);
    }

    static public Vector2 StoV2(short s)
    {
        int tmp = s << 3;
        Vector2 v2 = Vector2.zero;

        v2.y = Mathf.Floor((float)tmp / 256f);
        v2.x = Mathf.Floor((float)tmp - v2.y * 256f);
        v2.y *= 8f;
        return v2 / 256f;
    }

//     float V2toF(Vector2 v2 ) 
//     {
//         return (v2.x + (v2.y * 256f)) / (256f * 256f); 
//     }
// 
//     Vector2 FtoV2(float f)
//     {
//         var y = Mathf.Floor(f / 256f);
//         var x = Mathf.Floor(f % 256f);
//         return new Vector2(x, y) / 256f;
//     }


    static public Hotspot Instance = null;

    static public short TotalCount = 500;

    //public float fUpdateInterval = 60f;
    //float fLastUpdateTime = 0f;
    //public bool bUpdate = false, bUpdating = false;
    //public string strRequestDataUrl = "";

    List<HotspotData> HotspotList = null;
    GameObject goHotspot;
    public MeshRenderer mrHotspot;
    MeshFilter mfHotspot;
    Material[] matHotspot;
    Material[] matHotspotPick;
    Mesh meshHotspot;

    Vector3[] vxEcef, vxMct;// 球面、平面顶点
    Vector4[] texs;// uv及id
    List<int> idx0 = new List<int>(), idx1 = new List<int>(), idx2 = new List<int>();// 不同强度的三角索引

    float[] c = { -1f, -1f, -1f, 1f, 1f, 1f, /*-1f, -1f, 1f, 1f,*/ 1f, -1f };
    float fHeight = 0.001f;
    float fSize = 0.03f;
    void Awake()
    {
//         Vector2 vvvv = StoV2(500);
//         short fffff = V2toS(vvvv);
        Instance = this;
        goHotspot = new GameObject("HotSpotMap");
        goHotspot.transform.localScale = new Vector3(-1f, 1f, 1f);
        goHotspot.layer = 13;
        mrHotspot = goHotspot.AddComponent<MeshRenderer>();
        mrHotspot.enabled = false;
        mfHotspot = goHotspot.AddComponent<MeshFilter>();
        matHotspot = new Material[3];
        matHotspot[0] = new Material(Resources.Load<Material>("Materials/hotspot"));
        matHotspot[0].SetColor("_Color", new Color(238f / 255f, 201f / 255f, 201f / 255f));
        matHotspot[1] = new Material(Resources.Load<Material>("Materials/hotspot"));
        matHotspot[1].SetColor("_Color", new Color(31f / 255f, 82f / 255f, 176f / 255f));
        matHotspot[2] = new Material(Resources.Load<Material>("Materials/hotspot"));
        matHotspot[2].SetColor("_Color", new Color(158f / 255f, 195f / 255f, 255f / 255f));
        mrHotspot.materials = matHotspot;
        matHotspotPick = new Material[3];
        matHotspotPick[0] = new Material(Resources.Load<Material>("Materials/hotspot_pick"));
        matHotspotPick[1] = matHotspotPick[0];
        matHotspotPick[2] = matHotspotPick[0];
        meshHotspot = new Mesh();
        meshHotspot.bounds = new Bounds(Vector3.zero, new Vector3(100f, 100f, 100f));
        mfHotspot.mesh = meshHotspot;
        meshHotspot.subMeshCount = 3;
        meshHotspot.name = "HotspotMesh";
        CreateRes();
        
        //indices = MissileSystem.CreateTriangleStripIndex(vxEcef);
    }
    void CreateRes()
    {
        HotspotList = new List<HotspotData>(TotalCount);
        vxEcef = new Vector3[TotalCount * 4];
        vxMct = new Vector3[TotalCount * 4];
        texs = new Vector4[TotalCount * 4];

        for (int i = 0; i < TotalCount; ++i)
        {
            Vector2 v2i = StoV2((short)(i + 1));
            float id = (float)(i + 1) / (float)TotalCount;
            texs[(i << 2)].Set(0f, 0f, v2i.x, v2i.y);
            texs[(i << 2) + 1].Set(1f, 0f, v2i.x, v2i.y);
            texs[(i << 2) + 2].Set(1f, 1f, v2i.x, v2i.y);
            texs[(i << 2) + 3].Set(0f, 1f, v2i.x, v2i.y);
        }
    }
    void Start()
    {
        //bUpdate = true;
        UpdateData("{\"data\" : [[1,1,-64.20462,-36.8353844],[2,2,40.0,40.0],[3,3,50.0,50.0],[2,2,40.5,40.5],[2,2,41.0,41.0],[2,2,41.5,41.5]]}");
    }

    // Update is called once per frame
//     void Update()
//     {
//         if (Time.time - fLastUpdateTime > fUpdateInterval && strRequestDataUrl != "")
//             bUpdate = false;
// 
//         if (bUpdate && !bUpdating)
//         {
//             //if (strRequestDataUrl == "")
//             //    return;
// 
//             fLastUpdateTime = Time.time;
//             bUpdate = false;
//             StartCoroutine(GetData());
//         }
//     }

    public void UpdateDeform(float fVal)
    {
        matHotspot[0].SetFloat("_Deform", fVal);
        matHotspot[1].SetFloat("_Deform", fVal);
        matHotspot[2].SetFloat("_Deform", fVal);
    }

//    IEnumerator GetData()
    public void UpdateData(string str_data)
    {
//         bUpdating = true;
//         WWW www = new WWW(strRequestDataUrl);
//         yield return www;
// 
//         if (www.error != null)
//         {
//             JSInterface.Instance.ShowLog("Request Hotspot Data Error");
//         }
//         else
//         {
            bool ok = true;
//            Hashtable data = (Hashtable)JSON.JsonDecode(www.text, ref ok);

            Hashtable data = (Hashtable)JSON.JsonDecode(str_data, ref ok);
        
            if (ok)
            {
                idx0.Clear();
                idx1.Clear();
                idx2.Clear();
                int curVerIdx = 0;
                Matrix4x4 matEcef = Matrix4x4.identity;
                Matrix4x4 matMct = Matrix4x4.identity;

                ArrayList al = (ArrayList)data["data"];
                ArrayList val;
                for (int i = 0; i < al.Count && i < TotalCount; ++i)
                {
                    val = (ArrayList)al[i];
                    int iType = (int)(double)val[1];
                    if (iType == 1)
                    {
                        idx0.Add(curVerIdx);
                        idx0.Add(curVerIdx + 1);
                        idx0.Add(curVerIdx + 2);
                        idx0.Add(curVerIdx);
                        idx0.Add(curVerIdx + 2);
                        idx0.Add(curVerIdx + 3);
                    }
                    else if(iType == 2)
                    {
                        idx1.Add(curVerIdx);
                        idx1.Add(curVerIdx + 1);
                        idx1.Add(curVerIdx + 2);
                        idx1.Add(curVerIdx);
                        idx1.Add(curVerIdx + 2);
                        idx1.Add(curVerIdx + 3);
                    }
                    else if (iType == 3)
                    {
                        idx2.Add(curVerIdx);
                        idx2.Add(curVerIdx + 1);
                        idx2.Add(curVerIdx + 2);
                        idx2.Add(curVerIdx);
                        idx2.Add(curVerIdx + 2);
                        idx2.Add(curVerIdx + 3);
                    }
                    Vector3 posEcef = Vector3.zero, posMct = Vector3.zero;
                    Earth_Grid.project_ecef(ref posEcef, new Vector3((float)(double)val[2], (float)(double)val[3], fHeight));
                    Earth_Grid.project_mercator(ref posMct, new Vector3((float)(double)val[2], (float)(double)val[3], fHeight));
                    labels.t(ref matEcef, posEcef, fSize, fSize, true);
                    labels.t(ref matMct, posMct, fSize, fSize, false);
                    for (int j = 0; j < c.Length; j += 2, ++curVerIdx)
                    {
                        vxEcef[curVerIdx] = matEcef.MultiplyPoint(new Vector3(c[j], c[j + 1], 0f));
                        vxMct[curVerIdx] = matMct.MultiplyPoint(new Vector3(c[j], c[j + 1], 0f));
                    }
                }

                meshHotspot.vertices = vxMct;
                meshHotspot.SetUVs(0, new List<Vector4>(texs));
                meshHotspot.SetUVs(1, new List<Vector3>(vxEcef));
                meshHotspot.SetIndices(idx0.ToArray(), MeshTopology.Triangles, 0);
                meshHotspot.SetIndices(idx1.ToArray(), MeshTopology.Triangles, 1);
                meshHotspot.SetIndices(idx2.ToArray(), MeshTopology.Triangles, 2);
            }
//        }
//        bUpdating = false;
//        yield return null;
    }
    
    public void SwitchPick(bool bPick)
    {
        if (goHotspot == null)
            return;

        if (bPick)
        {
            goHotspot.layer = 13;
            mrHotspot.materials = matHotspotPick;
        }
        else
        {
            goHotspot.layer = 0;
            mrHotspot.materials = matHotspot;
        }
        
    }
}
