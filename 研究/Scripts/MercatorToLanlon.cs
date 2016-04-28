using UnityEngine;
using System.Collections;

public class MercatorToLanlon : MonoBehaviour
{
    public Vector2 LanLon;
	// Use this for initialization
	void Start () 
    {
	
	}
	
	// Update is called once per frame
	void Update () 
    {
        Country.UnProjectMercator(gameObject.transform.position.x, gameObject.transform.position.y, gameObject.transform.position.z, out LanLon.x, out LanLon.y);
	}
}
