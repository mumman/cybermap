using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Text;

public class GTWEvent
{
    public uint key = 0;
    public uint count = 0;
    public uint remaining = 0;
    public ulong end_time = 0ul;
    public ulong next_event_time = 0ul;
    public Vector4 coords = Vector4.zero;
    public float angle = 0f;

    public void NextEvent()
    {
        ulong t = System.Math.Max(0ul, end_time - next_event_time);
        float r = (float)((double)t / (double)this.remaining);
        float n = GTW.e_random(r);
        next_event_time += (ulong)n;
        angle += Mathf.PI / 5f;
    }
}
public class GTWSystem
{
    public int id = 0;
    public string name = "";
    public string discription = "";
    public short n_sides = 0;
    public bool enabled = true;
    public bool enabled_graph = true;
    public int count = 0;
    public int[] target_count = new int[256];
    public int[] target_rank = new int[256];
    public int[] graph = new int[60];
    public Color colorDark, colorLight;

    public Material DarkMis, LightMis, DarkMisPick, LightMisPick,DarkShapeIcon, LightShapeIcon, DarkCone, LightCone, DarkQuadSource, LightQuadSource, DarkQuadTarget, LightQuadTarget, DarkQuadSourceStatic, LightQuadSourceStatic, DarkQuadTargetStatic, LightQuadTargetStatic;
    public GTWSystem(int in_id, string in_name, string in_discripe, short in_nside, Color cDark, Color cLight)
    {
        id = in_id;
        name = in_name;
        discription = in_discripe;
        n_sides = in_nside;
        colorDark = cDark;
        colorLight = cLight;

        DarkMis = new Material(Resources.Load<Material>("Materials/missile"));
        DarkMis.SetColor("_Color", colorDark);
        if (colorDark == colorLight)
            LightMis = DarkMis;
        else
        {
            LightMis = new Material(Resources.Load<Material>("Materials/missile"));
            LightMis.SetColor("_Color", colorLight);
        }

        DarkMisPick = new Material(Resources.Load<Material>("Materials/missile_pick"));
        LightMisPick = DarkMisPick;

        DarkShapeIcon = new Material(Resources.Load<Material>("Materials/missile_shapeicon"));
        DarkShapeIcon.SetColor("_Color", colorDark);
        if (colorDark == colorLight)
            LightShapeIcon = DarkShapeIcon;
        else
        {
            LightShapeIcon = new Material(Resources.Load<Material>("Materials/missile_shapeicon"));
            LightShapeIcon.SetColor("_Color", colorLight);
        }

        DarkCone = new Material(Resources.Load<Material>("Materials/missile_cone"));
        DarkCone.SetColor("_Color", colorDark);
        if (colorDark == colorLight)
            LightCone = DarkCone;
        else
        {
            LightCone = new Material(Resources.Load<Material>("Materials/missile_cone"));
            LightCone.SetColor("_Color", colorLight);
        }

        DarkQuadSource = new Material(Resources.Load<Material>("Materials/missile_quad"));
        DarkQuadSource.SetColor("_Color", colorDark);
        if (colorDark == colorLight)
            LightQuadSource = DarkQuadSource;
        else
        {
            LightQuadSource = new Material(Resources.Load<Material>("Materials/missile_quad"));
            LightQuadSource.SetColor("_Color", colorLight);
        }

        DarkQuadTarget = new Material(Resources.Load<Material>("Materials/missile_quad"));
        DarkQuadTarget.SetColor("_Color", colorDark);
        if (colorDark == colorLight)
            LightQuadTarget = DarkQuadTarget;
        else
        {
            LightQuadTarget = new Material(Resources.Load<Material>("Materials/missile_quad"));
            LightQuadTarget.SetColor("_Color", colorLight);
        }

        DarkQuadSourceStatic = new Material(Resources.Load<Material>("Materials/missile_quad_static"));
        DarkQuadSourceStatic.SetColor("_Color", colorDark);
        if (colorDark == colorLight)
            LightQuadSourceStatic = DarkQuadSourceStatic;
        else
        {
            LightQuadSourceStatic = new Material(Resources.Load<Material>("Materials/missile_quad_static"));
            LightQuadSourceStatic.SetColor("_Color", colorLight);
        }

        DarkQuadTargetStatic = new Material(Resources.Load<Material>("Materials/missile_quad_static"));
        DarkQuadTargetStatic.SetColor("_Color", colorDark);
        if (colorDark == colorLight)
            LightQuadTargetStatic = DarkQuadTargetStatic;
        else
        {
            LightQuadTargetStatic = new Material(Resources.Load<Material>("Materials/missile_quad_static"));
            LightQuadTargetStatic.SetColor("_Color", colorLight);
        }


        //         for (int i = 1; i <= GTW.Instance.systems.Count; ++i)
        //         {
        //             Material matDark = Resources.Load<Material>("Materials/label_country");
        //             matDark.SetColor("_Color", GTW.Instance.systems[i].colorDark);
        //             DarkMats[i] = matDark;
        //             if (GTW.Instance.systems[i].colorDark == GTW.Instance.systems[i].colorLight)
        //                 LightMats[i] = matDark;
        //             else
        //             {
        //                 Material matLight = Resources.Load<Material>("Materials/label_country");
        //                 matLight.SetColor("_Color", GTW.Instance.systems[i].colorLight);
        //                 DarkMats[i] = matLight;
        //             }
        //        
        
    }
}
public class GTW : MonoBehaviour
{
    int[] total_target_count = new int[256]; // GTW.total_target_count = new Int32Array(256),
    int[] total_target_rank = new int[256]; 	// GTW.total_target_rank = new Int32Array(256),
    int[] top_infected = new int[10]; // GTW.top_infected = new Int32Array(10);
    static public bool bSphere = true;
    static public Camera MainCamera;

