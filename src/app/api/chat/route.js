import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL,
    'X-Title': 'ClickToCare',
    'Content-Type': 'application/json',
  },
});

export async function POST(req) {
  // Verificação mais robusta da API key
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error('API key não encontrada');
    return new Response(
      JSON.stringify({ error: 'Configuração do servidor incompleta' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
  
  try {
    const { messages } = await req.json();

    // Validação melhorada das mensagens
    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ 
        error: "Por favor, forneça uma mensagem válida" 
      }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Você é o ClickToCare, um assistente especializado em saúde materno-infantil. 
                  Forneça respostas acolhedoras, profissionais e baseadas em evidências científicas.
                  Em caso de emergências médicas, sempre oriente a buscar atendimento profissional.`,
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000,
      stream: false,
    });

    // Validação melhorada da resposta
    if (!response?.choices?.[0]?.message?.content) {
      throw new Error('Resposta da API incompleta ou inválida');
    }

    return Response.json({ 
      resposta: response.choices[0].message.content.trim() 
    });

  } catch (error) {
    console.error('Erro no processamento:', {
      message: error.message,
      code: error.code,
      type: error.type,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });

    return Response.json({ 
      error: 'Não foi possível processar sua solicitação',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { 
      status: error.status || 500 
    });
  }
}