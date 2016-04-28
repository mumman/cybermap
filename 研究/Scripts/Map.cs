using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Text;

public struct struct_geocam
{
    public Vector3 coord; // 相机位置（经纬度， 高度）
    public Vector3 coord_target; // 相机目标位置
    public Vector3 coord_delta; 
    public float lerp_speed;
}

public struct struct_projection
{
    public float blend;
    public float dir;
}

struct struct_ee
{
    public float[] mercator;
    public float[] ecef;
}
//{"ALL_RIGHTS_RESERVED","All Rights Reserved."},{"AM_I_INFECTED","Am I Infected?"},{"AM_I_INFECTED_LINK","http://free.kaspersky.com/?redef=1&THRU&reseller=cybermap_sm"},{"DOWNLOAD_TRIAL","Download Trial"},{"DOWNLOAD_TRIAL_LINK_WIN","http://special.kaspersky-labs.com/s2if53l8zel58sede5kd/kis16.0.0.614a%20bcen_9091.exe"},{"DOWNLOAD_TRIAL_LINK_MAC","http://www.kaspersky.com/advert/free-trials/mac-security-download?redef=1&THRU&reseller=gl_cybermap_pro_ona_smm__onl_b2c_cybm_lp-button____kism_2016__"},{"DOWNLOAD_TRIAL_LINK_ANDROID","http://app.appsflyer.com/com.kms.free?pid=smm&c=ww_cybermap"},{"CONTINENT_AFRIKA","Africa"},{"CONTINENT_ASIA","Asia"},{"CONTINENT_EUROPE","Europe"},{"CONTINENT_NORTH_AMERICA","North America"},{"CONTINENT_OCEANIA","Oceania"},{"CONTINENT_SOUTH_AMERICA","South America"},{"CONTINENT_WORLD","WORLD"},{"CONTROL_DEMO_OFF","Demo off"},{"CONTROL_DEMO_ON","Demo on"},{"CONTROL_DISABLE_DEMO_MODE","Disable demo mode"},{"CONTROL_ENABLE_DEMO_MODE","Enable demo mode"},{"CONTROL_GLOBE_VIEW","Switch to Globe view"},{"CONTROL_PLANE_VIEW","Switch to Plane view"},{"CONTROL_SWITCH_TO_DARK_COLOR","Switch to dark color"},{"CONTROL_SWITCH_TO_LIGHT_COLOR","Switch to light color"},{"CONTROL_TOGGLE_COLOR","Toggle map Color"},{"CONTROL_ZOOM_IN","Zoom in"},{"CONTROL_ZOOM_OUT","Zoom out"},{"COPYRIGHT","2015 AO Kaspersky Lab."},{"COUNTRY_NAME","COUNTRY NAME HERE"},{"DATA_FROM_KASPERSKY_LAB","Based on data from Kaspersky Lab."},{"DETECTIONS_DISCOVERED","Detections discovered since 00:00 GMT"},{"DETECTION_DDOS","Botnet Activity Detection"},{"DETECTION_IDS","Intrusion Detection Scan"},{"DETECTION_KAS","Kaspersky Anti-Spam"},{"DETECTION_MAV","Mail Anti-Virus"},{"DETECTION_OAS","On-Access Scan"},{"DETECTION_ODS","On-Demand Scan"},{"DETECTION_VUL","Vulnerability Scan"},{"DETECTION_WAV","Web Anti-Virus"},{"FOOTER_DOWNLOAD_SCREENSAVER","DOWNLOAD SCREENSAVER"},{"FOOTER_FOLLOW","FOLLOW +"},{"HASH","#"},{"HEADER_CYBERTHREAT","CYBERTHREAT"},{"HEADER_REAL_TIME_MAP","REAL-TIME MAP"},{"KASPERSKY_WEBSITE","//www.kaspersky.com/"},{"LINK_FB","//www.facebook.com/Kaspersky"},{"LINK_GOOGLE_PLUS","//plus.google.com/+KasperskyLab"},{"LINK_LINKEDIN","//www.linkedin.com/company/kaspersky-lab"},{"LINK_TWITTER","//twitter.com/kaspersky"},{"LINK_VK",""}
//,{"BUZZ_URL_BLOG","http://blog.kaspersky.com/"},{"BUZZ_URL_BUSINESS","http://business.kaspersky.com/"},{"BUZZ_URL_SECURELIST","http://securelist.com/"},{"BUZZ_URL_THREATPOST","http://threatpost.com/"},{"BUZZ_URL_EUGENE","http://eugene.kaspersky.com/"},{"BUZZ_URL_ACADEMY","http://academy.kaspersky.com/"},{"BUZZ_CTA_BLOG","Read this on the Kaspersky Daily blog"},{"BUZZ_CTA_BUSINESS","Read this on the Business blog"},{"BUZZ_CTA_SECURELIST","Read this on the Securelist blog"},{"BUZZ_CTA_THREATPOST","Read this on the Threadpost blog"},{"BUZZ_CTA_EUGENE","Read this on the Eugene blog"},{"BUZZ_CTA_ACADEMY","Read this on the Academy blog"}
public class Map : MonoBehaviour
{
    static public Map Instance = null;
    static public Dictionary<string, string> db = new Dictionary<string, string> { { "MAP_CITY_BER", "柏林" }, { "MAP_CITY_CAI", "开罗" }, { "MAP_CITY_DUB", "迪拜" }, { "MAP_CITY_IST", "伊斯坦布尔" }, { "MAP_CITY_JOH", "约翰内斯堡" }, { "MAP_CITY_LAX", "" }, { "MAP_CITY_LON", "伦敦" }, { "MAP_CITY_MAD", "马德里" }, { "MAP_CITY_MIA", "迈阿密" }, { "MAP_CITY_MOS", "莫斯科" }, { "MAP_CITY_MUM", "孟买" }, { "MAP_CITY_NAI", "内罗毕" }, { "MAP_CITY_NYC", "纽约" }, { "MAP_CITY_RIO", "里约热内卢" }, { "MAP_CITY_ROM", "罗马" }, { "MAP_CITY_STP", "圣彼得堡" }, { "MAP_CITY_SYD", "悉尼" }, { "MAP_COUNTRY_AFG", "阿富汗" }, { "MAP_COUNTRY_AGO", "安哥拉" }, { "MAP_COUNTRY_ALB", "阿尔巴尼亚" }, { "MAP_COUNTRY_ARE", "阿拉伯联合酋长国" }, { "MAP_COUNTRY_ARG", "阿根廷" }, { "MAP_COUNTRY_ARM", "亚美尼亚" }, { "MAP_COUNTRY_ATA", "南极洲" }, { "MAP_COUNTRY_AUS", "澳大利亚" }, { "MAP_COUNTRY_AUT", "奥地利" }, { "MAP_COUNTRY_AZE", "阿塞拜疆" }, { "MAP_COUNTRY_BDI", "布隆迪" }, { "MAP_COUNTRY_BEL", "比利时" }, { "MAP_COUNTRY_BEN", "贝宁" }, { "MAP_COUNTRY_BFA", "布基纳法索" }, { "MAP_COUNTRY_BGD", "孟加拉" }, { "MAP_COUNTRY_BGR", "保加利亚" }, { "MAP_COUNTRY_BIH", "波黑" }, { "MAP_COUNTRY_BLR", "白俄罗斯" }, { "MAP_COUNTRY_BLZ", "伯利兹" }, { "MAP_COUNTRY_BOL", "玻利维亚" }, { "MAP_COUNTRY_BRA", "巴西" }, { "MAP_COUNTRY_BTN", "不丹" }, { "MAP_COUNTRY_BWA", "博茨瓦纳" }, { "MAP_COUNTRY_CAF", "中非" }, { "MAP_COUNTRY_CAN", "加拿大" }, { "MAP_COUNTRY_CHE", "瑞士" }, { "MAP_COUNTRY_CHL", "智利" }, { "MAP_COUNTRY_CHN", "中国" }, { "MAP_COUNTRY_CIV", "科特迪瓦" }, { "MAP_COUNTRY_CMR", "喀麦隆" }, { "MAP_COUNTRY_COD", "刚果" }, { "MAP_COUNTRY_COG", "刚果" }, { "MAP_COUNTRY_COL", "哥伦比亚" }, { "MAP_COUNTRY_CRI", "哥斯达黎加" }, { "MAP_COUNTRY_CUB", "古巴" }, { "MAP_COUNTRY_CZE", "捷克" }, { "MAP_COUNTRY_DEU", "德国" }, { "MAP_COUNTRY_DJI", "吉布提" }, { "MAP_COUNTRY_DNK", "丹麦" }, { "MAP_COUNTRY_DOM", "多米尼加" }, { "MAP_COUNTRY_DZA", "阿尔及利亚" }, { "MAP_COUNTRY_ECU", "厄瓜多尔" }, { "MAP_COUNTRY_EGY", "埃及" }, { "MAP_COUNTRY_ERI", "厄立特里亚" }, { "MAP_COUNTRY_ESH", "西撒哈拉" }, { "MAP_COUNTRY_ESP", "西班牙" }, { "MAP_COUNTRY_EST", "爱沙尼亚" }, { "MAP_COUNTRY_ETH", "埃塞俄比亚" }, { "MAP_COUNTRY_FIN", "芬兰" }, { "MAP_COUNTRY_FRA", "法国" }, { "MAP_COUNTRY_GAB", "加蓬" }, { "MAP_COUNTRY_GBR", "英国" }, { "MAP_COUNTRY_GEO", "格鲁吉亚" }, { "MAP_COUNTRY_GHA", "加纳" }, { "MAP_COUNTRY_GIN", "几内亚" }, { "MAP_COUNTRY_GNB", "几内亚比索" }, { "MAP_COUNTRY_GNQ", "赤道几内亚" }, { "MAP_COUNTRY_GRC", "希腊" }, { "MAP_COUNTRY_GRL", "格林兰" }, { "MAP_COUNTRY_GTM", "危地马拉" }, { "MAP_COUNTRY_GUF", "法属圭亚那" }, { "MAP_COUNTRY_GUY", "圭亚那" }, { "MAP_COUNTRY_HND", "洪都拉斯" }, { "MAP_COUNTRY_HRV", "克罗地亚" }, { "MAP_COUNTRY_HTI", "海地" }, { "MAP_COUNTRY_HUN", "匈牙利" }, { "MAP_COUNTRY_IDN", "印度尼西亚" }, { "MAP_COUNTRY_IND", "印度" }, { "MAP_COUNTRY_IRL", "爱尔兰" }, { "MAP_COUNTRY_IRN", "伊朗" }, { "MAP_COUNTRY_IRQ", "伊拉克" }, { "MAP_COUNTRY_ISL", "冰岛" }, { "MAP_COUNTRY_ISR", "以色列" }, { "MAP_COUNTRY_ITA", "意大利" }, { "MAP_COUNTRY_JOR", "约旦" }, { "MAP_COUNTRY_JPN", "日本" }, { "MAP_COUNTRY_KAZ", "哈萨克斯坦" }, { "MAP_COUNTRY_KEN", "肯尼亚" }, { "MAP_COUNTRY_KGZ", "吉尔吉斯斯坦" }, { "MAP_COUNTRY_KHM", "柬埔寨" }, { "MAP_COUNTRY_KOR", "韩国" }, { "MAP_COUNTRY_KWT", "科威特" }, { "MAP_COUNTRY_LAO", "老挝" }, { "MAP_COUNTRY_LBR", "利比里亚" }, { "MAP_COUNTRY_LBY", "利比亚" }, { "MAP_COUNTRY_LKA", "斯里兰卡" }, { "MAP_COUNTRY_LSO", "莱索托" }, { "MAP_COUNTRY_LTU", "立陶宛" }, { "MAP_COUNTRY_LVA", "拉脱维亚" }, { "MAP_COUNTRY_MAR", "摩洛哥" }, { "MAP_COUNTRY_MDA", "摩尔多瓦" }, { "MAP_COUNTRY_MDG", "马达加斯加" }, { "MAP_COUNTRY_MEX", "mxg" }, { "MAP_COUNTRY_MKD", "马其顿" }, { "MAP_COUNTRY_MLI", "马里" }, { "MAP_COUNTRY_MMR", "缅甸" }, { "MAP_COUNTRY_MNE", "黑山" }, { "MAP_COUNTRY_MNG", "蒙古" }, { "MAP_COUNTRY_MOZ", "莫桑比克" }, { "MAP_COUNTRY_MRT", "毛里塔尼亚" }, { "MAP_COUNTRY_MWI", "马拉维" }, { "MAP_COUNTRY_MYS", "马来西亚" }, { "MAP_COUNTRY_NAM", "纳米比亚" }, { "MAP_COUNTRY_NER", "尼日尔" }, { "MAP_COUNTRY_NGA", "尼日利亚" }, { "MAP_COUNTRY_NIC", "尼加拉瓜" }, { "MAP_COUNTRY_NLD", "荷兰" }, { "MAP_COUNTRY_NOR", "挪威" }, { "MAP_COUNTRY_NPL", "尼泊尔" }, { "MAP_COUNTRY_NZL", "新西兰" }, { "MAP_COUNTRY_OMN", "阿曼" }, { "MAP_COUNTRY_PAK", "巴基斯坦" }, { "MAP_COUNTRY_PAN", "巴拿马" }, { "MAP_COUNTRY_PER", "秘鲁" }, { "MAP_COUNTRY_PHL", "菲律宾" }, { "MAP_COUNTRY_PNG", "巴布亚新几内亚" }, { "MAP_COUNTRY_POL", "波兰" }, { "MAP_COUNTRY_PRK", "朝鲜" }, { "MAP_COUNTRY_PRT", "葡萄牙" }, { "MAP_COUNTRY_PRY", "巴拉圭" }, { "MAP_COUNTRY_ROU", "罗马尼亚" }, { "MAP_COUNTRY_RUS", "俄罗斯" }, { "MAP_COUNTRY_RWA", "卢旺达" }, { "MAP_COUNTRY_SAU", "沙特阿拉伯" }, { "MAP_COUNTRY_SDN", "苏丹" }, { "MAP_COUNTRY_SEN", "塞内加尔" }, { "MAP_COUNTRY_SJM", "斯瓦巴特" }, { "MAP_COUNTRY_SLE", "塞拉利昂" }, { "MAP_COUNTRY_SLV", "萨尔瓦多" }, { "MAP_COUNTRY_SOM", "索马里" }, { "MAP_COUNTRY_SRB", "塞尔维亚" }, { "MAP_COUNTRY_SUR", "苏里南" }, { "MAP_COUNTRY_SVK", "斯洛伐克" }, { "MAP_COUNTRY_SVN", "斯洛文尼亚" }, { "MAP_COUNTRY_SWE", "瑞典" }, { "MAP_COUNTRY_SWZ", "斯威士兰" }, { "MAP_COUNTRY_SYR", "叙利亚" }, { "MAP_COUNTRY_TCD", "乍得" }, { "MAP_COUNTRY_TGO", "多哥" }, { "MAP_COUNTRY_THA", "泰国" }, { "MAP_COUNTRY_TJK", "塔吉克斯坦" }, { "MAP_COUNTRY_TKM", "土库曼斯坦" }, { "MAP_COUNTRY_TUN", "突尼斯" }, { "MAP_COUNTRY_TUR", "土耳其" }, { "MAP_COUNTRY_TWN", "" }, { "MAP_COUNTRY_TZA", "坦桑尼亚" }, { "MAP_COUNTRY_UGA", "乌干达" }, { "MAP_COUNTRY_UKR", "乌克兰" }, { "MAP_COUNTRY_URY", "乌拉圭" }, { "MAP_COUNTRY_USA", "美国" }, { "MAP_COUNTRY_UZB", "乌兹别克斯坦" }, { "MAP_COUNTRY_VEN", "委内瑞拉" }, { "MAP_COUNTRY_VNM", "越南" }, { "MAP_COUNTRY_YEM", "也门" }, { "MAP_COUNTRY_ZAF", "南非" }, { "MAP_COUNTRY_ZMB", "赞比亚" }, { "MAP_COUNTRY_ZWE", "津巴布韦" }, { "MENU_BUZZ", "BUZZ" }, { "MENU_DATA_SOURCES", "DATA SOURCES" }, { "MENU_MAP", "MAP" }, { "MENU_SHARE_LABEL", "Share" }, { "MENU_STATISTICS", "STATISTICS" }, { "MENU_WIDGET", "WIDGET" }, { "MOBILE_COPYRIGHT", "2015 Kaspersky Lab AO. All Rights Reserved. Based on data from Kaspersky Lab" }, { "MOST_ATTACKED_COUNTRY", "MOST-ATTACKED COUNTRY" }, { "NUMBER_SYMBOL", "#" }, { "SCREENSAVER_CPU", "Intel Core 2 Duo processor or higher" }, { "SCREENSAVER_DOWNLOAD_MAC", "Download for Mac" }, { "SCREENSAVER_DOWNLOAD_TITLE", "Download this Kaspersky Cyber Map as a screensaver" }, { "SCREENSAVER_DOWNLOAD_WIN_x64", "Download for Windows (x64)" }, { "SCREENSAVER_DOWNLOAD_WIN_x86", "Download for Windows (x86)" }, { "SCREENSAVER_GPU", "AMD or NVIDIA graphics card" }, { "SCREENSAVER_REQUIREMENTS", "For this screen saver to run optimally please make sure you have the minimum system requirements" }, { "SHARE_DATA", "Share data" }, { "SOCIAL_HASH_TAGS", "#CyberSecurityMap #CyberSecurity #CyberWar" }, { "SOCIAL_LINK", "https://cybermap.kaspersky.com/" }, { "SOCIAL_TEXT", "Find out if you\u2019re under cyber-attack here" }, { "STATISTICS_BOTNET_ACTIVITY", "Botnet activity" }, { "STATISTICS_DETECTIONS_PER_SECOND", "DETECTIONS PER SECOND" }, { "STATISTICS_HISTORY", "HISTORICAL STATISTICS" }, { "STATISTICS_INFECTED_MAIL", "Infected Mail" }, { "STATISTICS_IN_THE_LAST", "IN THE LAST" }, { "STATISTICS_LAST_MONTH", "Last month" }, { "STATISTICS_LAST_WEEK", "Last week" }, { "STATISTICS_LOCAL_INFECTIONS", "Local infections" }, { "STATISTICS_MONTH", "MONTH" }, { "STATISTICS_MOST_INFECTED_TODAY", "MOST INFECTED TODAY" }, { "STATISTICS_NETWORK_ATTACKS", "Network attacks" }, { "STATISTICS_NO_DATA", "NO DATA" }, { "STATISTICS_ON_DEMAND_SCAN", "On-Demand Scan" }, { "STATISTICS_PER_COUNTRY", "PER COUNTRY" }, { "STATISTICS_REAL_TIME", "REAL-TIME" }, { "STATISTICS_SEE_HISTORICAL_DATA", "See historical data" }, { "STATISTICS_SPAM", "Spam" }, { "STATISTICS_TIME_PERIOD", "TIME PERIOD" }, { "STATISTICS_TOP", "Top" }, { "STATISTICS_TOTALS_RESET", "Detection totals reset every day at 0:00:00 GMT." }, { "STATISTICS_VULNERABILITIES", "Vulnerabilities" }, { "STATISTICS_WEB_THREATS", "Web threats" }, { "STATISTICS_WEEK", "WEEK" }, { "STATISTICS_WORLDWIDE", "WORLDWIDE" }, { "SUBSYSTEMS_DDOS", "BAD (Botnet Activity Detection) shows statistics on identified IP-addresses of DDoS-attacks victims and botnet C&C servers. These statistics were acquired with the help of the DDoS Intelligence system (part of the solution Kaspersky DDoS Protection) and is limited to the data on botnets that were detected and analyzed by Kaspersky Lab." }, { "SUBSYSTEMS_ESSENTIAL_PROTECTION", "ESSENTIAL PROTECTION FOR YOUR PC AGAINST MALWARE" }, { "SUBSYSTEMS_ESSENTIAL_PROTECTION_LINK", "http://www.kaspersky.com/advert/total-security-multi-device-trial?redef=1&THRU&reseller=gl_cybermap_pro_ona_smm__onl_b2c_cybm_lp-button____ktsmd___" }, { "SUBSYSTEMS_FREE_TRAIL", "FREE TRIAL" }, { "SUBSYSTEMS_IDS", "IDS (Intrusion Detection System) shows network attacks detection flow." }, { "SUBSYSTEMS_KAS", "KAS (Kaspersky Anti-Spam) shows suspicious and unwanted email traffic discovered by Kaspersky Lab\u2019s Reputation Filtering technology." }, { "SUBSYSTEMS_MAV", "MAV (Mail Anti-Virus) shows malware detection flow during Mail Anti-Virus scan when new objects appear in an email application (Outlook, The Bat, Thunderbird). The MAV scans incoming messages and calls OAS when saving attachments to a disk." }, { "SUBSYSTEMS_OAS", "OAS (On-Access Scan) shows malware detection flow during On-Access Scan, i.e. when objects are accessed during open, copy, run or save operations." }, { "SUBSYSTEMS_ODS", "ODS (On Demand Scanner) shows malware detection flow during On-Demand Scan, when the user manually selects the \u2019Scan for viruses\u2019 option in the context menu." }, { "SUBSYSTEMS_PREMIUM_PROTECTION", "PREMIUM PROTECTION FOR YOUR PC AGAINST MALWARE AND INTERNET THREATS" }, { "SUBSYSTEMS_PREMIUM_PROTECTION_LINK", "http://www.kaspersky.com/advert/free-trials/multi-device-security-download?redef=1&THRU&reseller=gl_cybermap_pro_ona_smm__onl_b2c_cybm_lp-button____kismd___" }, { "SUBSYSTEMS_VUL", "VLNS (Vulnerability Scan) shows vulnerability detection flow." }, { "SUBSYSTEMS_WAV", "WAV (Web Anti-Virus) shows malware detection flow during Web Anti-Virus scan when the html page of a website opens or a file is downloads. It checks the ports specified in the Web Anti-Virus settings." }, { "SUBTITLE", "Cyberthreat Real-Time Map" }, { "TERMS_AND_CONDITIONS_BODY", "Your use of the web site indicates that you agree to be bound by these terms and conditions. AO Kaspersky Lab (further Kaspersky Lab) reserves the right to change these terms of use or modify any features of the web site at any time at its sole discretion, without notice. If you continue to use the web site after any changes, you will be deemed to have accepted the changes. If you do not agree to all of the terms of use, do not use the web site.<br/>Kaspersky Lab is the owner of all rights, whether exclusive or otherwise to the web site. Kaspersky Lab has all necessary rights, including the intellectually property rights, as well as licenses to posted material and information, including, but not limited to, text, photographs, graphics, video, audio content, and computer code (the content) on the web site.<br/>Kaspersky Lab hereby grants you the right to view and use the web site and content solely for informational, personal, or non-commercial purposes.<br/>You may download, save on your computer or share the content from the web site purposely made available by the Kaspersky Lab for such purposes, provided that you (1) do not remove any proprietary notices, (2) use downloadable content only for your personal, non-commercial purpose and do not redistribute it, (3) make no modifications to any such content and do not misrepresent or demean the content.<br/>Any distribution, publishing, or reproduction of content from this web site not expressly provided in these terms of use is strictly forbidden, except to the extent that the foregoing restrictions are expressly prohibited by applicable law.<br/><br/>THE CONTENT ON THIS WEB SITE IS PROVIDED \u2019AS IS\u2019 WITHOUT WARRANTY OR CONDITIONS OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.<br/>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE RIGHTHOLDER BE LIABLE FOR ANY SPECIAL, INCIDENTAL, PUNITIVE, INDIRECT, OR CONSEQUENTIAL DAMAGES WHATSOEVER ARISING OUT OF OR IN ANY WAY RELATED TO THE USE OF THE CONTENT ON THE WEB SITE.<br/><br/>\u00a9 2015 AO Kaspersky Lab. All Rights Reservd. The Software and any accompanying documentation are copyrighted and protected by copyright laws and international copyright treaties, as well as other intellectual property laws and treaties.<br/><br/>" }, { "TERMS_AND_CONDITIONS_INTRO", "IMPORTANT LEGAL NOTICE TO ALL USERS: CAREFULLY READ THE FOLLOWING TERMS OF USE BEFORE YOU START USING THE WEB SITE." }, { "TERMS_AND_CONDITIONS_LAST_UPDATE", "The last modification was on 18.08.2015" }, { "TERMS_AND_CONDITIONS_TITLE", "Terms of use for the web site." }, { "TERMS_OF_SERVICE", "Terms of Service" }, { "TITLE", "Kaspersky Cyberthreat real-time map" }, { "WIDGET_COLOR_THEME", "Color Theme" }, { "WIDGET_DARK_THEME", "Dark" }, { "WIDGET_DESCRIPTION", "Add the Cybermap to your site by configuring the parameters below and adding the resulting HTML code." }, { "WIDGET_ENGLISH", "English" }, { "WIDGET_HEIGHT", "Height" }, { "WIDGET_LANGUAGE", "Language" }, { "WIDGET_LIGHT_THEME", "Light" }, { "WIDGET_MAIL_THIS_CODE", "MAIL THIS CODE" }, { "WIDGET_RUSSIAN", "Russian" }, { "WIDGET_TAG_DESCRIPTION", "Add this tag to your head or before the close body tag" }, { "WIDGET_TAG_RENDER_DESCRIPTION", "Insert this tag where you want the widget to render" }, { "WIDGET_TITLE", "CYBERMAP WIDGET" }, { "WIDGET_TYPE", "Type" }, { "WIDGET_TYPE_DYNAMIC", "Dynamic" }, { "WIDGET_TYPE_STATIC", "Static" }, { "WIDGET_WIDTH", "Width" }, { "LANG_AR", "Arabic" }, { "LANG_DE", "German" }, { "LANG_EN", "English" }, { "LANG_ES", "Spanish" }, { "LANG_FR", "French" }, { "LANG_IT", "Italian" }, { "LANG_JA", "Japanese" }, { "LANG_PL", "Polish" }, { "LANG_PT", "Portuguese" }, { "LANG_RU", "Russian" }, { "LANG_TR", "Turkish" }, { "LANG_ZH", "Chinese" } };

