using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Text;
public class JSInterface : MonoBehaviour
{
    public static JSInterface Instance = null;
    UILabel log;
    GameObject uiroot = null, tables = null;
    GridUpdate gu1, gu2, gu3, gu4;
    bool ok = true;
    void Start()
    {
        Instance = this;
        //Application.ExternalCall("MyFunction2", "Hello from Unity!");
        log = GameObject.Find("log").GetComponent<UILabel>();
        log.gameObject.SetActive(false);
        if (SystemInfo.supportedRenderTargetCount == 1)
        {
            OnIncompatible();
            //ShowLog( SystemInfo.supportedRenderTargetCount.ToString());
        }

        uiroot = GameObject.Find("UIRoot");
        tables = GameObject.Find("table1");
        gu1 = GameObject.Find("scroll_grid_1").GetComponent<GridUpdate>();
        gu2 = GameObject.Find("scroll_grid_2").GetComponent<GridUpdate>();
        gu3 = GameObject.Find("scroll_grid_3").GetComponent<GridUpdate>();
        gu4 = GameObject.Find("scroll_grid_4").GetComponent<GridUpdate>();
        //DrawOneAttackLonLat("{\"data\" : [1,1,20,20,40,40]}");
        //DrawAttackBatch("{\"list\":[{\"ID\":\"1\",\"eventtype\":\"蠕虫\",\"eventname\":\"事件名称\",\"srcip\":\"源ip\",\"dstip\":\"宿ip\",\"eventcount\":\"事件发生次数\",\"eventtime\":\"攻击时间\",\"eventlevel\":\"事件级别\",\"srcipposition\":\"源ip经纬度\",\"dstipposition\":\"宿ip经纬度\"},{\"ID\":\"1\",\"eventtype\":\"蠕虫\",\"eventname\":\"事件名称\",\"srcip\":\"源ip\",\"dstip\":\"宿ip\",\"eventcount\":\"事件发生次数\",\"eventtime\":\"攻击时间\",\"eventlevel\":\"事件级别\",\"srcipposition\":\"源ip经纬度\",\"dstipposition\":\"宿ip经纬度\"}]}");
    }

    public void TestAttack()
    {
        DrawOneAttackLonLat("{\"data\" : [1,1,20,20,40,40]}");
    }

