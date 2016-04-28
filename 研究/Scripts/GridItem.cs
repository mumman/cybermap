using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;

public class GridItem : MonoBehaviour 
{

    static string[][] keys = new string[4][] { new string[] { "ip", "src_pos", "type", "count", "domain", "des_pos" }, new string[] { "src_area", "count" }, new string[] { "des_area", "count" }, new string[] {"color", "type", "count" } };
    public int keys_id = -1;
    List<UIWidget> lab_widget = new List<UIWidget>();
	// Use this for initialization
	void Awake ()
    {
        int i = 0;
        Transform transChild = transform.FindChild("col_" + i.ToString());
        while(transChild != null)
        {
            lab_widget.Add(transChild.GetComponent<UIWidget>());
            transChild = transform.Find("col_" + (++i).ToString());
        }
	}

    string strText = "";
    string strColor = "";
    UILabel tmpLabel = null;
    public void UpdateLabel(Hashtable hs_data)
    {
            for (int i = 0; i < lab_widget.Count; ++i )
            {
                if (hs_data.ContainsKey(keys[keys_id][i]))
                {
                    strText = (string)hs_data[keys[keys_id][i]];
                }
                else
                    strText = "";

                if (strText.StartsWith("#"))
                {
                    strColor = strText.Substring(0, 7);
                    strText = strText.Remove(0, 7);
                }
                else
                    strColor = "#FFFFFF";

                lab_widget[i].color = Parse(strColor);
                
                if (lab_widget[i].GetType() == typeof(UILabel))
                {
                    tmpLabel = (UILabel)lab_widget[i];
                    if (tmpLabel != null)
                    {
                        tmpLabel.text = strText;
                    }
                }
            }
    }

    
   Color Parse(string hexstring)
   {
            if (hexstring.StartsWith("#"))
            {
                hexstring = hexstring.Substring(1);
            }

            if (hexstring.StartsWith("0x"))
            {
                hexstring = hexstring.Substring(2);
            }

            byte r = byte.Parse(hexstring.Substring(0, 2), NumberStyles.HexNumber);
            byte g = byte.Parse(hexstring.Substring(2, 2), NumberStyles.HexNumber);
            byte b = byte.Parse(hexstring.Substring(4, 2), NumberStyles.HexNumber);

            return new Color32(r, g, b, 255);
 }
}
