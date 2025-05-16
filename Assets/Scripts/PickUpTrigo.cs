using Unity.VisualScripting;
using UnityEngine;

public class PickUpTrigo : MonoBehaviour
{

public GameObject PickUpText;
public GameObject CrateOfTrigoOnPlayer;
    void Start()
    {
        CrateOfTrigoOnPlayer.SetActive(false);
        PickUpText.SetActive(false);
    }

    private void OnTriggerStay(Collider other)
    {
       if(other.gameObject.tag == "Player")
       {
            PickUpText.SetActive(true);

            if (Input.GetKey(KeyCode.E))
            {
                this.gameObject.SetActive(false);
                CrateOfTrigoOnPlayer.SetActive(true);
            
            PickUpText.SetActive(false);

            }
       } 
    }
    private void OnTriggerExit(Collider other)
    {
        PickUpText.SetActive(false);
    }
}
