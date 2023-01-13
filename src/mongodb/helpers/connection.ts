import { mongo } from 'deps';
import { MONGODB } from 'environment';
import { MongoCBVSchema } from 'schemas';

// iniciate mongo
const client = new mongo.MongoClient();

await client.connect({
	db: MONGODB.DB_NAME,
	tls: true,
	servers: [
		{
			host: MONGODB.URL, //"cluster0-shard-00-01.adchc.mongodb.net"
			port: 27017,
		},
	],
	credential: {
		username: MONGODB.ID,
		password: MONGODB.PASS,
		db: MONGODB.DB_NAME,
		mechanism: 'SCRAM-SHA-1',
	},
});

// Access Collection
const db = client.database(MONGODB.DB_NAME);
const issues = db.collection<MongoCBVSchema>(MONGODB.COLLECTION);

export { issues };