    public void ShowLog(string str)
    {
        if (log != null)
            log.text = str;
    }
    public void WWWW(string a)
    {
        //ShowLog(a);

        Hashtable hs = (Hashtable)JSON.JsonDecode(a, ref ok);
    }
    public void LookAtLonLat(string str_param)
    {
        Hashtable hs = (Hashtable)JSON.JsonDecode(str_param, ref ok);
        ArrayList al = (ArrayList)hs["data"];
        float longitude = (float)(double)al[0], latitude = (float)(double)al[1], height = (float)(double)al[2];
        //ShowLog( longitude.ToString() + "_" + latitude.ToString() + "_" + height.ToString());
        Map.Instance.geocam.coord_target.Set(longitude, latitude, height);
    }
    public void LookAtAera(int id, float height)
    {
        // todo get lon lat using area id
        float longitude = 0f, latitude = 0f;
        Map.Instance.geocam.coord_target.Set(longitude, latitude, height);
    }
    public void SwitchColor()
    {
        GTW.Instance.OnClickSwitchColor();
    }
    public void SwitchView()
    {
        Map.Instance.OnClickSwitchView();
    }
    void DrawOneAttackLonLat(int id, int type, float src_lon, float src_lat, float des_lon, float des_lat, byte byStaticShow)
    {
        Vector3 vSrc = new Vector3(src_lon, src_lat, 0f);
        Vector3 vDes = new Vector3(des_lon, des_lat, 0f);
        float o = (Random.value - 0.5f) * Mathf.PI;
        MissileSystem.Instance.LaunchMissile((uint)type, vSrc, vDes, o, id, byStaticShow);
    }
    public void DrawOneAttackLonLat(string str_param)
    {
        Hashtable hs = (Hashtable)JSON.JsonDecode(str_param, ref ok);
        if (!ok)
            return;
        ArrayList al = (ArrayList)hs["List"];
        if (al == null)
            return;

        for (int i = 0; i < al.Count; i += 10000)
        {
            hsAttackData = (Hashtable)alAttackList[i];
            int id = i;
            string level = (string)hsAttackData["level"];
            int type = 1;
            if (level == "强")
                type = 1;
            else if (level == "中")
                type = 2;
            else if (level == "弱")
                type = 3;

            float src_lon = System.Convert.ToSingle((string)hsAttackData["srclon"]), src_lat = System.Convert.ToSingle((string)hsAttackData["srclat"]), des_lon = System.Convert.ToSingle((string)hsAttackData["deslon"]), des_lat = System.Convert.ToSingle((string)hsAttackData["deslat"]);
            byte byStaticShow = System.Convert.ToByte((string)hsAttackData["show"]);
            //int id = i, type = Random.Range(1, 8);
            //float src_lon = 20f + Random.Range(-1f, 1f) * 5f, src_lat = 20f + Random.Range(-1f, 1f) * 5f, des_lon = 60f + Random.Range(-1f, 1f) * 5f, des_lat = 20f + Random.Range(-1f, 1f) * 5f;
            //ShowLog( id.ToString() + "_" + type.ToString() + "_" + src_lon.ToString() + "_" + src_lat.ToString() + "_" + des_lon.ToString() + "_" + des_lat.ToString();
            DrawOneAttackLonLat(id, type, src_lon, src_lat, des_lon, des_lat,byStaticShow);
        }
    }
    public void DrawOneAttackArea(int id, int type, int src_area, int des_ares)
    {
        // todo get lon lat using area id
        float src_lon = 0f, src_lat = 0f, des_lon = 0f, des_lat = 0f;
        //DrawOneAttackLonLat(id, type, src_lon, src_lat, des_lon, des_lat);
    }
    public void UpdateHotspotMap()
    {

    }
    public void SetHotspotDataUrl(string url)
    {

    }

    public void SetHotspotInterval(int iTime)
    {

    }
    public void OnAttackClicked(string id)
    {
        Application.ExternalCall("OnAttackClicked", id);
    }
    public void OnHotspotClicked(int id)
    {
        Application.ExternalCall("OnHotspotClicked", id);
    }
    public void OnAreaClicked(int id)
    {
        Application.ExternalCall("OnAreaClicked", id);
    }
    public void OnIncompatible()
    {
        Application.ExternalCall("OnIncompatible");
    }
    public void OnFirstRender()
    {
        Application.ExternalCall("OnLoaded");
    }
    public void Resize(string str_param)
    {
        Hashtable hs = (Hashtable)JSON.JsonDecode(str_param, ref ok);
        if (!ok)
            return;
        ArrayList al = (ArrayList)hs["data"];
        if (al == null)
            return;
        
        int width = (int)(double)al[0], height = (int)(double)al[1];
        //ShowLog( "resize width " + width.ToString() + "  height " + height.ToString());
        Screen.SetResolution(width, height, Screen.fullScreen);
    }
    void FullScreen(int bFull)
    {
        //ShowLog( "fullscreen " + bFull);
        //Application.ExternalCall("FullScreen", bFull == 0 ? 0 : 1);
        //TestUI.Instance.OnScreenChange(bFull > 0);
    }
    public void ShowUI(int bShow)
    {
        //ShowLog( "show ui " + bShow);
        TestUI tu = uiroot.GetComponent<TestUI>();
        tu.ShowUI(bShow != 0);
    }
    public void UseDemoAttackData(int bDemo)
    {
        //ShowLog( "demo attack " + bDemo);
        GTW.Instance.bUseDemoData = bDemo > 0;
    }
    public void ToggleDemoAttackData()
    {
        GTW.Instance.bUseDemoData = !GTW.Instance.bUseDemoData;
    }
    public ArrayList alAttackList = new ArrayList();
    Hashtable hsAttackData;