    Vector3 lastMousePos = Vector3.zero, downMousePos = Vector3.zero;
    bool bMousePressed = false;
    public struct_geocam geocam;
    public static struct_projection projection;
    struct_ee ee;
    float[] H = { -90f, 30.0444f };
    float demo_time_start = 0f;
    float demo_time = 0f;
    float time = 0f;
    float te = 0f;
    float dt = 0f;

    float I = 1.6f;
    float U = 1f;

    Vector3 K, Q, Z, J;

    float Fe = 0f; // 下个操作的时间值
    string ke = "spin_1";// 下一个操作的名字
    string Se = "solo";
    GameObject goLookAt;

    int curPickedCountryId = 0;
    void Awake()
    {
        goLookAt = new GameObject("LookAt");
        geocam.coord = new Vector3(0f, 0f, 5f);
        geocam.coord_target = new Vector3(0f, 0f, 2f);
        geocam.coord_delta = Vector3.zero;
        geocam.lerp_speed = 0.2f;

        geocam.coord.x = H[0];
        geocam.coord.y = H[1];
        geocam.coord_target.x = H[0];
        geocam.coord_target.y = H[1];

        // 相机最远最近位置
        ee.mercator = new float[] { 0.05f, 1f }; // 0.15f, 1f
        ee.ecef = new float[] { 0.15f, 4.5f }; // 0.35f, 4.5f

        projection.blend = 1f;
        projection.dir = 1f;

        te = Time.time;

        Instance = this;
        //SetNextAction("")
    }
    void Start()
    {

    }

