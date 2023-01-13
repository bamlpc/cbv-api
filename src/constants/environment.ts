import { dotenv } from 'deps';

await dotenv.load({ export: true, allowEmptyValues: true });

const MONGODB = {
	ID: Deno.env.get('MONGODB_ID') || '',
	PASS: Deno.env.get('MONGODB_PASS') || '',
	URL: Deno.env.get('MONGODB_URL') || '',
	DB_NAME: Deno.env.get('MONGODB_DB_NAME') || 'cbv',
	COLLECTION: Deno.env.get('MONGODB_COLLECTION') || 'issues',
};
const ENVIRONMENT = {
	PROD: Deno.env.get('DENO_ENVIRONMENT') || 'dev',
	URL: Deno.env.get('DENO_URL') || 'localhost',
	PORT: Deno.env.get('DENO_PORT') || 8000,
};

const API_KEY = [
	Deno.env.get('API_KEY_1') || 'API_KEY_1',
	Deno.env.get('API_KEY_2') || 'API_KEY_2'
]

export { API_KEY, ENVIRONMENT, MONGODB };
