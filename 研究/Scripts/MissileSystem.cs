using UnityEngine;
using System.Collections;
using System.Collections.Generic;



class Missile
{
    static public bool bStaticEffect = false;

    public int idx;
    public int external_id = 0;
    public GameObject goMissile = null;
    public Vector3 source_coord = Vector3.zero;
    public Vector3 target_coord = Vector3.zero;
    //public Matrix4x4 source_mat = Matrix4x4.identity;
    //public Matrix4x4 target_mat = Matrix4x4.identity;
    public Vector3 source_euler;
    public Vector3 target_euler;
    public Vector3 source_position;
    public Vector3 target_position;
    public float start_time = 0;
    public bool alive = false;
    public uint style = 1;
    //Color color;
    public bool has_source = false;
    public bool has_target = true;
    public bool draw_source_impact = true;

    public GameObject goShapeIcon = null;
    public GameObject goCone = null;
    public GameObject goQuadSource = null;
    public GameObject goQuadTarget = null;
    public GameObject goQuadSourceStatic = null;
    public GameObject goQuadTargetStatic = null;

    public byte StaticShow = 3;

    public Vector3[] verts = null;
    public List<Vector4> texs = null;
    public int[] idxs = null;

    public Mesh mesh = null;
    public MeshRenderer mrMis = null, mrShapeIcon = null, mrQuadSource = null, mrQuadTarget = null, mrQuadSourceStatic = null, mrQuadTargetStatic = null, mrCone = null;
    public MeshFilter mfShapeIcon = null;

    public Material[] MatsShapIcon;
    public Material[] MatsCone;
    public Material[] MatsQuadSource;
    public Material[] MatsQuadTarget;
    public Material[] MatsQuadSourceStatic;
    public Material[] MatsQuadTargetStatic;
    public Material[] MatsMis;

    public bool bShowCone = false, bShowIcon = false;

    public Vector3 v3Offset = new Vector3(0.58f, 0.58f, 0.58f);

    public Missile(int id/*, Material inMat*/)
    {
        idx = id;
        bShowIcon = MissileSystem.Instance.bShowIcon;
        bShowCone = MissileSystem.Instance.bShowCone;

        if (MissileSystem.Instance.bShowIcon)
            MatsShapIcon = new Material[GTW.Instance.systems.Count];
        if (MissileSystem.Instance.bShowCone)
            MatsCone = new Material[GTW.Instance.systems.Count];

        MatsQuadSource = new Material[GTW.Instance.systems.Count];
        MatsQuadTarget = new Material[GTW.Instance.systems.Count];
        MatsQuadSourceStatic = new Material[GTW.Instance.systems.Count];
        MatsQuadTargetStatic = new Material[GTW.Instance.systems.Count];
        MatsMis = new Material[GTW.Instance.systems.Count];
        //MisMat = inMat;            
    }

    //Vector3 MIS_i = Vector3.zero;// i = vec3.create(),
    //Vector3 MIS_u = Vector3.zero;// u = vec3.create(),
    //Vector3 MIS_c = Vector3.zero;// c = vec3.create(),
    //Vector3 MIS_s = Vector3.zero;// s = vec3.create();

    public void CreateTransform(ref Vector3 position, ref Vector3 euler, Vector3 t /* float r,   */)
    {
        Matrix4x4 e = Matrix4x4.identity;
        Vector3 o = Vector3.zero; // var o = i,
        Vector3 a = Vector3.zero; // a = u,
        Vector3 l = Vector3.zero; // l = c,
        Vector3 f = Vector3.zero; // f = s;

        bool bmercator;
        //if (Missile.bStaticEffect)
        bmercator = Map.projection.dir < 0f;
        //else
        //    bmercator = Map.projection.blend < 0.5f;

        if (bmercator)// n.project(f, t),// this.projection.blend < 0.5 ? GTW.project_mercator(e, t) : GTW.project_ecef(e, t)
            Earth_Grid.project_mercator(ref f, t);
        else
            Earth_Grid.project_ecef(ref f, t);


        if (!bmercator) // n.projection.blend > 0.5 ? (vec3.normalize(l, f), vec3.set(o, 0, 1, 0), vec3.cross(o, l, o), vec3.normalize(o, o), vec3.cross(a, o, l), e[0] = o[0], e[1] = o[1], e[2] = o[2], e[4] = l[0], e[5] = l[1], e[6] = l[2], e[8] = a[0], e[9] = a[1], e[10] = a[2]) : (mat4.identity(e), mat4.rotateX(e, e, -0.5 * Math.PI)),
        {
            l = Vector3.Normalize(f);
            o = Vector3.up;
            o = Vector3.Cross(l, o);
            o.Normalize();
            a = Vector3.Cross(o, l);
            e[0] = o[0]; e[1] = o[1]; e[2] = o[2]; e[4] = l[0]; e[5] = l[1]; e[6] = l[2]; e[8] = a[0]; e[9] = a[1]; e[10] = a[2];
        }
        else
        {
            e = Matrix4x4.identity;//mat4.identity(e), mat4.rotateX(e, e, -0.5 * Math.PI)
            labels.rotatex(ref e, e, -0.5f * Mathf.PI);
        }

        Quaternion q = Quaternion.LookRotation(e.GetColumn(2), e.GetColumn(1));
        euler = q.eulerAngles;

        // r && mat4.scale(e, e, [
        // r,
        // r,
        // r
        // ]),
        position = f;// e[12] = f[0],
        // e[13] = f[1],
        // e[14] = f[2]
    }
}