    public void DrawAttackBatchInternal()
    {
        for (int i = 0; i < alAttackList.Count; ++i)
        {
            hsAttackData = (Hashtable)alAttackList[i];
            int id = i;
            string level = (string)hsAttackData["level"];
            int type = 1;
            if (level == "强")
                type = 1;
            else if (level == "中")
                type = 2;
            else if (level == "弱")
                type = 3;

            float src_lon = System.Convert.ToSingle((string)hsAttackData["srclon"]), src_lat = System.Convert.ToSingle((string)hsAttackData["srclat"]), des_lon = System.Convert.ToSingle((string)hsAttackData["deslon"]), des_lat = System.Convert.ToSingle((string)hsAttackData["deslat"]);
            byte byStaticShow = System.Convert.ToByte((string)hsAttackData["show"]);
            //int id = i, type = Random.Range(1, 8);
            //float src_lon = 40f + Random.Range(-1f, 1f) * 20f, src_lat = 40f + Random.Range(-1f, 1f) * 20f, des_lon = 40f + Random.Range(-1f, 1f) * 20f, des_lat = 40f + Random.Range(-1f, 1f) * 20f; byte byStaticShow = 3;
            //ShowLog( id.ToString() + "_" + type.ToString() + "_" + src_lon.ToString() + "_" + src_lat.ToString() + "_" + des_lon.ToString() + "_" + des_lat.ToString());
            DrawOneAttackLonLat(id, type, src_lon, src_lat, des_lon, des_lat,byStaticShow);
        }
    }

    public void DrawAttackBatch(string str_data)
    {
//         string param = "{\"list\":[";
//         param = param + "{\"id\":\"123\",\"type\":\"蠕虫\",\"name\":\"事件名称\",\"srcip\":\"222.222.222.222\",\"dstip\":\"222.222.222.222\",\"count\":\"123\",\"time\":\"2016.2.29 12:12:12\",\"level\":\"强\",\"srcname\":\"成都\",\"desname\":\"南京\",\"srclon\":\"40.1\",\"srclat\":\"15.5\",\"deslon\":\"80.1\",\"deslat\":\"30.5\"}";
//         param = param + "]}";
        Hashtable hs = (Hashtable)JSON.JsonDecode(str_data, ref ok);
        alAttackList = (ArrayList)hs["list"];
        //ShowLog( alAttackList.Count.ToString());
        DrawAttackBatchInternal();
    }
    public void HotspotTest()
    {
        string str_date = "{\"data\" : [[1,1,-64.20462,-36.8353844],[2,2,40.0,40.0],[3,3,50.0,50.0],[2,2,40.5,40.5],[2,2,41.0,41.0],[2,2,41.5,41.5]]}";

    }

    float ftime = 0f;
    void Update()
    {
//         ftime += Time.deltaTime;
//         if (ftime > 0.05f)
//         {
//             ftime = 0f;
//             DrawAttackBatch(paramwt);
//         }
    }
    string paramwt = "{\"list\":[{\"id\":\"123\",\"type\":\"蠕虫\",\"name\":\"事件名称\",\"srcip\":\"222.222.222.222\",\"dstip\":\"222.222.222.222\",\"count\":\"123\",\"time\":\"2016.2.29 12:12:12\",\"level\":\"强\",\"srcname\":\"成都\",\"desname\":\"南京\",\"srclon\":\"40.1\",\"srclat\":\"15.5\",\"deslon\":\"80.1\",\"deslat\":\"30.5\"}]}";
    public void DrawAttackBatchTest()
    {
        string param = "{\"list\":[";
        param = param + "{\"id\":\"1\",\"type\":\"2\",\"name\":\"3\",\"srcip\":\"4\",\"desip\":\"5\",\"count\":\"6\",\"time\":\"7\",\"level\":\"强\",\"srcname\":\"8\",\"desname\":\"9\",\"srclon\":\"40.1\",\"srclat\":\"15.5\",\"deslon\":\"60.1\",\"deslat\":\"15.5\",\"show\":\"1\"},";
        param = param + "{\"id\":\"1\",\"type\":\"2\",\"name\":\"3\",\"srcip\":\"4\",\"desip\":\"5\",\"count\":\"6\",\"time\":\"7\",\"level\":\"强\",\"srcname\":\"8\",\"desname\":\"9\",\"srclon\":\"50.1\",\"srclat\":\"5.5\",\"deslon\":\"50.1\",\"deslat\":\"25.5\",\"show\":\"3\"}";
        param = param + "]}";
        Hashtable ht = (Hashtable)JSON.JsonDecode(param, ref ok);
        alAttackList = (ArrayList)ht["list"];
        DrawAttackBatchInternal();
    }