    public Dictionary<int, GTWSystem> systems = new Dictionary<int, GTWSystem>();
    List<GTWEvent> kevents = new List<GTWEvent>();

    static uint GTW_n = 60000; // n = 60000,// 一分钟60000毫秒
    static uint GTW_o = 60 * GTW_n;// o = 60 * n,// 一小时60分钟 GTW_o=一小时毫秒数
    static uint GTW_a = 24 * GTW_o;// a = 24 * o;// 一天24小时 GTW_a=一天毫秒数
    static uint GTW_r = 7; // 当前格林时间是几点，用于获取事件数据
    ulong next_fetch_time = 0ul;//1453363200000u; // 固定时间和数据
    ulong begin_time = 1453363200000ul - GTW_o; //1453359687727u;
    ulong current_time, run_time = 0ul;

    Vector3 GTW_Re = Vector3.zero;
    Vector3 GTW_Pe = Vector3.zero;

    public bool bDark = false;
    public float fDeform = 1.0f;
    bool bChangeColor = false;
    Material mat_grid, mat_country, mat_country_pick, mat_boundary, mat_corona, mat_coast, mat_country_picked, mat_border_picked;
    GameObject goCorona;
    bool bChangeView = false;
    public Mesh mesh_country = null;
    public MeshRenderer mr_country = null;
    Material[] CountriesMats = null;
    Material[] CountriesPickMats = null;

    List<short> GTW_shapes = new List<short>();

