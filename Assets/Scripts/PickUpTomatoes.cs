using Unity.VisualScripting;
using UnityEngine;

public class PickUpTomatoes : MonoBehaviour
{

public GameObject PickUpText;
public GameObject CrateOfTomatoesOnPlayer;
public GameObject Crate;
public Transform CrateOfTomatoes;

    void Start()
    {
        CrateOfTomatoesOnPlayer.SetActive(false);
        PickUpText.SetActive(false);
        Crate.GetComponent<Rigidbody>().isKinematic = true;
    }

    void Update()
    {
        if (Input.GetKey(KeyCode.R))
        {
           Drop(); 
        }
    }


    void Drop()
    {
        CrateOfTomatoes.DetachChildren();
        Crate.transform.eulerAngles = new Vector3(Crate.transform.position.x, Crate.transform.position.z, Crate.transform.position.y);
        Crate.GetComponent<Rigidbody>().isKinematic = false;
        Crate.GetComponent<MeshCollider>().enabled = true;
    }

    private void OnTriggerStay(Collider other)
    {
       if(other.gameObject.tag == "Player")
       {
            PickUpText.SetActive(true);

            if (Input.GetKey(KeyCode.E))
            {
                this.gameObject.SetActive(false);
                CrateOfTomatoesOnPlayer.SetActive(true);
            
            PickUpText.SetActive(false);

            }
       } 
    }
    private void OnTriggerExit(Collider other)
    {
        PickUpText.SetActive(false);
    }
}
