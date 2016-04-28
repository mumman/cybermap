using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class labels : MonoBehaviour
{
    Vector2 LabelSizeTexScale;
    Font labelFont;
    Mesh mesh_country_city_name_ecef;
    Mesh mesh_country_city_name_mercator;
    MeshFilter mf;
    string[] fonts;
    Material countryMaterial, cityMaterial;

    bool bShowChinaCityLabel = true;


    void Awake()
    {
//         fonts = Font.GetOSInstalledFontNames();
//         labelFont = Font.CreateDynamicFontFromOSFont("FZCuYuan-M03S", 16);
        labelFont = Resources.Load<Font>("msyh");
        labelFont.RequestCharactersInTexture("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");

        Font.textureRebuilt += OnFontTextureRebuilt;
        LabelSizeTexScale.x = labelFont.material.mainTexture.width / 2048f;
        LabelSizeTexScale.y = labelFont.material.mainTexture.height / 2048f;
    }

    void OnDestroy()
    {
        Font.textureRebuilt -= OnFontTextureRebuilt;
    }
    // Use this for initialization
    void Start()
    {
        GameObject go = new GameObject("country_city_name");
        go.transform.localScale = new Vector3(-1f, 1f, 1f);
        mesh_country_city_name_ecef = new Mesh();
        mesh_country_city_name_ecef.bounds = new Bounds(Vector3.zero, new Vector3(100f, 100f, 100f));
        mesh_country_city_name_ecef.subMeshCount = 2;
        mesh_country_city_name_ecef.name = "country_city_name_ecef";
        mesh_country_city_name_mercator = new Mesh();
        mesh_country_city_name_mercator.bounds = new Bounds(Vector3.zero, new Vector3(100f, 100f, 100f));
        mesh_country_city_name_mercator.subMeshCount = 2;
        mesh_country_city_name_mercator.name = "country_city_name_mercator";

        mf = go.AddComponent<MeshFilter>();
        if (GTW.bSphere)
            mf.mesh = mesh_country_city_name_ecef;
        else
            mf.mesh = mesh_country_city_name_mercator;

        MeshRenderer mr = go.AddComponent<MeshRenderer>();

        countryMaterial = Resources.Load<Material>("Materials/label_country");
        cityMaterial = Resources.Load<Material>("Materials/label_city");

        countryMaterial.SetTexture("_MainTex", labelFont.material.mainTexture);
        cityMaterial.SetTexture("_MainTex", labelFont.material.mainTexture);
        if (bShowChinaCityLabel)
            cityMaterial.SetFloat("_ChinaCity", 1.0f);
        else
            cityMaterial.SetFloat("_ChinaCity", 0.0f);

        Material[] mats = new Material[2];
        mats[0] = countryMaterial;
        mats[1] = cityMaterial;
        mr.materials = mats;


        build_labels();
        RequestLabelText();
        BuildLabelMesh(mesh_country_city_name_ecef, mesh_country_city_name_mercator);
    }

    Vector3 last_r = Vector3.zero;
    float last_o = 0f;
    void Update()
    {
        if (GTW.bSphere)
            mf.mesh = mesh_country_city_name_ecef;
        else
            mf.mesh = mesh_country_city_name_mercator;

        Vector3 r = Vector3.zero;
        if (Map.projection.blend < 0.5f)
            Earth_Grid.project_mercator(ref r, Map.Instance.geocam.coord);
        else
            Earth_Grid.project_ecef(ref r, Map.Instance.geocam.coord);

        float o = Mathf.Lerp(3f, 10f, Map.projection.blend);// 相机距离参考 球面是10 平面3

        if (last_r != r || last_o != o )
        {
            countryMaterial.SetVector("_Interest", new Vector4(r.x, r.y, r.z, o));
            cityMaterial.SetVector("_Interest", new Vector4(r.x, r.y, r.z, o));
            last_r = r;
            last_o = o;
        }
        
    }

    bool bIsRequest = false, bReRequest = false;
    void OnFontTextureRebuilt(Font changedFont)
    {
        if (changedFont != labelFont)
            return;

        LabelSizeTexScale.x = changedFont.material.mainTexture.width / 2048f;
        LabelSizeTexScale.y = changedFont.material.mainTexture.height / 2048f;
        if (bIsRequest)
        {
            bReRequest = true;
            return;
        }

        //BuildLabelMesh();
    }

    void BuildLabelMesh(Mesh mesh_ecef, Mesh mesh_mercator)
    {
        CharacterInfo ch;
        labelFont.GetCharacterInfo('西', out ch);
        float fBaseX = ch.uvTopRight.x == ch.uvTopLeft.x ? Mathf.Abs(ch.uvTopRight.y - ch.uvTopLeft.y) : Mathf.Abs(ch.uvTopRight.x - ch.uvTopLeft.x);
        Matrix4x4 mm = Matrix4x4.identity;
        Quaternion rotation = Quaternion.Euler(90f, 0f, 0f);
        Vector3 sc = Vector3.one;
        Vector3 tr = new Vector3(0f, 0f, 0f);
        mm.SetTRS(tr, rotation, sc);
        List<Vector3> label_vertex_ecef = new List<Vector3>();
        List<Vector4> label_uv_ecef = new List<Vector4>();
        List<int> label_index_ecef_country = new List<int>();
        List<int> label_index_ecef_city = new List<int>();

        List<Vector3> label_vertex_mercator = new List<Vector3>();
        List<Vector4> label_uv_mercator = new List<Vector4>();
        List<int> label_index_mercator_country = new List<int>();
        List<int> label_index_mercator_city = new List<int>();

        int[] c = { -1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, -1 };
        int idx = 0;
        bool bCountry = true;
        int iCountryCnt = 0;
        Vector2 tmpUV = Vector2.zero;
        Vector4 tmpTex = Vector4.zero;
        foreach (label_data ld in labels_data_list)
        {
            ld.coord[2] = 0.0002f;
            Earth_Grid.project_ecef(ref ld.pos, ld.coord);
            float n = 1f * ld.font_size;
            int ldLen = ld.name.Length;

            bCountry = iCountryCnt <= country_count;
            ++iCountryCnt;
            float fHalfLen = ldLen * 0.5f;
            for (int ic = 0; ic < ldLen; ++ic)
            {
                float fOffset = ((float)ic - fHalfLen) * 2f + 1f;

                labelFont.GetCharacterInfo(ld.name[ic], out ch);
                ld.box[0] = ch.uvTopLeft.x; ld.box[1] = ch.uvTopLeft.y; ld.box[2] = ch.uvBottomRight.x; ld.box[3] = ch.uvBottomRight.y;
                t(ref ld.mat, ld.pos, n * fBaseX * LabelSizeTexScale.x, n * Mathf.Abs(ld.box[3] - ld.box[1]) * LabelSizeTexScale.y, true);

                for (int o = 0; o < c.Length; o += 2)//             for (var o = 0; o < c.length; o += 2) u[0] = c[o + 0],
                {
                    Vector3 u = Vector3.zero;
                    u[0] = ((float)c[o] - fOffset);
                    u[1] = c[o + 1]; // u[1] = c[o + 1],
                    u[2] = 0; // u[2] = 0,
                    u = ld.mat.MultiplyPoint(u);// vec3.transformMat4(u, u, e.mat),
                    label_vertex_ecef.Add(u); // i.push(u[0], u[1], u[2]),
                    if (bCountry)
                        label_index_ecef_country.Add(idx++);
                    else
                        label_index_ecef_city.Add(idx++);
                    tmpUV = GetUV(c[o], c[o + 1], ch);
                    tmpTex.Set(tmpUV.x, tmpUV.y, ld.font_size, ld.pick_uid);
                    label_uv_ecef.Add(tmpTex); // i.push(u[0], u[1])
                }
            }
        }

        mesh_ecef.SetVertices(label_vertex_ecef);
        mesh_ecef.SetIndices(label_index_ecef_country.ToArray(), MeshTopology.Triangles, 0);
        mesh_ecef.SetIndices(label_index_ecef_city.ToArray(), MeshTopology.Triangles, 1);
        mesh_ecef.SetUVs(0, label_uv_ecef);

        idx = 0;
        bCountry = true;
        iCountryCnt = 0;
        foreach (label_data ld in labels_data_list)
        {
            ld.coord[2] = 0.001f;
            Earth_Grid.project_mercator(ref ld.pos, ld.coord);
            float n = 1f * ld.font_size;
            int ldLen = ld.name.Length;

            bCountry = iCountryCnt <= country_count;
            ++iCountryCnt;
            float fHalfLen = ldLen * 0.5f;
            for (int ic = 0; ic < ldLen; ++ic)
            {
                float fOffset = ((float)ic - fHalfLen) * 2f + 1f;

                labelFont.GetCharacterInfo(ld.name[ic], out ch);
                ld.box[0] = ch.uvTopLeft.x; ld.box[1] = ch.uvTopLeft.y; ld.box[2] = ch.uvBottomRight.x; ld.box[3] = ch.uvBottomRight.y;
                t(ref ld.mat, ld.pos, n * fBaseX * LabelSizeTexScale.x * 0.3f, n * Mathf.Abs(ld.box[3] - ld.box[1]) * LabelSizeTexScale.y * 0.3f, false);

                for (int o = 0; o < c.Length; o += 2)//             for (var o = 0; o < c.length; o += 2) u[0] = c[o + 0],
                {
                    Vector3 u = Vector3.zero;
                    u[0] = ((float)c[o] - fOffset);
                    u[1] = c[o + 1]; // u[1] = c[o + 1],
                    u[2] = 0; // u[2] = 0,
                    u = ld.mat.MultiplyPoint(u);// vec3.transformMat4(u, u, e.mat),
                    label_vertex_mercator.Add(u); // i.push(u[0], u[1], u[2]),
                    if (bCountry)
                        label_index_mercator_country.Add(idx++);
                    else
                        label_index_mercator_city.Add(idx++);
                    tmpUV = GetUV(c[o], c[o + 1], ch);
                    tmpTex.Set(tmpUV.x, tmpUV.y, ld.font_size, ld.pick_uid);
                    label_uv_mercator.Add(tmpTex); // i.push(u[0], u[1])
                }
            }
        }

        mesh_mercator.SetVertices(label_vertex_mercator);
        mesh_mercator.SetIndices(label_index_mercator_country.ToArray(), MeshTopology.Triangles, 0);
        mesh_mercator.SetIndices(label_index_mercator_city.ToArray(), MeshTopology.Triangles, 1);
        mesh_mercator.SetUVs(0, label_uv_mercator);
    }

    static public Vector2 GetUV(int x, int y, CharacterInfo ch)
    {
        // x反向
        if (x == -1 && y == -1)
            return ch.uvBottomRight;
        if (x == -1 && y == 1)
            return ch.uvTopRight;
        if (x == 1 && y == 1)
            return ch.uvTopLeft;
        if (x == 1 && y == -1)
            return ch.uvBottomLeft;

        return Vector2.zero;
    }

    //     function t(t, r, i, u) 
    //     {
    // 		mat4.identity(t),
    // 			'ecef' == e && (vec3.normalize(n, r), vec3.set(o, 0, 1, 0), vec3.cross(o, n, o), vec3.normalize(o, o), vec3.cross(a, o, n), t[0] = o[0], t[1] = o[1], t[2] = o[2], t[4] = n[0], t[5] = n[1], t[6] = n[2], t[8] = a[0], t[9] = a[1], t[10] = a[2], mat4.rotateX(t, t, HALF_PI)),
    // 		mat4.scale(t, t, [
    // 			i,
    // 			u,
    // 			1
    // 		]),
    // 		t[12] = r[0],
    // 		t[13] = r[1],
    // 		t[14] = r[2]
    // 	}

    static public void t(ref Matrix4x4 t, Vector3 r, float i, float u, bool bSphere)
    {
        t = Matrix4x4.identity;
        if (bSphere)
        {
            Vector3 n = r;
            n.Normalize();
            Vector3 o = Vector3.up;
            o = Vector3.Cross(n, o);
            o.Normalize();
            Vector3 a = Vector3.Cross(o, n);
            t[0] = o[0]; t[1] = o[1]; t[2] = o[2]; t[4] = n[0]; t[5] = n[1]; t[6] = n[2]; t[8] = a[0]; t[9] = a[1]; t[10] = a[2];

            rotatex(ref t, t, Mathf.PI * 0.5f);
        }
        scale(ref t, t, new Vector3(i, u, 1f));
        t[12] = r[0];
        t[13] = r[1];
        t[14] = r[2];
    }

    float[] watch = new float[16];

    void watcher(Matrix4x4 mat)
    {
        watch[0] = mat[0]; watch[2] = mat[2]; watch[3] = mat[3]; watch[4] = mat[4];
        watch[5] = mat[5]; watch[6] = mat[6]; watch[7] = mat[7]; watch[8] = mat[8];
        watch[9] = mat[9]; watch[10] = mat[10]; watch[11] = mat[11]; watch[12] = mat[12];
        watch[13] = mat[13]; watch[14] = mat[14]; watch[15] = mat[15]; watch[1] = mat[1];
    }

    static public void scale(ref Matrix4x4 e, Matrix4x4 t, Vector3 r)
    {
        float n = r[0], o = r[1], a = r[2];
        e[0] = t[0] * n;
        e[1] = t[1] * n;
        e[2] = t[2] * n;
        e[3] = t[3] * n;
        e[4] = t[4] * o;
        e[5] = t[5] * o;
        e[6] = t[6] * o;
        e[7] = t[7] * o;
        e[8] = t[8] * a;
        e[9] = t[9] * a;
        e[10] = t[10] * a;
        e[11] = t[11] * a;
        e[12] = t[12];
        e[13] = t[13];
        e[14] = t[14];
        e[15] = t[15];
    }

    static public void rotatex(ref Matrix4x4 e, Matrix4x4 t, float r)
    {
        float n = Mathf.Sin(r), o = Mathf.Cos(r);
        float a = t[4], i = t[5], u = t[6], c = t[7], l = t[8], s = t[9], f = t[10], v = t[11];
        if (t != e)
        {
            e[0] = t[0]; e[1] = t[1]; e[2] = t[2]; e[3] = t[3]; e[12] = t[12]; e[13] = t[13]; e[14] = t[14]; e[15] = t[15];
        }

        e[4] = a * o + l * n;
        e[5] = i * o + s * n;
        e[6] = u * o + f * n;
        e[7] = c * o + v * n;
        e[8] = l * o - a * n;
        e[9] = s * o - i * n;
        e[10] = f * o - u * n;
        e[11] = v * o - c * n;
    }

    void RequestLabelText()
    {
        bReRequest = false;
        bIsRequest = true;
        foreach (label_data ld in labels_data_list)
        {
            labelFont.RequestCharactersInTexture(ld.name);
            if (bReRequest)
                break;
        }
        bIsRequest = false;
        if (bReRequest)
            RequestLabelText();
    }

    class label_data //function o() {
    {

        public Vector3 coord = new Vector3(0f, 0f, 0.0001f);// this.coord = vec3.create(),
        // this.coord[2] = 0.0001,
        public Vector3 pos = Vector3.zero;// this.pos = vec3.create(),
        public Matrix4x4 mat = Matrix4x4.identity;// this.mat = mat4.create(),
        public Vector4 box = Vector4.zero;// this.box = vec4.create(),
        public string name = "";// this.name = '',
        public float font_size = 0f;// this.font_size = 0
        public string iso2 = "";
        public int pick_uid = -1;// 对应到区域
    }

    class label_country_data
    {
        public Vector2 coord;
        public string iso2;
        public string iso3;
        public string name;
        public float font_size;
        public int pick_uid = -1;
    }

    class city_data
    {
        public Vector2 coord;
        public string code;
        public string name;
        public float font_size;
        public int pick_uid = -1;
    }

    int country_count = 0, city_count = 0;
    List<label_data> labels_data_list = new List<label_data>();
    Font lableFont;
    public void build_labels()
    {

        string strLoadData = string.Empty;

        Object objLoad = Resources.Load("Datas/labels");
        TextAsset txtAst = objLoad as TextAsset;
        if (null == txtAst)
        {
            Debug.LogError("Error Load : " + "labels_json");
            return;
        }
        else
            strLoadData = txtAst.text;

        bool ok = false;
        Hashtable hashLabelJson;
        hashLabelJson = (Hashtable)JSON.JsonDecode(strLoadData, ref ok);

        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        //         function n() {
        // 					var e = window.lang;
        // 					_.each(r.countries, function(t) {
        // 						var r = 'MAP_COUNTRY_' + t.iso3.toUpperCase();
        // 						t.name = e.getText(r)
        // 					}),
        // 					_.each(r.cities, function(t) {
        // 						var r = 'MAP_CITY_' + t.code.toUpperCase();
        // 						t.name = e.getText(r)
        // 					})
        // 				}
        //////////////////读取label数据，并重构county，city列表
        List<label_country_data> countries_label_data = new List<label_country_data>();
        ArrayList alCountries = (ArrayList)hashLabelJson["countries"];
        foreach (Hashtable htCountry in alCountries)
        {
            label_country_data cdata = new label_country_data();
            ArrayList coord = (ArrayList)htCountry["coord"];
            cdata.coord.Set((float)(double)coord[0], (float)(double)coord[1]);
            cdata.iso2 = (string)htCountry["iso2"];
            cdata.iso3 = (string)htCountry["iso3"];
            //Hashtable name = (Hashtable)htCountry["name"];
            cdata.font_size = (float)(double)htCountry["font_size"];
            cdata.name = Map.db["MAP_COUNTRY_" + cdata.iso3.ToUpper()];
            countries_label_data.Add(cdata);
        }

        List<city_data> cities_label_data = new List<city_data>();
        ArrayList alCities = (ArrayList)hashLabelJson["cities"];
        foreach (Hashtable htCity in alCities)
        {
            city_data cdata = new city_data();
            ArrayList coord = (ArrayList)htCity["coord"];
            cdata.coord.Set((float)(double)coord[0], (float)(double)coord[1]);
            cdata.code = (string)htCity["code"];
            //Hashtable name = (Hashtable)htCity["name"];
            cdata.font_size = (float)(double)htCity["font_size"];
            cdata.name = Map.db["MAP_CITY_" + cdata.code.ToUpper()];
            cities_label_data.Add(cdata);
        }

        foreach (label_country_data cdata in countries_label_data) // a(r.countries, !0, !0),
            CountryToLableData(cdata, true, true);

        country_count = labels_data_list.Count; // t.country_count = t.labels.length,

        foreach (city_data cdata in cities_label_data)// a(r.cities, !1, !1),
            CityToLableData(cdata, false, false);

        foreach (label_country_data cdata in countries_label_data)// a(r.countries, !0, !1),
            CountryToLableData(cdata, true, false);

        city_data tmpcd = new city_data();
        foreach (country_data cd in ChinaProvinceCity.Instance.cdd.china_provinces)
        {
            if (cd.center_location == Vector2.zero)
                continue;

            tmpcd.coord = cd.center_location;
            tmpcd.name = cd.name;
            tmpcd.pick_uid = cd.uid;
            if (cd.byType == 0)
                tmpcd.font_size = 4;
            else if(cd.byType == 3)
                tmpcd.font_size = 3;
            CityToLableData(tmpcd, false, false);
            AddAdjustHelper(tmpcd);
        }

        if (bShowChinaCityLabel)
        {
            foreach (country_data cd in ChinaProvinceCity.Instance.cdd.china_cities)
            {
                if (cd.center_location == Vector2.zero)
                    continue;

                tmpcd.coord = cd.center_location;
                tmpcd.name = cd.name;
                tmpcd.pick_uid = cd.uid;
                tmpcd.font_size = 1.5f;
                CityToLableData(tmpcd, false, false);
                AddAdjustHelper(tmpcd);
            }
        }

        city_count = labels_data_list.Count - country_count;//t.city_count = t.labels.length - t.country_count;



        // e.render_labels('en'),
        // e.project_labels('ecef')
    }

    GameObject goAdjustHelper = null;
    void AddAdjustHelper(city_data cd)
    {
        if (Application.isEditor)
        {
            if (goAdjustHelper == null)
                goAdjustHelper = new GameObject("AdjustHelper");

            GameObject go = GameObject.CreatePrimitive(PrimitiveType.Cube);
            go.name = cd.name;
            go.transform.parent = goAdjustHelper.transform;
            Vector3 pos = new Vector3(cd.coord.x, cd.coord.y);
            Earth_Grid.project_mercator(ref pos, pos);
            go.transform.localScale = new Vector3(0.01f, 0.01f, 0.01f);
            go.transform.localPosition = new Vector3(-pos.x, pos.y, 0f);
            go.AddComponent<MercatorToLanlon>();
        }
    }
    // function a(e, r, n) 
    // {
    // 	_.each(e, function(e) {
    // 		if (r) {
    // 			if (n && e.font_size < 5) return;
    // 			if (!n && e.font_size > 5) return
    // 		}
    // 		var a = new o;
    // 		vec2.copy(a.coord, e.coord),
    // 		a.coord[2] *= 2,
    // 		a.name = e.name,
    // 		a.font_size = e.font_size,
    // 		r ? a.name = a.name.toUpperCase() : a.font_size = 3,
    // 		e.iso2 && (a.iso2 = e.iso2),
    // 		t.labels.push(a)
    // 	})
    void CountryToLableData(label_country_data e, bool r, bool n)
    {
        if (r)
        {
            if (n && e.font_size < 5) return;
            if (!n && e.font_size > 5) return;
        }
        label_data ld = new label_data();
        ld.coord = e.coord;
        ld.coord[2] *= 2;
        ld.name = e.name;
        ld.font_size = e.font_size;
        ld.pick_uid = e.pick_uid;
        if (r)
            ld.name = ld.name.ToUpper();
        else
            ld.font_size = 3;
        ld.iso2 = e.iso2;

        labels_data_list.Add(ld);
    }
    void CityToLableData(city_data e, bool r, bool n)
    {
        if (r)
        {
            if (n && e.font_size < 5) return;
            if (!n && e.font_size > 5) return;
        }
        label_data ld = new label_data();
        ld.coord.x = e.coord.x; ld.coord.y = e.coord.y;
        ld.coord[2] *= 2;
        ld.name = e.name;
        ld.font_size = e.font_size;
        ld.pick_uid = e.pick_uid;
        if (r)
            ld.name = ld.name.ToUpper();
//         else
//             ld.font_size = 3;

        labels_data_list.Add(ld);
    }
}