    void b()
    {
        //o(null);// 关闭当前国家的显示
        ChangeToState("idle", true);
        //de.exit(),
        //be.hide(),
        //t()
    }
    void y()
    {
        ChangeToState("idle", true);
        //de.exit(),
        //be.hide(),
        //t()
    }
    static RaycastHit TestHitUI = new RaycastHit();
    public static bool HitGUILayer()
    {
        //return null != UICamera.lastHit.collider;
        Camera UI_Camera = UICamera.mainCamera;
        if (UI_Camera)
        {
            var ray = UI_Camera.ScreenPointToRay(Input.mousePosition);

            if (Physics.Raycast(ray.origin, ray.direction, out TestHitUI, Mathf.Infinity, UI_Camera.cullingMask))
            {
                return true;
            }
        }

        return false;
        //return false;
    }
    void Update()
    {
        if (HitGUILayer())
            return;

        if (Input.GetMouseButtonDown(0) || Input.GetMouseButtonDown(1))
        {
            ChangeToState("idle", true);
            bMousePressed = true;
            downMousePos = lastMousePos = Input.mousePosition;
        }

        if (Input.GetMouseButtonUp(0) || Input.GetMouseButtonUp(1))
        {
            bMousePressed = false;
            if (pick.picked_missile_id >= 0)
            {
                JSInterface.Instance.OnAttackClicked(MissileSystem.Instance.GetExternalId(pick.picked_missile_id));
            }
            else
                FocusPickedCountry((Input.mousePosition - downMousePos).magnitude);
        }

        if (bMousePressed && Input.mousePosition != lastMousePos)// mousemove: function(e) {
        {

            bool rr = projection.dir > 0f;
            Vector3 oo = geocam.coord_target;
            float[] i = rr ? ee.ecef : ee.mercator;
            float scale = (rr ? 0.4f : 0.1f) + Mathf.InverseLerp(i[0], i[1], oo[2]);

            // var t = getMouseEventOffset(e),
            float r = Input.mousePosition.x - lastMousePos.x; // r = t[0] - Ne[0],
            float n = Input.mousePosition.y - lastMousePos.y; // n = t[1] - Ne[1];
            lastMousePos = Input.mousePosition;
            // 			if (Ne = t, 'orbit' == z.camera_mode) switch (We) {
            // 				case 0:
            // 					z.orbit.rotate[0] += 0.0025 * n,
            // 					z.orbit.rotate[1] += 0.0025 * r;
            // 					break;
            // 				case 1:
            // 					z.orbit.translate[0] += 0.01 * r,
            // 					z.orbit.translate[1] += 0.01 * n;
            // 					break;
            // 				case 2:
            // 					var o = Math.abs(r) > Math.abs(n) ? r : -n;
            // 					z.orbit.translate[2] += 0.05 * o;
            // 					break;
            // 				default:
            // 					z.pick_required = !0
            // 			} else if ('geocam' == z.camera_mode) {
            // 				var a = z.geocam.coord_delta;
            if (Input.GetMouseButton(0))
            {

                
                geocam.coord_delta[0] -= 0.03f * r * scale;
                geocam.coord_delta[1] -= 0.03f * n * scale;
            }
            else if (Input.GetMouseButton(1))
            {
                float o = Mathf.Abs(r) > Mathf.Abs(n) ? r : -n;
                geocam.coord_delta[2] = -0.01f * o * scale;
            }
            // 				switch (We) {
            // 					case 0:
            // 						a[0] -= 0.03 * r,
            // 						a[1] += 0.03 * n;
            // 						break;
            // 					case 2:
            // 						var o = Math.abs(r) > Math.abs(n) ? r : -n;
            // 						a[2] = -0.01 * o;
            // 						break;
            // 					default:
            // 						z.pick_required = !0
            // 				}
            // 			}
            // 			return !1
            // 		},
        }

        if (Input.GetAxis("Mouse ScrollWheel") != 0f)
        {
            bool rr = projection.dir > 0f;
            Vector3 oo = geocam.coord_target;
            float[] i = rr ? ee.ecef : ee.mercator;

            float scale = (rr ? 0.4f : 0.2f) + Mathf.InverseLerp(i[0], i[1], oo[2]);
            //mousewheel: function(e) {
            b(); // b(),
            // e.preventDefault();
            //float t = 0.9f; // var t = 0.9,
            float fwheel = Input.GetAxis("Mouse ScrollWheel"); // r = e.wheelDelta / 120; // javascript中wheel值为120倍数
            geocam.coord_delta[2] -= (0.1f * fwheel * scale);// return 'orbit' == z.camera_mode ? z.orbit.translate[2] *= 0 > r ? t : 1 / t : 'geocam' == z.camera_mode && (z.geocam.coord_delta[2] -= 0.01 * r), !1 // 只处理geocam方式
        }
    }
    void LateUpdate()
    {
        UpdateCamera();
    }