    public void UpdateTableTest1()
    {
//         string param = "{\"list\":[";
//         param = param + "{\"ip\":\"11\",\"src_pos\":\"12\",\"type\":\"13\",\"count\":\"14\",\"domain\":\"15\",\"des_pos\":\"16\"},";
//         param = param + "{\"ip\":\"21\",\"src_pos\":\"22\",\"type\":\"23\",\"count\":\"24\",\"domain\":\"25\",\"des_pos\":\"26\"},";
//         param = param + "{\"ip\":\"31\",\"src_pos\":\"32\",\"type\":\"33\",\"count\":\"34\",\"domain\":\"35\",\"des_pos\":\"36\"},";
//         param = param + "{\"ip\":\"41\",\"src_pos\":\"42\",\"type\":\"43\",\"count\":\"44\",\"domain\":\"45\",\"des_pos\":\"46\"},";
//         param = param + "{\"ip\":\"51\",\"src_pos\":\"52\",\"type\":\"53\",\"count\":\"54\",\"domain\":\"55\",\"des_pos\":\"56\"},";
//         param = param + "{\"ip\":\"61\",\"src_pos\":\"62\",\"type\":\"63\",\"count\":\"64\",\"domain\":\"65\",\"des_pos\":\"66\"}";
//         param = param + "]}";
//         UpdateTable1(param);
//         string param = "{\"list\":[";
//         param = param + "{\"src_area\":\"11\",\"count\":\"12\"},";
//         param = param + "{\"src_area\":\"21\",\"count\":\"22\"},";
//         param = param + "{\"src_area\":\"31\",\"count\":\"32\"},";
//         param = param + "{\"src_area\":\"41\",\"count\":\"42\"},";
//         param = param + "{\"src_area\":\"51\",\"count\":\"52\"},";
//         param = param + "{\"src_area\":\"61\",\"count\":\"62\"}";
//         param = param + "]}";
//         UpdateTable2(param);
//         string param = "{\"list\":[";
//         param = param + "{\"des_area\":\"11\",\"count\":\"12\"},";
//         param = param + "{\"des_area\":\"21\",\"count\":\"22\"},";
//         param = param + "{\"des_area\":\"31\",\"count\":\"32\"},";
//         param = param + "{\"des_area\":\"41\",\"count\":\"42\"},";
//         param = param + "{\"des_area\":\"51\",\"count\":\"52\"},";
//         param = param + "{\"des_area\":\"61\",\"count\":\"62\"}";
//         param = param + "]}";
//         UpdateTable3(param);
//         string param = "{\"list\":[";
//         param = param + "{\"type\":\"11\",\"count\":\"12\"},";
//         param = param + "{\"type\":\"21\",\"count\":\"22\"},";
//         param = param + "{\"type\":\"31\",\"count\":\"32\"},";
//         param = param + "{\"type\":\"41\",\"count\":\"42\"},";
//         param = param + "{\"type\":\"51\",\"count\":\"52\"},";
//         param = param + "{\"type\":\"61\",\"count\":\"62\"}";
//         param = param + "]}";
//         UpdateTable4(param);
//        ShowTables(1);

//        ViewHotspot();
    }

