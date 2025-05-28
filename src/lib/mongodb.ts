// lib/mongodb.ts
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI as string // define essa variável no .env.local
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

if (!process.env.MONGODB_URI) {
  throw new Error("Por favor, defina a variável MONGODB_URI no .env.local")
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise