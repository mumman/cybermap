using UnityEngine;
//using UnityEngine.Rendering;
using System.Collections;

public class pick : MonoBehaviour
{
    static public int picked_country_id = 0;
    static public int picked_missile_id = -1;
    static public int picked_hotspot_id = -1;
    static public pick Instance = null;
    RenderTexture[] mrtTex = new RenderTexture[4];
    RenderBuffer[] mrtRB = new RenderBuffer[1];
    Texture2D readTex;
    Camera camera = null, camera_country_pick = null, camera_missile = null, camera_missile_pick = null, camera_hotspot = null, camera_hotspot_pick = null;
    int m_iViewWidth, m_iViewHeight;
    UITexture test_tex;
    bool bNormalEnd = false;
    bool bFirstRender = false;
    bool bPickCountry = true, bPickMissile = false, bPickHotspot = false;
    private void CreateResource()
    {
        mrtTex[0] = new RenderTexture(Screen.width, Screen.height, 24, RenderTextureFormat.ARGB32);
        mrtTex[1] = new RenderTexture(Screen.width, Screen.height, 0, RenderTextureFormat.ARGB32);
        mrtTex[2] = new RenderTexture(Screen.width, Screen.height, 0, RenderTextureFormat.ARGB32);
        mrtTex[3] = new RenderTexture(Screen.width, Screen.height, 0, RenderTextureFormat.ARGB32);
        m_iViewWidth = Screen.width;
        m_iViewHeight = Screen.height;
    }

    public void SetCountryCamera()
    {
        if (m_iViewWidth != Screen.width || m_iViewHeight != Screen.height)
            CreateResource();

        mrtRB[0] = mrtTex[0].colorBuffer;
        camera.SetTargetBuffers(mrtRB, mrtTex[0].depthBuffer);

        GTW.Instance.SwitchPick(false);
        ChinaProvinceCity.Instance.SwitchPick(false);
    }
    public void SetCountryPickCamera()
    {
        if (camera_country_pick == null)
        {
            GameObject go = new GameObject("CameraCountryPick");
            go.hideFlags = HideFlags.DontSaveInEditor | HideFlags.DontSaveInBuild;
            camera_country_pick = go.AddComponent<Camera>();
        }

        camera_country_pick.CopyFrom(camera);
        camera_country_pick.clearFlags = CameraClearFlags.Nothing;
        camera_country_pick.depth += 1;
        camera_country_pick.cullingMask = 1 << 14;

        mrtRB[0] = mrtTex[1].colorBuffer;
        camera_country_pick.SetTargetBuffers(mrtRB, mrtTex[0].depthBuffer);

        GTW.Instance.SwitchPick(true);
        ChinaProvinceCity.Instance.SwitchPick(true);
    }
    public void SetMissilePickCamera()
    {
        if (camera_missile_pick == null)
        {
            GameObject go = new GameObject("CameraMissilePick");
            go.hideFlags = HideFlags.DontSaveInEditor | HideFlags.DontSaveInBuild;
            camera_missile_pick = go.AddComponent<Camera>();
        }

        camera_missile_pick.CopyFrom(camera);
        camera_missile_pick.clearFlags = CameraClearFlags.Nothing;
        camera_missile_pick.depth += 3;
        camera_missile_pick.cullingMask = 1 << 12;

        mrtRB[0] = mrtTex[2].colorBuffer;
        camera_missile_pick.SetTargetBuffers(mrtRB, mrtTex[0].depthBuffer);
        if (bPickMissile)
            MissileSystem.Instance.SwitchPick(true);
    }
    public void SetHotspotPickCamera()
    {
        if (camera_hotspot_pick == null)
        {
            GameObject go = new GameObject("CameraHotspotPick");
            go.hideFlags = HideFlags.DontSaveInEditor | HideFlags.DontSaveInBuild;
            camera_hotspot_pick = go.AddComponent<Camera>();
        }

        camera_hotspot_pick.CopyFrom(camera);
        camera_hotspot_pick.clearFlags = CameraClearFlags.Nothing;
        camera_hotspot_pick.depth += 5;
        camera_hotspot_pick.cullingMask = 1 << 13;

        mrtRB[0] = mrtTex[3].colorBuffer;
        //mrtRB[1] = mrtTex[3].colorBuffer;
        camera_hotspot_pick.SetTargetBuffers(mrtRB, mrtTex[0].depthBuffer);
        if (bPickHotspot)
            Hotspot.Instance.SwitchPick(true);
    }
    void Awake()
    {
        Instance = this;
        camera = GameObject.FindGameObjectWithTag("MainCamera").GetComponent<Camera>();
        camera.cullingMask = 1 << 0;

        //Camera.onPreCull += OnPreCulll;
        Camera.onPostRender += OnPostrender;
        //Camera.onPreRender += OnPrerender;

        m_iViewWidth = Screen.width;
        m_iViewHeight = Screen.height;
        CreateResource();
        SetCountryCamera();
    }
    