public class MissileSystem : MonoBehaviour
{
    static public MissileSystem Instance = null;

    static public int missile_p = 1000; // 1000个missile
    static int missile_g = 100; // 每个mssile100个顶点
    //static int missile_h = 8 * missile_g;

    List<Missile> list_missile = new List<Missile>(missile_p);
    public GameObject goMissileRoot, goMissileTraceRoot;

    public float MLS_scale = 1f;
    float MLS_width = 0.1f;
    float MLS_height = 0.005f;
    bool MLS_ff_impacts = false;
    public bool bShowIcon = true, bShowCone = true;
    int iCurLaunchIdx = -1, iCurMaxCount = 1000;

    Mesh meshCone = null;
    Mesh meshQuad = null;
    Mesh[] meshIcon = null;

    bool bShowPop = false;
    GameObject goPop = null;
    int iPopWidth, iPopHeight;
    UILabel lab_id, lab_type, lab_name, lab_src_ip, lab_des_ip, lab_count, lab_time, lab_level, lab_src_name, lab_des_name;
    UISprite sprPopBack;
    void Awake()
    {
        if (iCurMaxCount > missile_p)
            iCurMaxCount = missile_p;

        goMissileRoot = GameObject.Find("MissileRoot");
        goMissileTraceRoot = GameObject.Find("MissileTraceRoot");

        meshCone = new Mesh();
        meshQuad = new Mesh();
        meshIcon = new Mesh[9]; // 8种图标形状，下标1开始
        Instance = this;

        CreateMesh();

        for (int i = 0; i < missile_p; ++i)
            list_missile.Add(new Missile(i/*, GTW.Instance.systems[1].DarkMis*/));

        //         goPop = GameObject.Find("pop_attack");
        //         sprPopBack = GameObject.Find("background").GetComponent<UISprite>();
        //         iPopWidth = (int)(sprPopBack.localSize.x * goPop.transform.localScale.x);
        //         iPopHeight = (int)(sprPopBack.localSize.y * goPop.transform.localScale.y);
        //         lab_id = GameObject.Find("lab_id_val").GetComponent<UILabel>();
        //         lab_type = GameObject.Find("lab_type_val").GetComponent<UILabel>();
        //         lab_name = GameObject.Find("lab_name_val").GetComponent<UILabel>();
        //         lab_count = GameObject.Find("lab_count_val").GetComponent<UILabel>();
        //         lab_time = GameObject.Find("lab_time_val").GetComponent<UILabel>();
        //         lab_level = GameObject.Find("lab_level_val").GetComponent<UILabel>();
        //         lab_src_ip = GameObject.Find("lab_src_ip_val").GetComponent<UILabel>();
        //         lab_des_ip = GameObject.Find("lab_des_ip_val").GetComponent<UILabel>();
        //         lab_src_name = GameObject.Find("lab_src_name_val").GetComponent<UILabel>();
        //         lab_des_name = GameObject.Find("lab_des_name_val").GetComponent<UILabel>();
        //         goPop.SetActive(false);
    }

    void Start()
    {

        //         GameObject go = new GameObject("cone");
        //         MeshRenderer mr = go.AddComponent<MeshRenderer>();
        //         MeshFilter mf = go.AddComponent<MeshFilter>();
        //         mf.sharedMesh = meshIcon[7];


    }

    void ShapeAddVertex(float e, float t, List<Vector3> verts, List<int> idxs)// function e(e, t) 
    {// {
        verts.Add(new Vector3(Mathf.Cos(e), Mathf.Sin(e), t));// n.push(Math.cos(e), Math.sin(e), t)
        idxs.Add(idxs.Count);
    }// }

    static public List<int> CreateTriangleStripIndex(Vector3[] verts)
    {
        List<int> idxs = new List<int>();
        int i1 = 0, i2 = 0, i3 = 0;
        for (int tri = 0; ; )
        {
            if (tri % 2 == 0)
            {
                i1 = tri;
                i2 = tri + 1;
                i3 = tri + 2;
            }
            else
            {
                i1 = tri;
                i2 = tri + 2;
                i3 = tri + 1;
            }

            if (i2 >= verts.Length || i3 >= verts.Length)
                break;

            idxs.Add(i1); idxs.Add(i2); idxs.Add(i3);
            ++tri;
        }
        return idxs;
    }