    void UpdateCamera()
    {
        time = 1f * (Time.time - te);
        dt = 1f / 60f;

        d();

        //         if ('geocam' == z.camera_mode) {
        bool r = projection.dir > 0f; ;// var r = z.projection.dir > 0,
        Vector3 n = geocam.coord;// n = z.geocam.coord,
        Vector3 o = geocam.coord_target;// o = z.geocam.coord_target,
        Vector3 a = geocam.coord_delta; // a = z.geocam.coord_delta;
        o += a;// vec3.add(o, o, a),
        o[1] = Mathf.Clamp(o[1], -90f, 90f);// o[1] = clamp(o[1], -80, 80);
        float[] i;// var i;
        i = r ? ee.ecef : ee.mercator;// i = r ? ee.ecef : ee.mercator,// 获取相机最大最小高度
        o[2] = Mathf.Clamp(o[2], i[0], i[1]);// o[2] = clamp(o[2], i[0], i[1]),
        float scale = Mathf.InverseLerp(i[0], i[1], o[2]);
        if (r)
        {
            if (n[0] < -180f)
            {
                n[0] += 360f;
                o[0] += 360f;
            }
            else if (n[0] > 180f)
            {
                n[0] -= 360f;
                o[0] -= 360f;
            }
        }
        else
            o[0] = Mathf.Clamp(o[0], -180f, 180f);// r ? n[0] < -180 ? (n[0] += 360, o[0] += 360) : n[0] > 180 && (n[0] -= 360, o[0] -= 360) : o[0] = clamp(o[0], -180, 180),
        
        n = Vector3.Lerp(n, o, geocam.lerp_speed/* * scale*/); // vec3.lerp(n, n, o, z.geocam.lerp_speed),
        a *= 0.9f; // vec3.scale(a, a, 0.9),
        Earth_Grid.project_mercator(ref K, new Vector3(n[0], n[1], 0f));// GTW.project_mercator(K, [n[0], n[1], 0]),
        Earth_Grid.project_mercator(ref Q, n); // GTW.project_mercator(Q, n),
        //Q[1] -= 2f;// Q[1] -= 2,// 注释此行让相机始终垂直看向地面
        Z = K - Q;// vec3.sub(Z, K, Q),
        Z.Normalize();// vec3.normalize(Z, Z),
        K = Q;// vec3.copy(K, Q);

        Vector3 u = Vector3.zero;// var u = [ 0, 0, 0];
        Earth_Grid.project_ecef(ref u, new Vector3(n[0], n[1], 0f));// GTW.project_ecef(u, [ n[0], n[1], 0]),
        Earth_Grid.project_ecef(ref Q, n);// GTW.project_ecef(Q, n);
        //float c = Mathf.Clamp01(2f * (I - n[2]));// var c = clamp(2 * (I - n[2]), 0, 1),
        //c = Mathf.Lerp(0f, 2f, c); // c = lerp(0, 2, c);
        //Q[1] -= c;// Q[1] -= c,// 注释此行让相机始终垂直看向地面
        J = u - Q;// vec3.sub(J, u, Q),
        J.Normalize();// vec3.normalize(J, J);
        float l = smoothstep(projection.blend); // var l = smoothstep(z.projection.blend);
        K = Vector3.Lerp(K, Q, l); // vec3.lerp(K, K, Q, l),// 相机位置
        Z = Vector3.Lerp(Z, J, l); // vec3.lerp(Z, Z, J, l),// 相机目标
        // 坐标赋值给Unit对象时x需要反向
        K.x = -K.x;
        Z.x = -Z.x;
        goLookAt.transform.position = K + Z;// z.camera.update(K, Z)}
        GTW.MainCamera.transform.localPosition = K;
        GTW.MainCamera.transform.LookAt(goLookAt.transform);
        projection.blend = Mathf.Clamp01(projection.blend + projection.dir / 120f); //z.projection.blend = clamp(z.projection.blend + z.projection.dir / 120, 0, 1)
        geocam.coord = n;
        geocam.coord_target = o;
        geocam.coord_delta = a;
    }