    static public GTW Instance = null;
    public bool bUseDemoData = false;
    GameObject goCountry = null;
    void Awake()
    {
        Instance = this;
        CreateSystems();
    }
    void Start()
    {
        MainCamera = GameObject.FindGameObjectWithTag("MainCamera").GetComponent<Camera>();
        GameObject goStars = new GameObject("Stars");
        //goStars.transform.localScale = new Vector3(-1f, 1f, 1f);
        MeshRenderer mr_stars = goStars.AddComponent<MeshRenderer>();
        MeshFilter mf_stars = goStars.AddComponent<MeshFilter>();
        Mesh mesh_stars = new Mesh();
        mesh_stars.name = "mesh_stars";
        mf_stars.mesh = mesh_stars;
        Material mat_stars = Resources.Load<Material>("Materials/stars");
        mr_stars.material = mat_stars;

        Stars.build_stars(mesh_stars);


        GameObject goGrid = new GameObject("EarthGrid");
        goGrid.transform.localScale =new Vector3(-1f, -1f, 1f);
        MeshRenderer mr_grid = goGrid.AddComponent<MeshRenderer>();
        MeshFilter mf_grid = goGrid.AddComponent<MeshFilter>();
        Mesh mesh_grid =  new Mesh();
        mesh_grid.name = "mesh_grid";
        Earth_Grid.build_earth_grid(mesh_grid);
        mf_grid.mesh = mesh_grid;
        mat_grid = Resources.Load<Material>("Materials/earth_grid");
        mr_grid.material = mat_grid;

        
        

        GameObject goCoast = new GameObject("Coast");
        goCoast.transform.localScale = new Vector3(-1f, 1f, 1f);
        MeshRenderer mr_coast = goCoast.AddComponent<MeshRenderer>();
        MeshFilter mf_coast = goCoast.AddComponent<MeshFilter>();
        Mesh mesh_coast = new Mesh();
        mesh_coast.name = "mesh_coast";
        mf_coast.mesh = mesh_coast;
        mat_coast = Resources.Load<Material>("Materials/coast");
        mr_coast.material = mat_coast;


        goCountry = new GameObject("Countries");
        goCountry.transform.localScale = new Vector3(-1f, 1f, 1f);
        mr_country = goCountry.AddComponent<MeshRenderer>();
        MeshFilter mf_country = goCountry.AddComponent<MeshFilter>();
        mesh_country = new Mesh();
        mesh_country.subMeshCount = 4;
        mesh_country.name = "mesh_country";
        mf_country.mesh = mesh_country;

        mat_country = Resources.Load<Material>("Materials/country");
        mat_country_pick = Resources.Load<Material>("Materials/country_pick");
        mat_country_picked = Resources.Load<Material>("Materials/country_picked");
        mat_border_picked = Resources.Load<Material>("Materials/border_picked");
        mat_boundary = Resources.Load<Material>("Materials/boundary");
        CountriesMats = new Material[4];
        CountriesMats[0] = mat_country;
        CountriesMats[1] = mat_boundary;
        CountriesMats[2] = mat_country_picked;
        CountriesMats[3] = mat_border_picked;
        mr_country.materials = CountriesMats;

        CountriesPickMats = new Material[1];
        CountriesPickMats[0] = mat_country_pick;
        

        

        //Country.load_map_json();
        Country.build_geometry(mesh_country, mesh_coast);

        goCorona = new GameObject("Corona");
        //goCorona.transform.localScale = new Vector3(-1f, 1f, 1f);
        MeshRenderer mr_corona = goCorona.AddComponent<MeshRenderer>();
        MeshFilter mf_corona = goCorona.AddComponent<MeshFilter>();
        Mesh mesh_corona = new Mesh();
        mesh_corona.name = "mesh_corona";
        Corona.build_corona(mesh_corona);
        mf_corona.mesh = mesh_corona;
        mat_corona = Resources.Load<Material>("Materials/corona");
        mr_corona.material = mat_corona;


        mesh_stars.bounds = new Bounds(mesh_stars.bounds.center, new Vector3(100f, 100f, 100f));
        mesh_grid.bounds = new Bounds(mesh_grid.bounds.center, new Vector3(100f, 100f, 100f));
        mesh_country.bounds = new Bounds(mesh_country.bounds.center, new Vector3(100f, 100f, 100f));
        mesh_coast.bounds = new Bounds(mesh_coast.bounds.center, new Vector3(100f, 100f, 100f));
        mesh_corona.bounds = new Bounds(mesh_corona.bounds.center, new Vector3(100f, 100f, 100f));

        mat_corona.SetColor("_Color0", new Color(0.07f, 0.25f, 0.16f));
        bChangeColor = true;
        bDark = true;
        bSphere = true;
        fDeform = 1f;
        bChangeColor = true;
        
        Update();
        UpdateDeform();
    }
    float fDeformPerSecond = 1f / 2f;
    void Update()
    {
        // 模拟一个小时内时间循环
        run_time += (ulong)(Time.deltaTime * 1000f);
        if (run_time > GTW_o)
        {
            run_time = 0;
            next_fetch_time = 0;
        }
        current_time = begin_time + run_time;
        List<GTWEvent> doEvents = new List<GTWEvent>();
        if (bUseDemoData)
            doEvents = PollEvents(current_time);
        if (true)// (country_length > 0)
        {
            foreach (GTWEvent e in doEvents)
            {
                uint t = e.key;// var t = e.key,
                uint r = t >> 16 & 255;// r = t >> 16 & 255,
                uint n = t >> 8 & 255;// n = t >> 8 & 255,
                uint o = t >> 0 & 255;// o = t >> 0 & 255,
                GTWSystem a = systems[(int)r];// a = GTW.systems[r],
                bool i = true;// i = !0;
                if (r == 8 && e.coords != Vector4.zero)// 8 == r && e.coords && (i = !1),
                    i = false;
                if (r == 8 && n == 0)// 8 == r && 0 == n && (i = !1),
                    i = false;
                if (i)// i && (++a.count, ++a.graph[ue], ++a.target_count[n]),
                {
                    ++a.count;
                    ++a.target_count[n];
                }
                ++total_target_count[n];// ++GTW.total_target_count[n],

                if (a.enabled) // W && z.draw_world && a.enabled && p(r, n, o, e.coords, e.angle)
                    DrawEvent(r, n, o, e.coords, e.angle);
            }

        }

        if (bChangeColor)
        {
            if (bDark)
            {
                MainCamera.backgroundColor = new Color(0f, 0f, 0f, 1f);
                mat_country.SetColor("_Color0", new Color(0.1f, 0.12f, 0.11f));
                mat_country.SetColor("_Color1", new Color(0.2f, 0.23f, 0.21f));
                mat_country_picked.SetColor("_Color0", new Color(0.1f, 0.12f, 0.11f));
                mat_country_picked.SetColor("_Color1", new Color(0.2f, 0.23f, 0.21f));
                mat_coast.SetColor("_Color0", new Color(0.1f, 0.12f, 0.11f));
                mat_coast.SetColor("_Color1", new Color(0.2f, 0.23f, 0.21f));
                mat_grid.SetColor("_Color0", new Color(0.07f, 0.09f, 0.07f));
                mat_grid.SetColor("_Color1", new Color(0.36f, 0.41f, 0.36f));
                mat_corona.SetColor("_Color1", Color.black);
                mat_corona.SetInt("_SrcBlend", (int)UnityEngine.Rendering.BlendMode.SrcAlpha);
                mat_corona.SetInt("_DstBlend", (int)UnityEngine.Rendering.BlendMode.One);
            }
            else
            {
                MainCamera.backgroundColor = new Color(0.9f, 0.9f, 0.9f, 1f);
                mat_country.SetColor("_Color0", new Color(0.41f, 0.61f, 0.48f));
                mat_country.SetColor("_Color1", new Color(0.51f, 0.69f, 0.53f));
                mat_country_picked.SetColor("_Color0", new Color(0.41f, 0.61f, 0.48f));
                mat_country_picked.SetColor("_Color1", new Color(0.51f, 0.69f, 0.53f));
                mat_coast.SetColor("_Color0", new Color(0.41f, 0.61f, 0.48f));
                mat_coast.SetColor("_Color1", new Color(0.51f, 0.69f, 0.53f));
                mat_grid.SetColor("_Color0", new Color(0.93f, 0.95f, 0.93f));
                mat_grid.SetColor("_Color1", new Color(0.42f, 0.48f, 0.42f));
                mat_corona.SetColor("_Color1", Color.white);
                mat_corona.SetInt("_SrcBlend", (int)UnityEngine.Rendering.BlendMode.DstColor);
                mat_corona.SetInt("_DstBlend", (int)UnityEngine.Rendering.BlendMode.Zero);
            }
            bChangeColor = false;
        }

//         if (bSphere && fDeform < 1f)
//         {
//             fDeform += Time.deltaTime * fDeformPerSecond;
//             fDeform = Mathf.Clamp01(fDeform);
//             UpdateDeform();
//         }
//         else if (!bSphere && fDeform > 0f)
//         {
//             fDeform -= Time.deltaTime * fDeformPerSecond;
//             fDeform = Mathf.Clamp01(fDeform);
//             UpdateDeform();
//         }
        UpdateDeform();
    }

