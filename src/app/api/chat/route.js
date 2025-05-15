import OpenAI from 'openai';

// Configuração específica para OpenRouter
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'X-Title': process.env.NEXT_PUBLIC_APP_NAME || 'ClickToCare',
  },
});

export async function POST(req) {
  if (!process.env.OPENROUTER_API_KEY) {
    return Response.json({ 
      error: 'API key não configurada' 
    }, { status: 500 });
  }
  
  try {
    const { messages } = await req.json();

if (!Array.isArray(messages) || messages.length === 0) {
  return Response.json({ error: "Histórico de mensagens vazio ou inválido" }, { status: 400 });
}

const response = await openai.chat.completions.create({
  model: 'openai/gpt-3.5-turbo',
  messages: [
    {
      role: 'system',
      content: 'Você é um assistente de saúde materno-infantil chamado ClickToCare. Responda de forma acolhedora e profissional.',
    },
    ...messages
  ],
});

    console.log('Resposta completa:', JSON.stringify(response, null, 2)); // Debug

    if (!response.choices?.[0]?.message?.content) {
      throw new Error('Estrutura da resposta inválida');
    }

    return Response.json({ 
      resposta: response.choices[0].message.content 
    });

  } catch (error) {
    console.error('Erro detalhado:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });

    return Response.json(
      { 
        error: 'Erro ao processar sua mensagem',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}