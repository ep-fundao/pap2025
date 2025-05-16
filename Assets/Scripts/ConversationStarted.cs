using UnityEngine;
using DialogueEditor;

public class ConversationStarted : MonoBehaviour
{
    public GameObject PressTotalk;
    [SerializeField] private NPCConversation myConversation;

    void Start()
    {
        PressTotalk.SetActive(false);
    }

    private void OnTriggerStay(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            // Só mostra se não está em diálogo
            if (!ConversationManager.Instance.IsConversationActive)
            {
                PressTotalk.SetActive(true);
            }

            if (Input.GetKeyDown(KeyCode.F) && !ConversationManager.Instance.IsConversationActive)
            {
                PressTotalk.SetActive(false); // esconde quando começa o diálogo
                ConversationManager.Instance.StartConversation(myConversation);
            }
        }
    }

    private void OnTriggerExit(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            PressTotalk.SetActive(false);
        }
    }
}