    // function f(e, t) {
    // for (var r = t.length / 3, n = Math.random(), o = r - 1, a = 0, i = 0; o >= a;) {
    // var u = a + o >> 1,
    // c = t[3 * u + 0];
    // c > n ? o = u - 1 : a = u + 1
    // }
    // i = o;
    // var l = 3 * i,
    // s = t[l + 1],
    // f = t[l + 2];
    // f += Random.gauss(0, 0.01),
    // s += Random.gauss(0, 0.01),
    // e[0] = s,
    // e[1] = f
    // }

    void GetRandomCityCoord(ref Vector3 e, Vector3[] cities_data)
    {
        int r = cities_data.Length;
        float n = Random.value;
        int i = 0, o = r - 1, a = 0;
        for (; o >= a; )
        {
            int u = a + o >> 1;
            float c = cities_data[u].x;
            if (c > n)
                o = u - 1;
            else
                a = u + 1;
        }
        i = o;
        int l = i;
        float s = cities_data[l].y;
        float f = cities_data[l].z;
        f += Random.Range(0f, 0.01f);
        s += Random.Range(0f, 0.01f);
        e.x = s;
        e.y = f;
    }

    // function v(e, t) {
    // if (0 === t) return !1;
    // var r = he.key_to_country[t];
    // return r ? (f(e, r.cities), he.geoip && r == he.geoip.country ? e[2] = 0.014 : e[2] = 0, !0) : !1
    // }