    void CreateMesh()
    {
        List<Vector3> verts = new List<Vector3>();
        List<int> idxs = new List<int>();

        foreach (KeyValuePair<int, GTWSystem> kvp in GTW.Instance.systems)
        {
            verts.Clear();
            idxs.Clear();

            int iKey = kvp.Key;
            GTWSystem sys = kvp.Value;
            int r = sys.n_sides;
            bool a = r < 0;// var a = 0 > r;
            r = Mathf.Abs(r);// r = Math.abs(r);
            float i = a ? Mathf.PI / r : Mathf.PI * 2f / r;// var i;
            // i = a ? Math.PI / r : TWO_PI / r;
            for (int u = 5, c = 0; c < u; ++c)// for (var u = 5, c = 0; u > c; ++c) {
            {
                float l = 0f;
                for (int s = 0; s < r; ++s)// for (var l = 0, s = 0; r > s; ++s) e(l, c),
                {
                    ShapeAddVertex(l, c, verts, idxs);
                    ShapeAddVertex(l + i, c, verts, idxs);// e(l + i, c),
                    l += i;// l += i;
                }
                if (a)// a && (e(l, c), e(0, c)),
                {
                    ShapeAddVertex(l, c, verts, idxs);
                    ShapeAddVertex(0f, c, verts, idxs);
                }
                if (r == 31)// 31 == r && (l = 0.8, e(l, c), e(l + Math.PI, c))// }
                {
                    l = 0.8f;
                    ShapeAddVertex(l, c, verts, idxs);
                    ShapeAddVertex(l + Mathf.PI, c, verts, idxs);
                }
            }
            Mesh m = new Mesh();
            m.name = "ShapeIcon_" + iKey.ToString();
            m.SetVertices(verts);
            m.SetIndices(idxs.ToArray(), MeshTopology.Lines, 0);
            meshIcon[iKey] = m;
        }

        verts.Clear();
        idxs.Clear();

        for (int r = 32, n = 0; n < r; ++n)// for (var e = [], r = 32, n = 0; r > n; ++n) {
        {
            float o = Mathf.PI * 2.0f * n / (r - 1);// var o = TWO_PI * n / (r - 1),
            float a = Mathf.Cos(o);// a = Math.cos(o),
            float i = Mathf.Sin(o);// i = Math.sin(o);
            verts.Add(new Vector3(a, 0f, i));// e.push(a, 0, i, a, 1, i)
            verts.Add(new Vector3(a, 1f, i));

        }// }
        idxs = CreateTriangleStripIndex(verts.ToArray());

        meshCone.SetVertices(verts);
        meshCone.SetIndices(idxs.ToArray(), MeshTopology.Triangles, 0);
        meshCone.name = "meshCone";

        verts.Clear();
        idxs.Clear();
        verts.Add(new Vector3(0f, 0f, 0f));
        verts.Add(new Vector3(1f, 0f, 0f));
        verts.Add(new Vector3(0f, 1f, 0f));
        verts.Add(new Vector3(1f, 1f, 0f));
        idxs = CreateTriangleStripIndex(verts.ToArray());

        meshQuad.SetVertices(verts);
        meshQuad.SetIndices(idxs.ToArray(), MeshTopology.Triangles, 0);
        meshQuad.name = "meshQuad";
    }
    public void ClearAll()
    {
        foreach (Missile mis in list_missile)
        {
            if (mis.alive)
            {
                if (mis.mrMis != null)
                    mis.mrMis.enabled = false;
                mis.mrQuadSource.enabled = false;
                mis.mrQuadTarget.enabled = false;
                if (mis.bShowCone && mis.mrCone != null)
                    mis.mrCone.enabled = false;
                if (mis.bShowIcon && mis.mrShapeIcon != null)
                    mis.mrShapeIcon.enabled = false;
            }
            if (mis.mrQuadSourceStatic != null)
                mis.mrQuadSourceStatic.enabled = false;
            if (mis.mrQuadTargetStatic != null)
                mis.mrQuadTargetStatic.enabled = false;
            mis.alive = false;
        }
    }
    public void OnSwitchView()
    {
        foreach (Missile mis in list_missile)
            UpdateMissileTransform(mis);
    }
    // Update is called once per frame
    void Update()
    {
        foreach (Missile mis in list_missile)
        {
            float o = Time.time - mis.start_time;
            if (o > 4f && !Missile.bStaticEffect)
            {
                if (mis.alive)
                {
                    if (mis.mrMis != null)
                        mis.mrMis.enabled = false;
                    mis.mrQuadSource.enabled = false;
                    mis.mrQuadTarget.enabled = false;
                    if (mis.bShowCone && mis.mrCone != null)
                        mis.mrCone.enabled = false;
                    if (mis.bShowIcon && mis.mrShapeIcon != null)
                        mis.mrShapeIcon.enabled = false;
                }
                mis.alive = false;
            }

            if (mis.alive)
            {
                if (mis.has_source)
                {
                    mis.mrQuadSourceStatic.enabled = (mis.StaticShow == 1 || mis.StaticShow == 3); ;
                    if (o < 2f || Missile.bStaticEffect)
                    {
                        float fTmp = Missile.bStaticEffect ? 0.5f : o * 0.5f;
                        mis.mrMis.sharedMaterial.SetFloat("_MisTime", fTmp);
                        mis.mrMis.sharedMaterial.SetVector("_Offset", mis.v3Offset);
                        mis.mrMis.enabled = true;
                    }
                    else
                        mis.mrMis.enabled = false;

                    if (o < 1f || Missile.bStaticEffect)
                    {
                        float fTmp = Missile.bStaticEffect ? 0.5f : o;
                        mis.mrQuadSource.sharedMaterial.SetFloat("_MisTime", fTmp);
                        mis.mrQuadSource.enabled = true;
                    }
                    else
                        mis.mrQuadSource.enabled = false;

                    mis.mrQuadSourceStatic.sharedMaterial.SetFloat("_MisTime", 0.5f);
                }
                else
                {
                    if (mis.goMissile != null)
                        mis.mrMis.enabled = false;

                    mis.mrQuadSource.enabled = false;
                    mis.mrQuadSourceStatic.enabled = false;
                }
                if (mis.has_target)
                {

                    if (o >= 1f || Missile.bStaticEffect)
                    {
                        mis.mrQuadTargetStatic.enabled = (mis.StaticShow == 2 || mis.StaticShow == 3);
                        float fTmp = Missile.bStaticEffect ? 0.5f : (o - 1f);
                        mis.mrQuadTarget.sharedMaterial.SetFloat("_MisTime", fTmp);
                        mis.mrQuadTarget.enabled = true;
                    }
                    else if (o > 2f)
                        mis.mrQuadTarget.enabled = false;

                    if (mis.bShowCone && mis.mrCone != null)
                    {
                        if (o >= 1f && o < 2f)
                        {
                            mis.mrCone.sharedMaterial.SetFloat("_MisTime", o - 1f);
                            mis.mrCone.enabled = true;
                        }
                        else
                            mis.mrCone.enabled = false;
                    }


                    mis.mrQuadTargetStatic.sharedMaterial.SetFloat("_MisTime", 0.5f);
                }
                else
                {
                    mis.mrQuadTarget.enabled = false;
                    mis.mrQuadTargetStatic.enabled = false;
                    mis.mrCone.enabled = false;
                }


                if (mis.bShowIcon && mis.mrShapeIcon != null)
                {
                    if (o >= 1f && o < 2f)
                    {
                        mis.mrShapeIcon.sharedMaterial.SetFloat("_MisTime", o - 1f);
                        mis.mrShapeIcon.enabled = true;
                    }
                    else
                        mis.mrShapeIcon.enabled = false;
                }
            }
        }

        if (goPop != null && goPop.activeSelf)
            UpdatePopPosition();
    }

