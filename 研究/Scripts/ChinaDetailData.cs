using UnityEngine;
using System.Collections;
using System.Collections.Generic;

[System.Serializable]
public class ChinaDetailData : ScriptableObject
{
    public bool bIncCity = false;
    public int iCityIdBeg = -1;
    public country_data[] china_provinces = null;
    public country_data[] china_cities = null;

    public List<Vector3> vertex_mecator;
    public List<Vector3> vertex_ecef;
    public int[] index_all;
    public int[] index_boundary;
    public int[] china_border;
    public List<Vector2> id_all;
    public List<Vector2> color_all;
    public int[] index_no_picked = new int[0];
    public int[] city_province_map = null;
}