    bool TryGetCoord(ref Vector3 e, uint t)
    {
        if (t == 0u)
            return false;

        country_data c_data = null;
        if (Country.dic_pick_index.TryGetValue((int)t, out c_data))
        {
            GetRandomCityCoord(ref e, c_data.cities_data);
            e.z = 0f;
            return true;
        }
        else
            return false;
    }
    void DrawEvent(uint e, uint t, uint r, Vector4 n, float o) // function p(e, t, r, n, o)
    {///////////////形状   国家   含目标坐标   坐标       角度
        //return;
        if (n != Vector4.zero) // if (n) // 是否有坐标值
        {
            GTW_Re[0] = n[0]; // 终点
            GTW_Re[1] = n[1];
            GTW_Re[2] = 0f;
            if (r > 0)// if (Re[0] = n[0], Re[1] = n[1], Re[2] = 0, he.geoip && t == he.geoip.country && (Re[2] += 0.014), r) Pe[0] = n[2],
            {
                GTW_Pe[0] = n[2];// 起点
                GTW_Pe[1] = n[3];// Pe[1] = n[3],
                GTW_Pe[2] = 0f;// Pe[2] = 0,
                // he.geoip && r == he.geoip.country && (Re[2] += 0.014),
                o = (Random.value - 0.5f) * Mathf.PI; // o = (Math.random() - 0.5) * Math.PI,
                MissileSystem.Instance.LaunchMissile(e, GTW_Re, GTW_Pe, o);// ve.launch(z, e, Re, Pe, o);
            }
            else// else {
            {
                GTW_Pe = GTW_Re;// vec3.copy(Pe, Re);
                float a = o;// var a = o,
                float i = 0.5f * Mathf.Lerp(5f, 6f, Random.value);// i = 0.5 * lerp(5, 6, Math.random());
                GTW_Pe[0] += i * Mathf.Cos(a); // Pe[0] += i * Math.cos(a),
                GTW_Pe[1] += i * Mathf.Sin(a); // Pe[1] += i * Math.sin(a),
                GTW_Pe[2] += Mathf.Lerp(0.15f, 0.2f, Random.value); // Pe[2] += lerp(0.15, 0.2, Math.random()),
                MissileSystem.Instance.LaunchMissile(e, GTW_Re, GTW_Pe, 0f);// ve.launch(z, e, Re, Pe)
            }
        }
        else//else { // 没有坐标则根据城市或国家获取坐标
        {
            if (!TryGetCoord(ref GTW_Re, t))// if (!v(Re, t)) return;
                return;
            if (r > 0)// r ? (v(Pe, r), ve.launch(z, e, Re, Pe)) : ve.launch(z, e, Re, null)
            {
                TryGetCoord(ref GTW_Pe, r);
                MissileSystem.Instance.LaunchMissile(e, GTW_Re, GTW_Pe, 0f);
            }
            else
            {
                MissileSystem.Instance.LaunchMissile(e, GTW_Re, Vector3.zero, 0f);
            }
        }   // }
    }
    void LateUpdate()
    {
        Vector3 camPos = MainCamera.transform.position;
    }
    void UpdateDeform()
    {
        fDeform = Map.smoothstep(Map.projection.blend);
        Shader.SetGlobalFloat("My_Deform", fDeform);
        mat_grid.SetFloat("_Deform", fDeform);
        mat_country.SetFloat("_Deform", fDeform);
        mat_country_pick.SetFloat("_Deform", fDeform);
        mat_country_picked.SetFloat("_Deform", fDeform);
        mat_border_picked.SetFloat("_Deform", fDeform);
        mat_coast.SetFloat("_Deform", fDeform);
        mat_boundary.SetFloat("_Deform", fDeform);
        mat_corona.SetFloat("_Fade", fDeform * fDeform);
        if (Hotspot.Instance != null)
        Hotspot.Instance.UpdateDeform(fDeform);
        if (ChinaProvinceCity.Instance != null)
        ChinaProvinceCity.Instance.UpdateDeform(fDeform);
        if (fDeform > 0.5f)
        {
            goCorona.SetActive(true);
            mat_boundary.SetFloat("_Height", 0.002f);
        }
        else
        {
            goCorona.SetActive(false);
            mat_boundary.SetFloat("_Height", 0.001f);
        }

    }
    public void OnClickSwitchColor()
    {
        bDark = !bDark;
        bChangeColor = true;
    }
//     public void OnClickSwitchView()
//     {
//         bSphere = !bSphere;
//     }
    public void OnSlide1()
    {
        //mat_border_picked.SetFloat("_DepthBias", Mathf.Lerp(-1f, 1f, UIProgressBar.current.value)); 
    }
    int iCurPickId = 0;
    public void Pick(int iPickId)
    {
        iCurPickId = iPickId;
        mesh_country.SetIndices(Country.dic_pick_index[iCurPickId].picked_index, MeshTopology.Triangles, 2);
        mesh_country.SetIndices(Country.dic_pick_index[iCurPickId].border_index, MeshTopology.Lines, 3);
    }
    static public float e_random(float e)
    {
        return -e * Mathf.Log(1f - Random.value);
    }
    void AddEvents(uint[] e, ulong r)
    {
        for (int i = 0; i < e.Length; i += 2)
        {
            GTWEvent u = new GTWEvent();
            u.key = e[i];
            u.remaining = u.count = e[i + 1];
            u.next_event_time = r;
            u.end_time = r + GTW_o;
            u.NextEvent();
            kevents.Add(u);
        }
    }
    float AddDDos_n(int e)
    {
        e = e & 65535;
        if (e >= 32768)
            e = -(65536 - e);
        return (float)e / 32768f;
    }
    void AddDDos_a(ref Vector2 e, uint t)
    {
        float r = AddDDos_n((int)t);
        float o = AddDDos_n((int)(t>>16));
        e[0] = 180 * r;
        e[1] = 90 * o;
    }
    void AddDDosEvents(uint[] e, ulong r)
    {
        uint i = GTW_o / 100;
        Vector2 c = Vector2.zero;
        Vector2 l = Vector2.zero;
        for (int u = 0; u < e.Length; )
        {
            uint s = e[u++];
            uint f = s >> 16 & 255;
            AddDDos_a(ref c, e[u++]);
            AddDDos_a(ref l, e[u++]);
            for (; ; )
            {
                uint v = e[u++];
                uint p = 65535 & v;
                uint g = v >> 16;
                if (g == 0)
                    break;
                ulong h = r + i * p;
                uint m = 30, d = 500;
                g = (uint)Mathf.Min((int)g * (int)m, (int)d);
                GTWEvent evt = new GTWEvent();
                evt.key = s;
                evt.remaining = evt.count = g;
                evt.next_event_time = h;
                evt.end_time = h + i;
                evt.coords = new Vector4(c[0], c[1], l[0], l[1]);
                evt.NextEvent();
                kevents.Add(evt);
            }
        }
    }
    void ClearEvents()
    {
        kevents.Clear();
    }

    
    List<GTWEvent> PollEvents(ulong e)
    {
        if (next_fetch_time < e)
            Fetch(e);

        // 处理当前时间段内，当前时间前的数据
        List<GTWEvent> t = new List<GTWEvent>();
        foreach (GTWEvent r in kevents)
        {
            for (; r.next_event_time <= e; )
            {
                t.Add(r);
                if (--r.remaining == 0)
                {
                    r.next_event_time = ulong.MaxValue;
                    break;
                }
                r.NextEvent();
            }
        }
        //Debug.Log(tt.Count.ToString());
        return t;
    }
    void UpdateCounter(uint[] e)
    {
        for (int t = 0; t < e.Length; t += 2)// for (var t = 0; t < e.length; t += 2) 
        {
            int r = (int)e[t]; // var r = e[t + 0],
            int n = (int)e[t + 1];// n = e[t + 1],
            int o = r >> 16 & 255;// o = r >> 16 & 255,
            int a = r >> 8 & 255;// a = r >> 8 & 255,
            GTWSystem i = systems[o];// i = GTW.systems[o];
            if (a == 0) // 0 === a ? i.count = n : (i.target_count[a] = n, GTW.total_target_count[a] += n)
                i.count = n;
            else
            {
                i.target_count[a] = n;
                total_target_count[a] += n;
            }
        }
    }
    void ResetCounter()
    {
        foreach(GTWSystem gtws in systems.Values)
        {
            gtws.count = 0;
            for (int i = 0; i < 256; ++i)
                gtws.target_count[i] = 0;
        }
        for (int i = 0; i < 256; ++i)
            total_target_count[i] = 0;
    }
    void CreateSystems()
    {
        systems.Add(1, new GTWSystem(1, "OAS", "On-Access Scanner", 5, new Color(0x38 / 255f, 0xb3 / 255f, 0x49 / 255f), new Color(0x38 / 255f, 0xb3 / 255f, 0x49 / 255f)));
        systems.Add(2, new GTWSystem(2, "ODS", "On-Demand Scanner", 4, new Color(0xed / 255f, 0x1c / 255f, 0x24 / 255f), new Color(0xed / 255f, 0x1c / 255f, 0x24 / 255f)));
        systems.Add(3, new GTWSystem(3, "MAV", "Mail Anti-Virus", 3, new Color(0xf2 / 255f, 0x65 / 255f, 0x22 / 255f), new Color(0xf2 / 255f, 0x65 / 255f, 0x22 / 255f)));
        systems.Add(4, new GTWSystem(4, "WAV", "Web Anti-Virus", 32, new Color(0x00 / 255f, 0x87 / 255f, 0xf4 / 255f), new Color(0x00 / 255f, 0x00 / 255f, 0xf4 / 255f)));
        systems.Add(5, new GTWSystem(5, "IDS", "Intrusion Detection System", 6, new Color(0xec / 255f, 0x00 / 255f, 0x8c / 255f), new Color(0xff / 255f, 0x00 / 255f, 0xb4 / 255f)));
        systems.Add(6, new GTWSystem(6, "VUL", "Vulnerability Scanner", 8, new Color(0xfb / 255f, 0xf2 / 255f, 0x67 / 255f), new Color(0xfb / 255f, 0xf2 / 255f, 0x67 / 255f)));
        systems.Add(7, new GTWSystem(7, "KAS", "Kaspersky Anti-Spam", -16, new Color(0x85 / 255f, 0x5f / 255f, 0xf4 / 255f), new Color(0x85 / 255f, 0x5f / 255f, 0xf4 / 255f)));
        systems.Add(8, new GTWSystem(8, "BAD", "Botnet Activity Detection", 31, new Color(0x00 / 255f, 0xd1 / 255f, 0xa9 / 255f), new Color(0x00 / 255f, 0xd1 / 255f, 0xa9 / 255f)));
    }
    void Fetch(ulong e)
    {
        //int r = Mathf.FloorToInt(e / GTW_o % 24);
        //next_fetch_time = (1 + (uint)Mathf.FloorToInt(e / GTW_o)) * GTW_o;
        next_fetch_time = 1453363200000u;
        LoadEventsData(e);

    }