    int iCourseOffsetY = 18;
    void UpdatePopPosition()
    {
        if (goPop.activeSelf)
        {
            Vector3 vPos = Input.mousePosition;//点击的位置
            vPos.x = Mathf.Clamp(vPos.x, 0f, Screen.width - 1f);
            vPos.y = Mathf.Clamp(vPos.y, 0f, Screen.height - 1f);
            Vector3 zeroPos = new Vector3(Screen.width / 2f, Screen.height / 2f, 0f); //将NGUI的原点换算到unity的坐标点
            if (vPos.x + iPopWidth > Screen.width)
                vPos.x -= iPopWidth;

            if (vPos.y - iPopHeight - iCourseOffsetY < 0)
                vPos.y += iPopHeight;
            else
                vPos.y -= iCourseOffsetY;

            Vector3 nPos = vPos - zeroPos;
            goPop.transform.localPosition = nPos;
        }

    }

    Vector3 MLS_i = Vector3.zero;
    Vector3 MLS_u = Vector3.zero;


    private void UpdateMissileTransform(Missile mis)
    {
        if (!mis.alive && (mis.goQuadSourceStatic == null || mis.goQuadTargetStatic == null))
            return;

        if (mis.has_source)
        {
            if (mis.source_coord[2] < 0.015f)
            {
                mis.CreateTransform(ref mis.source_position, ref mis.source_euler, mis.source_coord);
                mis.draw_source_impact = true;

                mis.goQuadSource.transform.localPosition = mis.source_position;
                mis.goQuadSource.transform.localEulerAngles = mis.source_euler;
                mis.goQuadSourceStatic.transform.localPosition = mis.source_position;
                mis.goQuadSourceStatic.transform.localEulerAngles = mis.source_euler;

            }
            else
                mis.draw_source_impact = false;
        }
        else
        {
            if (MLS_ff_impacts)
                mis.start_time -= 1f;
        }

        mis.CreateTransform(ref mis.target_position, ref mis.target_euler, mis.target_coord);

        if (mis.has_target)
        {
            mis.goQuadTarget.transform.localPosition = mis.target_position;
            mis.goQuadTarget.transform.localEulerAngles = mis.target_euler;
            mis.goQuadTargetStatic.transform.localPosition = mis.target_position;
            mis.goQuadTargetStatic.transform.localEulerAngles = mis.target_euler;
            if (mis.bShowCone && mis.goCone != null)
            {
                mis.goCone.transform.localPosition = mis.target_position;
                mis.goCone.transform.localEulerAngles = mis.target_euler;
            }
        }
        if (mis.bShowIcon && mis.goShapeIcon != null)
        {
            mis.goShapeIcon.transform.localPosition = mis.target_position;
            mis.goShapeIcon.transform.localEulerAngles = mis.target_euler;
        }
    }