    void Start()
    {
        readTex = new Texture2D(1, 1, TextureFormat.ARGB32, false, false);
        test_tex = GameObject.Find("tex").GetComponent<UITexture>();
        test_tex.gameObject.SetActive(false);
    }
    void OnPostrender(Camera cam)
    {
        if (!bFirstRender)
        {
            JSInterface.Instance.OnFirstRender();
            bFirstRender = true;
        }

        if (cam == camera)
            SetCountryPickCamera();
        else if (cam == camera_country_pick)
            SetMissilePickCamera();
        else if (cam == camera_missile_pick)
        {
            if (bPickMissile)
                MissileSystem.Instance.SwitchPick(false);

            SetHotspotPickCamera();
        }
        else if (cam == camera_hotspot_pick)
        {
            if (bPickHotspot)
                Hotspot.Instance.SwitchPick(false);

            SetCountryCamera();
            Graphics.Blit(mrtTex[0], null as RenderTexture);
        }
    }
    Texture2D tex = null;
    Rect pick_rect = new Rect();
    Vector2 v2id = Vector2.zero;
    int iPickCheckMissile = 0, iPickCheckCountry = 0, iPickCheckHotspot = 0;
    void Update()
    {
//         RenderTexture.active = mrtTex[1];
// 
//         ///////////////////// read and show debug texture
//         if (tex == null)
//         {
//             tex = new Texture2D(Screen.width, Screen.height, TextureFormat.ARGB32, false, false);
//             test_tex.mainTexture = tex;
//         }
//         tex.ReadPixels(new Rect(0, 0, Screen.width, Screen.height), 0, 0);
//         tex.Apply();
//         //////////////
//         GL.Clear(true, true, Color.black);
//         RenderTexture.active = null;
//         return;
        if (!Input.GetMouseButton(0) && !Input.GetMouseButton(1) && Input.mousePosition.x >= 0 && Input.mousePosition.y >= 1 && Input.mousePosition.x < Screen.width && Input.mousePosition.y < Screen.height)
        {
            
            if (Application.isEditor)
                pick_rect.Set(Input.mousePosition.x, m_iViewHeight - Input.mousePosition.y, 1, 1);
            else
                pick_rect.Set(Input.mousePosition.x, Input.mousePosition.y, 1, 1);

            if (bPickCountry)
            {
                RenderTexture.active = mrtTex[1];
                readTex.ReadPixels(pick_rect, 0, 0);
                GL.Clear(true, true, Color.black);
                RenderTexture.active = null;
                readTex.Apply();
                v2id.Set(readTex.GetPixel(0, 0).r, readTex.GetPixel(0, 0).g);
                int new_picked_country_id = Hotspot.V2toS(v2id);
                //Debug.Log("---" + picked_id.ToString());
                if (new_picked_country_id == 127)// 将台湾id转换为中国id
                    new_picked_country_id = 89;

                if (picked_country_id != 0 && new_picked_country_id == 0)
                {
                    if (iPickCheckCountry < 20)
                    {
                        ++iPickCheckCountry;
                        new_picked_country_id = picked_country_id;
                    }
                }
                else if (picked_country_id != 0 && new_picked_country_id == picked_country_id)
                    iPickCheckCountry = 0;

                if (picked_country_id != new_picked_country_id)
                {
                    iPickCheckCountry = 0;
                    //Debug.Log("---" + picked_country_id.ToString());
                    picked_country_id = new_picked_country_id;
                    if (picked_country_id < 300) // 其他国家
                    {
                        JSInterface.Instance.ShowLog("pick country: " + picked_country_id.ToString());
                        GTW.Instance.Pick(picked_country_id);
                        ChinaProvinceCity.Instance.Pick(picked_country_id);
                    }
                    else // 中国省市
                    {
                        //picked_country_id = 89;
                        //JSInterface.Instance.ShowLog("pick country: " + picked_country_id.ToString());
                        GTW.Instance.Pick(0); // 由于修改了中国边界，中国边界在世界地图中展示
                        ChinaProvinceCity.Instance.Pick(picked_country_id);
                    }
                }
                
            }
            
            if (bPickMissile)
            {
                RenderTexture.active = mrtTex[2];
                readTex.ReadPixels(pick_rect, 0, 0);
                GL.Clear(true, true, Color.black);
                RenderTexture.active = null;
                readTex.Apply();
                v2id.Set(readTex.GetPixel(0, 0).r, readTex.GetPixel(0, 0).g);
                int new_picked_missile_id = Hotspot.V2toS(v2id) - 1;
                if (picked_missile_id != 0 && new_picked_missile_id == 0)
                {
                    if (iPickCheckMissile < 20)
                    {
                        ++iPickCheckMissile;
                        new_picked_missile_id = picked_missile_id;
                    }
                }
                else if (picked_missile_id != 0 && new_picked_missile_id == picked_missile_id)
                    iPickCheckMissile = 0;

                //Debug.Log(id.ToString());
                if (new_picked_missile_id != picked_missile_id)
                {
                    iPickCheckMissile = 0;
                    picked_missile_id = new_picked_missile_id;
                    //JSInterface.Instance.ShowLog("pick missile: " + picked_missile_id.ToString());
                    MissileSystem.Instance.ShowPop(new_picked_missile_id);
                }
                
            }
            if (bPickHotspot)
            {
                RenderTexture.active = mrtTex[3];
                readTex.ReadPixels(pick_rect, 0, 0);
                GL.Clear(true, true, Color.black);
                RenderTexture.active = null;
                readTex.Apply();

                v2id.Set(readTex.GetPixel(0, 0).r, readTex.GetPixel(0, 0).g);
                int new_picked_hotspot_id = Hotspot.V2toS(v2id) - 1;
                if (picked_hotspot_id != 0 && new_picked_hotspot_id == 0)
                {
                    if (iPickCheckHotspot < 20)
                    {
                        ++iPickCheckHotspot;
                        new_picked_hotspot_id = picked_hotspot_id;
                    }
                }
                else if (picked_hotspot_id != 0 && new_picked_hotspot_id == picked_hotspot_id)
                    iPickCheckHotspot = 0;

                if (new_picked_hotspot_id != picked_hotspot_id)
                {
                    iPickCheckHotspot = 0;
                    picked_hotspot_id = new_picked_hotspot_id;
                    //JSInterface.Instance.ShowLog("pick hotspot: " + picked_hotspot_id.ToString());
                }
                
            }
        }
    }
}
