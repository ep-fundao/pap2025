using UnityEngine;

public class MovimentoJogador : MonoBehaviour
{
     private CharacterController controller;
     private Transform myCamera;
     private Animator animator;

     private bool EstaNoChao;
     [SerializeField] private Transform PeDoPersonagem;
     [SerializeField] private LayerMask ColisaoLayer;

     private float forcaY;
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
       controller = GetComponent<CharacterController>();
       myCamera = Camera.main.transform;
       animator = GetComponent<Animator>();
    }

    // Update is called once per frame
void Update()
{
    if (dialogue) return; // se estiver em diálogo, não faz nada

    float horizontal = Input.GetAxis("Horizontal"); 
    float vertical = Input.GetAxis("Vertical");

    Vector3 movimento = new Vector3(horizontal, 0, vertical);

    movimento = myCamera.TransformDirection(movimento);
    movimento.y = 0;

    controller.Move(movimento * Time.deltaTime * 5);

    if(movimento != Vector3.zero)
    {
        transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(movimento), Time.deltaTime * 10);
    }

    animator.SetBool("Mover", movimento != Vector3.zero);

    EstaNoChao = Physics.CheckSphere(PeDoPersonagem.position, 0.3f, ColisaoLayer);
    animator.SetBool("EstaNoChao", EstaNoChao);

    if(Input.GetKeyDown(KeyCode.Space) && EstaNoChao)
    {
        forcaY = 5f;
        animator.SetTrigger("Saltar");
    }
    if(forcaY > -9.81f)
    {
        forcaY += -9.81f * Time.deltaTime;
    }

    controller.Move(new Vector3(0, forcaY, 0) * Time.deltaTime);
}

    static public bool dialogue = false;

}