    private void LanLonToV3(ref Vector3 A, Vector3 M)
    {
        if (Missile.bStaticEffect)
        {
            if (Map.projection.dir < 0f)// e.project(A, M),// this.projection.blend < 0.5 ? GTW.project_mercator(e, t) : GTW.project_ecef(e, t)
                Earth_Grid.project_mercator(ref A, M);
            else
                Earth_Grid.project_ecef(ref A, M);
        }
        else
        {
            if (Map.projection.blend < 0.5f)// e.project(A, M),// this.projection.blend < 0.5 ? GTW.project_mercator(e, t) : GTW.project_ecef(e, t)
                Earth_Grid.project_mercator(ref A, M);
            else
                Earth_Grid.project_ecef(ref A, M);
        }
    }

    Vector3 GetOffset(Vector3 beg, Vector3 end)
    {
        if (Map.projection.dir < 0)
        {
            beg.z = 10f;
            end.z = 10f;
        }
        LanLonToV3(ref beg, beg);
        LanLonToV3(ref end, end);
        beg = beg - GTW.MainCamera.transform.position;
        end = end - GTW.MainCamera.transform.position;  
        return Vector3.Normalize(Vector3.Cross(beg, end));
    }

    public void LaunchMissile(uint t, Vector3 c, Vector3 s, float v, int ext_id = 0, byte byStaticShow = 3)
    {                  //       形状     终点      起点       角度      外部数据id        起点终点显示状态
        Missile mis = GetAMissile(Time.time);
        if (mis != null)
        {
            if (mis.alive)
            {
                if (mis.mrMis != null)
                    mis.mrMis.enabled = false;
                mis.mrQuadSource.enabled = false;
                mis.mrQuadTarget.enabled = false;
                if (mis.bShowCone && mis.mrCone != null)
                    mis.mrCone.enabled = false;
                if (mis.bShowIcon && mis.mrShapeIcon != null)
                    mis.mrShapeIcon.enabled = false;
            }
            mis.bShowCone = bShowCone;
            mis.bShowIcon = bShowIcon;
            mis.external_id = ext_id;
            mis.StaticShow = byStaticShow;
            //        gtw, t, r, n, scale, o
            // function(e, t, c, s, f, v) {
            if (GTW.Instance.systems.ContainsKey((int)t))
                mis.style = t;
            else
                mis.style = 1;

            if (mis.bShowIcon)
            {
                if (mis.goShapeIcon == null)
                {
                    mis.goShapeIcon = new GameObject();
                    mis.goShapeIcon.transform.parent = goMissileRoot.transform;
                    mis.mrShapeIcon = mis.goShapeIcon.AddComponent<MeshRenderer>();
                    mis.mfShapeIcon = mis.goShapeIcon.AddComponent<MeshFilter>();
                    mis.goShapeIcon.name = "Missile_" + mis.idx.ToString() + "_ShapeIcon_";
                }

                if (mis.MatsShapIcon == null)
                    mis.MatsShapIcon = new Material[GTW.Instance.systems.Count];
                if (mis.MatsShapIcon[mis.style - 1] == null)
                    mis.MatsShapIcon[mis.style - 1] = new Material(GTW.Instance.bDark ? GTW.Instance.systems[(int)mis.style].DarkShapeIcon : GTW.Instance.systems[(int)mis.style].LightShapeIcon);

                mis.mrShapeIcon.sharedMaterial = mis.MatsShapIcon[mis.style - 1];
                mis.mfShapeIcon.sharedMesh = meshIcon[(int)t];
            }

            if (mis.goQuadSource == null)
            {
                mis.goQuadSource = new GameObject();
                mis.goQuadSource.transform.parent = goMissileRoot.transform;
                mis.mrQuadSource = mis.goQuadSource.AddComponent<MeshRenderer>();
                MeshFilter mf = mis.goQuadSource.AddComponent<MeshFilter>();
                mf.sharedMesh = meshQuad;
                mis.goQuadSource.name = "Missile_" + mis.idx.ToString() + "_Quad_Source_";
            }
            if (mis.MatsQuadSource[mis.style - 1] == null)
                mis.MatsQuadSource[mis.style - 1] = new Material(GTW.Instance.bDark ? GTW.Instance.systems[(int)mis.style].DarkQuadSource : GTW.Instance.systems[(int)mis.style].LightQuadSource);

            mis.mrQuadSource.sharedMaterial = mis.MatsQuadSource[mis.style - 1];

            if (mis.goQuadTarget == null)
            {
                mis.goQuadTarget = new GameObject();
                mis.goQuadTarget.transform.parent = goMissileRoot.transform;
                mis.mrQuadTarget = mis.goQuadTarget.AddComponent<MeshRenderer>();
                MeshFilter mf = mis.goQuadTarget.AddComponent<MeshFilter>();
                mf.sharedMesh = meshQuad;
                mis.goQuadTarget.name = "Missile_" + mis.idx.ToString() + "_Quad_Target_";
            }
            if (mis.MatsQuadTarget[mis.style - 1] == null)
                mis.MatsQuadTarget[mis.style - 1] = new Material(GTW.Instance.bDark ? GTW.Instance.systems[(int)mis.style].DarkQuadTarget : GTW.Instance.systems[(int)mis.style].LightQuadTarget);

            mis.mrQuadTarget.sharedMaterial = mis.MatsQuadTarget[mis.style - 1];

            if (mis.goQuadSourceStatic == null)
            {
                mis.goQuadSourceStatic = new GameObject();
                mis.goQuadSourceStatic.transform.parent = goMissileRoot.transform;
                mis.mrQuadSourceStatic = mis.goQuadSourceStatic.AddComponent<MeshRenderer>();
                MeshFilter mf = mis.goQuadSourceStatic.AddComponent<MeshFilter>();
                mf.sharedMesh = meshQuad;
                mis.goQuadSourceStatic.name = "Missile_" + mis.idx.ToString() + "_Quad_Source_Static_";
            }
            if (mis.MatsQuadSourceStatic[mis.style - 1] == null)
                mis.MatsQuadSourceStatic[mis.style - 1] = new Material(GTW.Instance.bDark ? GTW.Instance.systems[(int)mis.style].DarkQuadSourceStatic : GTW.Instance.systems[(int)mis.style].LightQuadSourceStatic);

            mis.mrQuadSourceStatic.sharedMaterial = mis.MatsQuadSourceStatic[mis.style - 1];
            mis.mrQuadSourceStatic.enabled = false;

            if (mis.goQuadTargetStatic == null)
            {
                mis.goQuadTargetStatic = new GameObject();
                mis.goQuadTargetStatic.transform.parent = goMissileRoot.transform;
                mis.mrQuadTargetStatic = mis.goQuadTargetStatic.AddComponent<MeshRenderer>();
                MeshFilter mf = mis.goQuadTargetStatic.AddComponent<MeshFilter>();
                mf.sharedMesh = meshQuad;
                mis.goQuadTargetStatic.name = "Missile_" + mis.idx.ToString() + "_Quad_Target_Static_";
            }
            if (mis.MatsQuadTargetStatic[mis.style - 1] == null)
                mis.MatsQuadTargetStatic[mis.style - 1] = new Material(GTW.Instance.bDark ? GTW.Instance.systems[(int)mis.style].DarkQuadTargetStatic : GTW.Instance.systems[(int)mis.style].LightQuadTargetStatic);

            mis.mrQuadTargetStatic.sharedMaterial = mis.MatsQuadTargetStatic[mis.style - 1];
            mis.mrQuadTargetStatic.enabled = false;

            if (mis.bShowCone)
            {
                if (mis.goCone == null)
                {
                    mis.goCone = new GameObject();
                    mis.goCone.transform.parent = goMissileRoot.transform;
                    mis.mrCone = mis.goCone.AddComponent<MeshRenderer>();
                    MeshFilter mf = mis.goCone.AddComponent<MeshFilter>();
                    mf.sharedMesh = meshCone;
                    mis.goCone.name = "Missile_" + mis.idx.ToString() + "_Cone_";
                }
                if (mis.MatsCone == null)
                    mis.MatsCone = new Material[GTW.Instance.systems.Count];
                if (mis.MatsCone[mis.style - 1] == null)
                    mis.MatsCone[mis.style - 1] = new Material(GTW.Instance.bDark ? GTW.Instance.systems[(int)mis.style].DarkCone : GTW.Instance.systems[(int)mis.style].LightCone);

                mis.mrCone.sharedMaterial = mis.MatsCone[mis.style - 1];
            }

            if (s != Vector3.zero)
            {
                mis.has_source = true;
                mis.source_coord = s;
            }
            else
                mis.has_source = false;

            mis.start_time = Time.time;
            mis.alive = true;
            mis.target_coord = c;
            // if (this.style = t, this.shape = n.shapes[this.style], this.color = GTW.systems[this.style].color[e.palette].f, this.has_source = !! s, this.start_time = e.time, this.alive = !0, this.has_source && vec3.copy(this.source_coord, s), vec3.copy(this.target_coord, c), this.has_source) {
            if (mis.has_source)
            {
                float p = Vector3.Distance(s, c);// var p = vec2.distance(s, c),
                float m = MLS_height * p;// m = l.height * p,
                float d = (c[0] - s[0]) / p; // d = (c[0] - s[0]) / p,
                float _ = (c[1] - s[1]) / p; // _ = (c[1] - s[1]) / p,
                float b = 200f; // b = 200,
                float y = b * -_;// y = b * -_,
                float T = b * d;// T = b * d;
                // v = v || 0;
                float w = Mathf.Cos(v);
                float E = Mathf.Sin(v);
                //int x = 0;
                Vector3 A = MLS_i;
                Vector3 M = MLS_u;

                if (mis.verts == null)
                {
                    mis.verts = new Vector3[missile_g * 2];
                    mis.texs = new List<Vector4>(new Vector4[missile_g * 2]);
                }
                Vector2 v2id = Hotspot.StoV2((short)(mis.idx + 1));
                mis.v3Offset = GetOffset(s, c);
                for (int R = 0; R < missile_g; ++R)// for (var w = Math.cos(v), E = Math.sin(v), x = this.index * h, A = i, M = u, R = 0; g > R; ++R) {
                {
                    float P = (float)R / (float)(missile_g - 1);// var P = R / (g - 1);
                    M = Vector3.Lerp(s, c, P);// vec3.lerp(M, s, c, P);// 直线距离上的点
                    float L = m * Mathf.Sin(P * Mathf.PI) * 0.15f;// var L = m * Math.sin(P * Math.PI) * 0.15;// 距离相关的参数，距离远值就大些
                    // y、T为直线状态下每一段的偏移值d、 _并进行b缩放
                    //M[0] += E * L * y;// M[0] += E * L * y,
                    //M[1] += E * L * T;// M[1] += E * L * T,
                    M[2] += w * L * (Map.projection.dir < 0 ? 0.5f : 1f);// M[2] += w * L,

                    LanLonToV3(ref A, M);


                    // o[x + 0] = A[0],
                    // o[x + 1] = A[1],
                    // o[x + 2] = A[2],
                    // o[x + 3] = -P,
                    // o[x + 4] = A[0],
                    // o[x + 5] = A[1],
                    // o[x + 6] = A[2],
                    // o[x + 7] = P,
                    // x += 8

                    mis.verts[R << 1].Set(A[0], A[1], A[2]);
                    mis.texs[R << 1] = new Vector4(-P, 0f, v2id.x, v2id.y);
                    mis.verts[(R << 1) + 1].Set(A[0], A[1], A[2]);
                    mis.texs[(R << 1) + 1] = new Vector4(P, 0f, v2id.x, v2id.y);
                }// }

                if (mis.idxs == null)
                    mis.idxs = CreateTriangleStripIndex(mis.verts).ToArray();

                if (mis.goMissile == null)
                {
                    mis.goMissile = new GameObject("Missiles_" + mis.idx.ToString());
                    mis.goMissile.layer = goMissileTraceRoot.layer;
                    mis.goMissile.transform.parent = goMissileTraceRoot.transform;
                    mis.goMissile.transform.localPosition = Vector3.zero;
                    mis.goMissile.transform.localRotation = Quaternion.identity;
                    mis.goMissile.transform.localScale = Vector3.one;
                    mis.mrMis = mis.goMissile.AddComponent<MeshRenderer>();
                    MeshFilter mf = mis.goMissile.AddComponent<MeshFilter>();
                    mis.mesh = new Mesh();
                    mf.mesh = mis.mesh;
                    mis.mesh.vertices = mis.verts;
                    mis.mesh.SetUVs(0, mis.texs);
                    mis.mesh.SetIndices(mis.idxs, MeshTopology.Triangles, 0);
                    mis.mesh.bounds = new Bounds(Vector3.zero, new Vector3(100f, 100f, 100f));
                }
                else
                {
                    mis.mesh.vertices = mis.verts;
                    mis.mesh.SetUVs(0, mis.texs);
                }
                mis.mrMis.enabled = true;
                if (mis.MatsMis[mis.style - 1] == null)
                    mis.MatsMis[mis.style - 1] = new Material(GTW.Instance.bDark ? GTW.Instance.systems[(int)mis.style].DarkMis : GTW.Instance.systems[(int)mis.style].LightMis);

                mis.mrMis.sharedMaterial = mis.MatsMis[mis.style - 1];
                // var D = 4 * this.index * h;
                // webgl.bindVertexBuffer(a),
                // gl.bufferSubData(gl.ARRAY_BUFFER, D, this.verts)
            }   // }

            // this.has_source ? 
            //  (this.source_coord[2] < 0.015 ? 
            //      r(this.source_mat, this.source_coord, f, e), this.draw_source_impact = !0
            //      :
            //      this.draw_source_impact = !1) 
            //: 
            //  (l.ff_impacts && (this.start_time -= 1), r(this.target_mat, this.target_coord, f, e))
            UpdateMissileTransform(mis);
        }
    }

