import { mongo } from 'deps';
import { CBV, MongoCBVSchema } from 'schemas';
import { issues } from './helpers/connection.ts';
//TODO: serch "error.message" type

//
const mongodb_store_cbv = async (
	store: Record<string, CBV>,
): Promise<string> => {
	try {
		const _new = store.cbv;
		const insert_cbv = await issues.insertOne({
			cbv: {
				title: _new.title,
				short_description: _new.short_description,
				cbv_id: _new.cbv_id,
				blockchain: _new.blockchain,
				version_affected: _new.version_affected,
				component: _new.component,
				severity: _new.severity,
				vulnerability_type: _new.vulnerability_type,
				details: _new.details,
				recommendation: _new.recommendation,
				references: _new.references,
				labels: _new.labels,
				tests: _new.tests,
				aditional_comments: _new.aditional_comments,
				created_at: _new.created_at,
				updated_at: _new.updated_at,
			},
		});
		return insert_cbv.toString();
	} catch (error) {
		return error.message;
	}
};

//
const mongodb_find_by_cbv_code = async (
	cbv_code: Record<string, string>,
): Promise<MongoCBVSchema | undefined> => {
	try {
		const find_cbv = await issues.findOne(
			{ 'cbv.cbv_id': { $in: [cbv_code.cbv_id] } },
			{
				noCursorTimeout: false,
			},
		);
		return find_cbv;
	} catch (error) {
		return error.message;
	}
};

//
const mongodb_find_with_labels = async (
	_labels: Array<string>,
): Promise<Array<MongoCBVSchema>> => {
	const find_with_labels = await issues.find(
		{ 'cbv.labels': { $in: _labels } },
		{
			noCursorTimeout: false,
		},
	)
		.toArray();
	return find_with_labels;
};

//
const mongodb_find_by_blockchain = async (
	input: Record<string, string[]>,
): Promise<MongoCBVSchema | undefined> => {
	try {
		const find_by_blockchain = await issues.findOne({
			'cbv.blockchain': { $in: input.blockchain },
		}, {
			noCursorTimeout: false,
		});

		return find_by_blockchain;
	} catch (error) {
		return error.message;
	}
};

// search by mongodb _id
const mongodb_find_by_id = async (
	inputId: Record<string, string>,
): Promise<MongoCBVSchema | undefined> => {
	try {
		const _id = new mongo.ObjectId(inputId._id);
		const find_by_id = await issues.findOne({ _id: _id }, {
			noCursorTimeout: false,
		});

		return find_by_id;
	} catch (error) {
		return error.message;
	}
};

//
const mongodb_find_all_cbv = async (): Promise<Array<MongoCBVSchema>> => {
	try {
		const find_all = await issues.find({}, { noCursorTimeout: false });
		return find_all.toArray();
	} catch (error) {
		return error.message;
	}
};

// TODO: filter by latest added will require to store timestamps as a number a search for the biggest ones, alternative create a second collection that contains an array of the requiere lenght (i.e. 10), and push / pop in that array on every new save on issues collection

export {
	mongodb_find_all_cbv,
	mongodb_find_by_blockchain,
	mongodb_find_by_cbv_code,
	mongodb_find_by_id,
	mongodb_find_with_labels,
	mongodb_store_cbv,
};
