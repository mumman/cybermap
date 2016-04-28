using UnityEngine;
using System.Collections;

public class TableAnim : MonoBehaviour 
{
    bool bOpened = true;
    TweenPosition m_Anim = null;
    public GameObject btnOpen;
    public GameObject btnClose;
    void Awake()
    {
        m_Anim = GetComponent<TweenPosition>();
        m_Anim.enabled = false;
        btnOpen.SetActive(false);
    }

    public void OnTweenPos()
    {
        m_Anim.from.x = transform.localPosition.x;
        m_Anim.from.y = transform.localPosition.y;
        m_Anim.to.x = transform.localPosition.x;
        m_Anim.to.y = bOpened ? transform.localPosition.y - 119 : transform.localPosition.y + 119;
        bOpened = !bOpened;
        m_Anim.enabled = true;
        m_Anim.ResetToBeginning();
        if (bOpened)
        {
            btnClose.SetActive(true);
            btnOpen.SetActive(false);
        }
        else
        {
            btnClose.SetActive(false);
            btnOpen.SetActive(true);
        }
    }
}