    Missile GetAMissile(float time)
    {
        ++iCurLaunchIdx;

        if (iCurLaunchIdx >= iCurMaxCount)
            iCurLaunchIdx = 0;

        JSInterface.Instance.ShowLog(iCurLaunchIdx.ToString());

        return list_missile[iCurLaunchIdx];
        //         Missile r = null;
        //         float n = 0f;
        //         for (int o = 0; o < list_missile.Count; ++o)// for (var r = null, n = 0, o = 0; o < t.length; ++o) {
        //         {
        //             Missile a = list_missile[o]; // var a = t[o];
        //             if (!a.alive)
        //                 return a;// if (!a.alive) return a;
        //             float i = time - a.start_time;// var i = e - a.start_time;
        //             if (i > n) // i > n && (n = i, r = a)
        //             {
        // 
        //                 n = i;
        //                 r = a;
        //             }
        //         }// }
        //         if (r != null)// return r ? r : _.sample(t)
        //             return r;
        //         else
        //         {
        //             //Debug.LogWarning("GetAMissile return null");
        //             return null;
        //            }
    }
    public string GetExternalId(int picked_id)
    {
        //         Hashtable hsAttackData = (Hashtable)JSInterface.Instance.alAttackList[picked_id];
        //         return (string)hsAttackData["id"];
        return list_missile[picked_id].external_id.ToString();
    }


