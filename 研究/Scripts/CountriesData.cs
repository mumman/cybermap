using UnityEngine;
using System.Collections;
using System.Collections.Generic;

[System.Serializable]
public class CountriesData : ScriptableObject
{
    public int[] dic_pick_keys;
    public country_data[] dic_pick_values;

    public List<Vector3> country_pos0;
    public List<Vector3> country_pos1;
    public int[] country_index;
    public int[] boundary_index;
    public List<Vector2> country_tex;
    public List<Vector2> country_normal1;

    public List<Vector3> coast_pos0;
    public List<Vector3> coast_pos1;
    public int[] coast_index;
    public List<Vector2> coast_tex;
    public List<Vector3> coast_normal0;
    public List<Vector3> coast_normal1;
}
