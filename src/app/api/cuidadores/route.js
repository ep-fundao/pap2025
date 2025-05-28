import { MongoClient } from "mongodb"
// import type { NextApiRequest, NextApiResponse } from "next"

const uri = process.env.MONGODB_URI // coloque sua string de conexão .env
const client = new MongoClient(uri)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" })
  }

  try {
    await client.connect()
    const db = client.db("clicktocare") // nome do banco
    const cuidadores = db.collection("cuidadores")

    const data = req.body

    // opcional: validar dados aqui

    const result = await cuidadores.insertOne(data)
    return res.status(201).json({ message: "Cadastrado com sucesso", id: result.insertedId })
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error)
    return res.status(500).json({ message: "Erro ao cadastrar cuidador" })
  } finally {
    await client.close()
  }
}
