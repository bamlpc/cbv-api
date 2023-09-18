import { mongo } from 'deps';
import { MONGODB } from 'environment';
import { StoredMongoCBVSchema } from 'schemas';

const client = new mongo.MongoClient();

const hosts = MONGODB.URL.split(',');

let isConnected = false;
for (const host of hosts) {
    try {
        await client.connect({
            db: MONGODB.DB_NAME,
            tls: true,
            servers: [{
                host: host.trim(),
                port: 27017,
            }],
            credential: {
                username: MONGODB.ID,
                password: MONGODB.PASS,
                db: MONGODB.DB_NAME,
                mechanism: 'SCRAM-SHA-1',
            },
        });
        isConnected = true;
        break;  // break the loop if connection is successful
    } catch (err) {
        console.error(`Failed to connect to ${host}. Trying the next one...`);
    }
}

if (!isConnected) {
    throw new Error('Failed to connect to all MongoDB hosts.');
}

// Access Collection
const db = client.database(MONGODB.DB_NAME);
const issues = db.collection<StoredMongoCBVSchema>(MONGODB.COLLECTION);

export { issues };
