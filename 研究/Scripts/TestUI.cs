using UnityEngine;
using System.Collections;

public class TestUI : MonoBehaviour 
{
    static public TestUI Instance;
    public GameObject[] TestGameobjects = new GameObject[5];

    public GameObject goFullscreen;
    public GameObject goNormnalscreen;
    
    void Awake()
    {
        Instance = this;
    }
    public void ShowUI(bool bShow)
    {
        foreach(GameObject go in TestGameobjects)
        {
            go.SetActive(bShow);
        }
    }
}