    public static float smoothstep(float e)
    {
        return 3f * e * e - 2f * e * e * e;
    }



    //     zoom_in: function() {
    // 			z.geocam.coord_delta[2] -= qe
    // 		},
    // 		zoom_out: function() {
    // 			z.geocam.coord_delta[2] += qe
    // 		},


 // function o(e) {// 打开或关闭2D国家标签
// 		e !== j && (e ? (N.show_country_popup(GTW.get_country_name(e)), we = 0, Ee = 0) : N.hide_country_popup(), j = e, r($('#countrypop')[0], e))
// 	}

//     q = setTimeout(function() {
// 				o(e)
// 			}, 5000)


    void t()
    {
        //     function t() {
        // 		q && (clearTimeout(q), q = null, vec3.copy(z.geocam.coord_target, z.geocam.coord), _e.cancel_flash())// 取消定时更新（2D国家标签），跟新相机目标为当前位置以停止转动，
        // 	}
        geocam.coord_target = geocam.coord;
    }

    //O = !! e.widget,
    //C = !! e.screensaver,
    public void FocusPickedCountry(float fDist)   //     function E(e) { // 点击国家
    {
        // 		if (!O && !C) {// 不在widget和screensaver状态下
        float r = 5f;// 			var r = 5;// 鼠标按下和抬起间移动距离
        if (fDist < r)// 			if (!(e > r)) {
        {
            if (pick.picked_country_id == 0)// 				if (z.pick_index < 0) return o(null),
            {
                //o(null);
                a(false);// void a();
                return;
            }
            t(); // t();
            // var n = he.countries[z.pick_index];
            // n === j ? (o(null), a()) : (vec3.set(z.geocam.coord_target, n.center[0], n.center[1], U), o(n)),
            if (curPickedCountryId != pick.picked_country_id)
            {
                curPickedCountryId = pick.picked_country_id;
                if (curPickedCountryId >= 300)
                {
                    //curPickedCountryId = 89;
                    ChinaDetailData cdd = ChinaProvinceCity.Instance.cdd;
                    Vector3 v3Target = Vector3.zero;
                    if (cdd.bIncCity && curPickedCountryId >= cdd.iCityIdBeg)
                        v3Target = cdd.china_cities[curPickedCountryId - cdd.iCityIdBeg].center_location;
                    else
                        v3Target = cdd.china_provinces[curPickedCountryId - 301].center_location;

                    geocam.coord_target.Set(v3Target.x, v3Target.y, geocam.coord[2]);
                    JSInterface.Instance.OnAreaClicked(curPickedCountryId);
                }
                else
                {
                    if (Country.dic_pick_index.ContainsKey(curPickedCountryId))
                    {
                        country_data c_data = Country.dic_pick_index[curPickedCountryId];
                        geocam.coord_target.Set(c_data.center_location[0], c_data.center_location[1], geocam.coord[2]);
                        JSInterface.Instance.OnAreaClicked(curPickedCountryId);
                    }
                }
                //o(n)
            }
            else
            {
                //o(null);
                a();
            }
            //D(null); // D(null)
        }
    }
    void d()
    {
//         if (Time.time > Fe)//if (z.time > Fe && m(ke), O || C) return void(z.geocam.coord_delta[0] = 6 * z.dt);
//         {
//             ChangeToState(ke);//m(ke);
//             if (false || false)
//             {
//                 geocam.coord_delta[0] = 6f * dt;
//                 return;
//             }
//         }
        // 根据状态名判断是否需要旋转
        switch (Se)//switch (Se) {
        {
            case "spin_1": // case 'spin_1':
            case "spin_2": // case 'spin_2':
            case "solo": // case 'solo':
                {
                    bool b = projection.dir > 0; // var e = z.projection.dir > 0;
                    if (b) // if (e) {
                    {
                        float t = dt; // var t = z.dt,
                        float r = 6 * t; // r = 6 * t,
                        float n = Mathf.Min(1f, 0.2f * Time.time); // n = Math.min(1, 0.2 * z.time),
                        float o = Mathf.Lerp(10f, 2, n); // o = lerp(10, 2, n);
                        geocam.coord_delta[0] = o * r; // z.geocam.coord_delta[0] = o * r
                    }
                }
                break;
        }
    }
    void a(bool bResetHeight = true)//function a() {
    {
        if (bResetHeight)
            geocam.coord_target[2] = I;//    z.geocam.coord_target[2] = I,// 重置相机高度

        geocam.lerp_speed = 0.2f;//    z.geocam.lerp_speed = 0.2}
    }

