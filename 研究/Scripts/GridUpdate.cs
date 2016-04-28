using UnityEngine;
using System.Collections;

public class GridUpdate : MonoBehaviour
{
    GameObject goItemTemplate = null;
    UIGrid thisGrid = null;
    UIScrollBar thisScrollBar = null;
    GameObject[] m_Items = null;
    void Awake()
    {
        goItemTemplate = transform.Find("item_template").gameObject;
        goItemTemplate.SetActive(false);
        thisGrid = GetComponent<UIGrid>();
        thisScrollBar = (UIScrollBar)GetComponent<UIScrollView>().verticalScrollBar;
    }
	// Use this for initialization
	void Start () 
    {

	}
	// Update is called once per frame
	public void UpdateContent(ArrayList alDatas) 
    {
        ClearItem();
        m_Items = new GameObject[alDatas.Count];
        for (int i = 0; i < alDatas.Count; ++i)
        {
            GameObject newItem = (GameObject)GameObject.Instantiate(goItemTemplate);
            newItem.transform.parent = goItemTemplate.transform.parent;
            newItem.transform.localScale = new Vector3(1, 1, 1);
            newItem.transform.localPosition = Vector3.zero;
            newItem.name = i.ToString();
            newItem.SetActive(true);
            GridItem gi = newItem.GetComponentInChildren<GridItem>();
            gi.UpdateLabel((Hashtable)alDatas[i]);
            m_Items[i] = newItem;
        }
        //thisScrollBar.value = 0.1f;
        thisGrid.Reposition();
        
	}
    private void ClearItem()
    {
        if (m_Items == null)
            return;

        thisScrollBar.value = 0.0f;
        thisGrid.Reposition();
        foreach (GameObject go in m_Items)
        {
            go.transform.parent = null;
            GameObject.Destroy(go);
        }

        m_Items = null;
        thisGrid.Reposition();
    }
}
