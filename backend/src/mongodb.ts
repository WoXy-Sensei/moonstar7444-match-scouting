import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config();

const uri:any = process.env.NEXT_ATLAS_URI;
console.log(uri);

const options:any = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let mongoClient : any = null;
let database:any= null;

if (!process.env.NEXT_ATLAS_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}

export async function connectToDatabase() {
    try {
        if (mongoClient && database) {
            return { mongoClient, database };
        }
        if (process.env.NODE_ENV === "development") {
            if ((!global as any)._mongoClient) {
                mongoClient = await (new MongoClient(uri, options)).connect();
                (global as any)._mongoClient = mongoClient;
            } else {
                mongoClient =  (global as any)._mongoClient;
            }
        } else {
            mongoClient = await (new MongoClient(uri, options)).connect();
        }
        database = await mongoClient.db(process.env.NEXT_ATLAS_DATABASE);
        return { mongoClient, database };
    } catch (e) {
        console.error(e);
    }
}