    Hashtable hashEventJson = null;
    uint[] Event_events = null;
    uint[] Event_totals = null;
    uint[] Event_totals8 = null;
    uint[] Event_events8 = null;
    uint[] Event_counts8 = null;
    void LoadEventsData(ulong e) 
    {
        if (hashEventJson == null)
        {
            string strLoadData = string.Empty;

            Object objLoad = Resources.Load("Datas/7");
            TextAsset txtAst = objLoad as TextAsset;
            if (null == txtAst)
            {
                Debug.LogError("Error Load : " + "events_json");
                return;
            }
            else
                strLoadData = txtAst.text;

            bool ok = false;
            hashEventJson = (Hashtable)JSON.JsonDecode(strLoadData, ref ok);
        }

        if (Event_events == null)
            Event_events = Country.StringToUIntArray((string)hashEventJson["events"]);// 	var i = Base64.decode(t.events, Uint32Array),
        if (Event_totals == null)
            Event_totals = Country.StringToUIntArray((string)hashEventJson["totals"]);// 		u = Base64.decode(t.totals, Uint32Array);
        // 	if (GTW.reset_counters(), GTW.update_counters(u), t.totals8) {
        // 		var c = Base64.decode(t.totals8, Uint32Array);
        // 		GTW.update_counters(c)
        // 	}
        ResetCounter();
        UpdateCounter(Event_totals);
        if (hashEventJson.ContainsKey("totals8"))
        {
            if (Event_totals8 == null)
                Event_totals8 = Country.StringToUIntArray((string)hashEventJson["totals8"]);
            UpdateCounter(Event_totals8);
        }
        ulong l = begin_time; // 	var l = Math.floor(e / a) * a + r * o;//当前时间点的起始毫秒数
        // 	if (n.clear_events(), n.add_events(i, l), t.events8) {
        // 		var s = Base64.decode(t.events8, Uint32Array);
        // 		n.add_ddos_events(s, l)
        // 	}
        ClearEvents();
        AddEvents(Event_events, l);
        if (hashEventJson.ContainsKey("events8"))
        {
            if (Event_events8 == null)
                Event_events8 = Country.StringToUIntArray((string)hashEventJson["events8"]);
            AddDDosEvents(Event_events8, l);
        }
        // 	if (t.counts8) {
        // 		var f = Base64.decode(t.counts8, Uint32Array);
        // 		n.add_events(f, l)
        // 	}
        if (hashEventJson.ContainsKey("counts8"))
        {
            if (Event_counts8 == null)
                Event_counts8 = Country.StringToUIntArray((string)hashEventJson["counts8"]);
            AddEvents(Event_counts8, l);
        }

        List<GTWEvent> r = PollEvents(e); // var v = n.poll_events(e);
        // 对当前时间段类已过去的数据进行统计
        // foreach (GTWEvent evt in r) // 	_.each(v, function(e) {
        // {
        //     uint t = evt.key;// var t = e.key,
        //     uint rr = t >> 16 & 255;// r = t >> 16 & 255,
        //     uint nn = t >> 8 & 255;// n = t >> 8 & 255,
        //     bool oo = true;// o = !0;
        //     if (rr == 8 && evt.coords != Vector4.zero)// 		if (8 == r && e.coords && (o = !1), 8 == r && 0 == n && (o = !1), o) {
        //         oo = false;
        //     if (rr == 8 && nn == 0)
        //         oo = false;
        //     if (oo)
        //     {
        //         GTWSystem sys = systems[(int)rr]; // var a = GTW.systems[r];
        //         ++sys.count; // ++a.count,
        //         ++sys.target_count[nn]; // ++a.target_count[n],
        //         ++total_target_count[nn]; // ++GTW.total_target_count[n]
        //     }
        // }
    }

    public void SwitchPick(bool bPick)
    {
        if (goCountry == null)
            return;

        if (bPick)
        {
            goCountry.layer = 14;
            mesh_country.subMeshCount = 2;
            mr_country.materials = CountriesPickMats;
        }
        else
        {
            goCountry.layer = 0;
            mesh_country.subMeshCount = 4;
            mr_country.materials = CountriesMats;
            Pick(iCurPickId);// 上面会影响选中的submesh索引，重新设置
        }
    }
}
