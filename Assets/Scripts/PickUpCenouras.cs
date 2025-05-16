using Unity.VisualScripting;
using UnityEngine;

public class PickUpCenouras : MonoBehaviour
{

public GameObject PickUpText;
public GameObject CrateOfCenourasOnPlayer;
public GameObject Crate;
    void Start()
    {
        CrateOfCenourasOnPlayer.SetActive(false);
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
                CrateOfCenourasOnPlayer.SetActive(true);
            
            PickUpText.SetActive(false);

            }
       } 
    }
    private void OnTriggerExit(Collider other)
    {
        PickUpText.SetActive(false);
    }
}