    public void ShowPop(int id)
    {
        if (goPop == null)
            return;

        if (id == -1)
        {
            goPop.SetActive(false);
        }
        else
        {
            goPop.SetActive(true);
            Hashtable hsData = (Hashtable)JSInterface.Instance.alAttackList[id];
            if (hsData != null)
            {
                lab_id.text = (string)hsData["id"];
                lab_type.text = (string)hsData["type"];
                lab_name.text = (string)hsData["name"];
                lab_count.text = (string)hsData["count"];
                lab_time.text = (string)hsData["time"];
                lab_level.text = (string)hsData["level"];
                lab_src_ip.text = (string)hsData["srcip"];
                lab_des_ip.text = (string)hsData["desip"];
                lab_src_name.text = (string)hsData["srcname"];
                lab_des_name.text = (string)hsData["desname"];
            }
            UpdatePopPosition();
        }
    }

    public void SetMissileCount(int iSize)
    {
        if (iSize == iCurMaxCount)
            return;

        if (iSize > missile_p)
            iSize = missile_p;

        if (iSize > iCurMaxCount)
            iCurLaunchIdx = -1;

        iCurMaxCount = iSize;
    }

    public void SwitchPick(bool bPick)
    {
        if (bPick)
        {
            goMissileTraceRoot.layer = 12;
            for (int i = 0; i < iCurMaxCount; ++i)
            {
                Missile mis = list_missile[i];
                if (mis.mrMis == null)
                    continue;
                mis.goMissile.layer = 12;
                mis.mrMis.sharedMaterial = GTW.Instance.bDark ? GTW.Instance.systems[(int)mis.style].DarkMisPick : GTW.Instance.systems[(int)mis.style].LightMisPick;
            }
        }
        else
        {
            goMissileTraceRoot.layer = 0;
            for (int i = 0; i < iCurMaxCount; ++i)
            {
                Missile mis = list_missile[i];
                if (mis.mrMis == null)
                    continue;
                mis.goMissile.layer = 0;
                mis.mrMis.sharedMaterial = mis.MatsMis[mis.style - 1];
            }
        }
    }
}
