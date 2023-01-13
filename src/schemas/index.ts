import { mongo } from 'deps';

interface CBV {
	title: string;
	short_description: string;
	cbv_id: string;
	blockchain: string;
	version_affected: string;
	component: string;
	severity: string;
	vulnerability_type: string;
	details: string;
	recommendation: string;
	references: string;
	labels: string;
	tests: string;
	aditional_comments: string;
	credits: string;
	created_at: string;
	updated_at: string;
	api_key?: string;
}

// Defining schema interface
interface MongoCBVSchema {
	_id: mongo.ObjectId;
	cbv: CBV;
}

export type { CBV, MongoCBVSchema };

