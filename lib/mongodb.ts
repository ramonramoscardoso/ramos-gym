import { MongoClient, MongoClientOptions, Document } from 'mongodb';


const options: MongoClientOptions = {
  maxPoolSize: 10,
};

let cachedClient: MongoClient | null = null;
let cachedPromise: Promise<MongoClient> | null = null;

export async function getMongoClient() {
  if (cachedClient) {
    return cachedClient;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local or deployment settings.');
  }

  if (!cachedPromise) {
    const client = new MongoClient(process.env.MONGODB_URI, options);
    cachedPromise = client.connect();
  }

  cachedClient = await cachedPromise;
  return cachedClient;
}

export async function getDatabase() {
  const client = await getMongoClient();
  return client.db();
}

export async function getCollection<T extends Document = Document>(name: string) {
  const db = await getDatabase();
  return db.collection<T>(name);
}
