/* import connection from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request) {
  let conn;
  try {
    // Tenta estabelecer conexão
    conn = await connection.getConnection();
    
    const data = await request.json();
    
    // Extrair campos
    const {
      nome,
      email,
      senha: password,
      numero_telefone,
      data_nascimento,
      data_ultima_menstruacao,
      data_prevista_parto,
      numero_gravidez,
      nome_medico,
      hospital,
      preferencias_notificacao,
      frequencia_dicas,
      principais_interesses
    } = data;

    // Validação
    if (!nome || !email || !password) {
      return new Response(
        JSON.stringify({ 
          error: "Campos obrigatórios faltando",
          campos_obrigatorios: {
            nome: !nome,
            email: !email,
            senha: !password
          }
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verifica email existente
    const [existingUsers] = await conn.query(
      'SELECT id FROM cuidadores WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return new Response(
        JSON.stringify({ error: "Email já cadastrado" }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insere usuário
    const [result] = await conn.query(
      `INSERT INTO cuidadores (
        nome, 
        email, 
        palavra_passe,
        numero_telefone,
        data_nascimento,
        data_ultima_menstruacao,
        data_prevista_parto,
        numero_gravidez,
        nome_medico,
        hospital,
        preferencias_notificacao,
        frequencia_dicas,
        principais_interesses,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        nome,
        email,
        hashedPassword,
        numero_telefone || null,
        data_nascimento || null,
        data_ultima_menstruacao || null,
        data_prevista_parto || null,
        numero_gravidez || null,
        nome_medico || null,
        hospital || null,
        preferencias_notificacao || null,
        frequencia_dicas || null,
        principais_interesses || null
      ]
    );

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Registro realizado com sucesso",
        userId: result.insertId 
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error('Erro no registro:', error);
    return new Response(
      JSON.stringify({ 
        error: "Erro interno do servidor",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    if (conn) conn.release();
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({ 
      message: "Use POST para registrar um novo cuidador",
      campos_obrigatorios: ["nome", "email", "senha"],
      campos_opcionais: [
        "numero_telefone",
        "data_nascimento",
        "data_ultima_menstruacao",
        "data_prevista_parto",
        "numero_gravidez",
        "nome_medico",
        "hospital",
        "preferencias_notificacao",
        "frequencia_dicas",
        "principais_interesses"
      ]
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
} */