    //}
    public void OnClickSwitchView()
    {
        //'flat' == e ? (z.projection.dir = -1, me.project_labels('mercator'), a(), o(null), this.set_demo(!1), N.set_view_state('flat')) : 'globe' == e && (z.projection.dir = 1, me.project_labels('ecef'), a(), o(null), N.set_view_state('globe'))
        GTW.bSphere = !GTW.bSphere;
        if (!GTW.bSphere)
        {
            //ChangeToAction("idle");
            projection.dir = -1f;
            a();
        }
        else
        {
            //ChangeToAction("spin_1");
            projection.dir = 1f;
            a();
        }
        if (Missile.bStaticEffect)
            JSInterface.Instance.DrawAttackBatchInternal();
        else
            MissileSystem.Instance.OnSwitchView();
    }

    void SetNextAction(string name, float delaytime)	//function h(e, t) {
    {
        Fe = Time.time + delaytime; // Fe = z.time + t,
        ke = name; // ke = e
    }

    void ChangeToState(string e, bool b = false)    //     function m(e, r) {
    {
        if (b || e != Se)//	if ((r || e !== Se) && !$('body').hasClass('scroll')) {
        {
            switch (e)// 			switch (e) {
            {
                case "idle": // case 'idle':
                    // N.set_demo_state(!1),
                    geocam.lerp_speed = 0.2f;   // z.geocam.lerp_speed = 0.2,
                    //SetNextAction("spin_1", 30);// B && h('spin_1', 30);
                    break;// 					break;
                case "spin_1":// case 'spin_1':
                    {
                        if (!GTW.bSphere)
                            OnClickSwitchView();// z.projection.dir < 0 && MAP.set_view('globe'),
                        // MAP.is_bad_mode || (N.set_demo_state(!0), t(), be.setup(z, he), be.show(), h('solo', 20)),
                        geocam.lerp_speed = 0.015f;// z.geocam.lerp_speed = 0.015,
                        // a(),
                        // o(null);
                    }
                    break;                    // break;
                case "solo":// case 'solo':
                    // be.hide();
                    // var n = [];
                    // GTW.systems_foreach(function(e, t) {
                    // e.enabled && n.push(t)
                    // }),
                    // n.length > 0 && (z.solo_system_id = _.sample(n), D(z.solo_system_id), h('spin_2', 15));
                    break;// break;
                case "spin_2":// case 'spin_2':
                    // D(null),
                    // h('demo', 5);
                    break;// break;
                // 				case 'demo':
                // 					z.demo_time_start = z.time;
                // 					var i = !1;
                // 					if (function() {
                // 						var e = S(!0),
                // 							t = F();
                // 						if (!e || !t) return void console.log('BAD DEMO');
                // 						var r = vec3.create();
                // 						v(r, t.key),
                // 						de.setup(z, e.center, r),
                // 						vec2.copy(z.geocam.coord_target, r),
                // 						vec2.copy(z.geocam.coord, r),
                // 						setTimeout(function() {
                // 							o(t),
                // 							D(null)
                // 						}, 5000),
                // 						setTimeout(function() {
                // 							o(null)
                // 						}, 15000),
                // 						i = !0
                // 					}(), !i) return void m('spin_2', 0);
                // 					h('spin_1', 20)
                // 			}

            }
            Se = e;// Se = e
        }
    }

}