    public void UpdateTableTest2()
    {
//         string param = "{\"list\":[";
//         param = param + "{\"ip\":\"111\",\"src_pos\":\"12\",\"type\":\"13\",\"count\":\"14\",\"domain\":\"15\",\"des_pos\":\"16\"},";
//         param = param + "{\"ip\":\"161\",\"src_pos\":\"62\",\"type\":\"63\",\"count\":\"64\",\"domain\":\"65\",\"des_pos\":\"66\"}";
//         param = param + "]}";
//         UpdateTable1(param);
//         string param = "{\"list\":[";
//         param = param + "{\"src_area\":\"111\",\"count\":\"12\"},";
//         param = param + "{\"src_area\":\"161\",\"count\":\"62\"}";
//         param = param + "]}";
//         UpdateTable2(param);
//         string param = "{\"list\":[";
//         param = param + "{\"des_area\":\"111\",\"count\":\"12\"},";
//         param = param + "{\"des_area\":\"161\",\"count\":\"62\"}";
//         param = param + "]}";
//         UpdateTable3(param);
//         string param = "{\"list\":[";
//         param = param + "{\"color\":\"#FF0000\",\"type\":\"111\",\"count\":\"12\"},";
//         param = param + "{\"color\":\"#00FF00\",\"type\":\"161\",\"count\":\"62\"}";
//         param = param + "]}";
//         UpdateTable4(param);

//        ShowTables(0);

//        ViewAttack();
    }

    public ArrayList alTableList = new ArrayList();
    public ArrayList alTableListNull = new ArrayList();
    
    public void UpdateTable1(string str_data)
    {
        
        Hashtable ht = (Hashtable)JSON.JsonDecode(str_data, ref ok);
        if (ok)
        {
            alTableList = (ArrayList)ht["list"];
            gu1.UpdateContent(alTableList);
        }
        else
            gu1.UpdateContent(alTableListNull);
    }

    public void UpdateTable2(string str_data)
    {
        
        Hashtable ht = (Hashtable)JSON.JsonDecode(str_data, ref ok);
        if (ok)
        {
            alTableList = (ArrayList)ht["list"];
            gu2.UpdateContent(alTableList);
        }
        else
            gu2.UpdateContent(alTableListNull);
    }

    public void UpdateTable3(string str_data)
    {
        
        Hashtable ht = (Hashtable)JSON.JsonDecode(str_data, ref ok);
        if (ok)
        {
            alTableList = (ArrayList)ht["list"];
            gu3.UpdateContent(alTableList);
        }
        else
            gu3.UpdateContent(alTableListNull);
    }

    public void UpdateTable4(string str_data)
    {
        
        Hashtable ht = (Hashtable)JSON.JsonDecode(str_data, ref ok);
        if (ok)
        {
            alTableList = (ArrayList)ht["list"];
            gu4.UpdateContent(alTableList);
        }
        else
            gu4.UpdateContent(alTableListNull);
    }

    public void ShowTables(int bShow)
    {
        if (tables != null)
            tables.SetActive(bShow != 0);
    }

//     public void SetAttackColor(string str_data)
//     {
// 
//     }

    public void ViewHotspot()
    {
        //ShowLog( "ViewHotspot");
        MissileSystem.Instance.goMissileRoot.SetActive(false);
        MissileSystem.Instance.goMissileTraceRoot.SetActive(false);
        Hotspot.Instance.mrHotspot.enabled = true;
    }

    public void ViewAttack()
    {
        //ShowLog( "ViewAttack");
        MissileSystem.Instance.goMissileRoot.SetActive(true);
        MissileSystem.Instance.goMissileTraceRoot.SetActive(true);
        Hotspot.Instance.mrHotspot.enabled = false;
    }

    public void DrawHotspotBatch(string str_data)
    {
        Hotspot.Instance.UpdateData(str_data);
    }

    public void SetAttackCount(int iCount)
    {
        if (iCount < 1)
            return;

        MissileSystem.Instance.SetMissileCount(iCount);
    }

    public void ClearAttack()
    {
        MissileSystem.Instance.ClearAll();
    }

    public void ToggleAdvancedEffect()
    {
        
        MissileSystem.Instance.bShowCone = !MissileSystem.Instance.bShowCone;
        MissileSystem.Instance.bShowIcon = !MissileSystem.Instance.bShowIcon;
        if (MissileSystem.Instance.bShowCone)
            MissileSystem.Instance.SetMissileCount(1000);
    }
}