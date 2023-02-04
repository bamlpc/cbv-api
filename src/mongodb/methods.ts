import { dateFns, mongo } from 'deps';
import { CBV, StoredMongoCBVSchema } from 'schemas';
import { issues } from './helpers/connection.ts';
import { getSeverity } from './helpers/functions.ts';

async function mongodb_store_cbv(store: Record<string, CBV>): Promise<string> {
	const _new = store.cbv;
	const severityString = getSeverity(_new.severity);
	const _store = {
		cbv: {
			title: _new.title,
			short_description: _new.short_description,
			cbv_id: _new.cbv_id,
			blockchain: _new.blockchain,
			version_affected: _new.version_affected,
			component: _new.component,
			severity: severityString,
			score: _new.severity,
			vulnerability_type: _new.vulnerability_type,
			details: _new.details,
			recommendation: _new.recommendation,
			references: _new.references,
			labels: _new.labels,
			tests: _new.tests,
			aditional_comments: _new.aditional_comments,
			credits: _new.credits,
			created_at: _new.created_at,
			updated_at: _new.updated_at,
		},
		timestamp: new Date().getTime(),
	};
	// deno-lint-ignore no-unused-vars
	const { matchedCount, modifiedCount, upsertedId } = await issues.updateOne(
		{ 'cbv.cbv_id': { $in: [store.cbv.cbv_id] } },
		{ $set: _store },
		{ upsert: true },
	);
	return upsertedId!.toString();
}

//
const mongodb_find_by_cbv_code = async (
	cbv_code: Record<string, string>,
): Promise<StoredMongoCBVSchema | undefined> => {
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
): Promise<Array<StoredMongoCBVSchema>> => {
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
): Promise<StoredMongoCBVSchema | undefined> => {
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
): Promise<StoredMongoCBVSchema | undefined> => {
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
const mongodb_find_all_cbv = async (): Promise<Array<StoredMongoCBVSchema>> => {
	try {
		const find_all = await issues.find({}, { noCursorTimeout: false });
		return find_all.toArray();
	} catch (error) {
		return error.message;
	}
};

const mongodb_find_with_search_string = async (
	input: Record<string, string>,
): Promise<Array<StoredMongoCBVSchema>> => {
	try {
		const find_with_search_string = await issues.find({
			$text: { $search: input.search_string },
		}, { noCursorTimeout: false });
		return find_with_search_string.toArray();
	} catch (error) {
		return error.message;
	}
};

const mongodb_find_with_time_frame = async (
	input: Record<string, Record<string, number>>,
): Promise<Array<StoredMongoCBVSchema>> => {
	if (!input.timeframe.start) {
		input.timeframe.start = new Date(2023, 11, 1).getTime();
	}
	if (!input.timeframe.end) input.timeframe.end = new Date().getTime();
	try {
		const find_with_time_frame = await issues.find({
			timestamp: { $gte: input.timeframe.start, $lt: input.timeframe.end },
		}, { noCursorTimeout: false });
		return find_with_time_frame.toArray();
	} catch (error) {
		return error.message;
	}
};

const mongodb_find_by_latest = async (
	input: Record<string, string>,
): Promise<Array<StoredMongoCBVSchema>> => {
	try {
		const find_by_latest = await issues.find({}, { noCursorTimeout: false })
			.limit(Number(input.number)).sort({ $natural: -1 });
		return find_by_latest.toArray();
	} catch (error) {
		return error.message;
	}
};

const mongodb_find_for_home_page = async (
	input: Record<string, Record<string, number>>,
) => {
	try {
		const get_items_with_timeframe = await mongodb_find_with_time_frame(input);
		// blockchain issues count
		const blockchain_new_issues = get_items_with_timeframe.map(
			(item: StoredMongoCBVSchema): string => {
				return item.cbv.blockchain;
			},
		);
		const bc_counts: Record<string, number> = {};
		for (const bc of blockchain_new_issues) {
			bc_counts[bc] = (bc_counts[bc] || 0) + 1;
		}
		// severity issues count
		const severiry_new_issues = get_items_with_timeframe.map(
			(item: StoredMongoCBVSchema): string => {
				return item.cbv.severity;
			},
		);
		const sev_counts: Record<string, number> = {};
		for (const sev of severiry_new_issues) {
			sev_counts[sev] = (sev_counts[sev] || 0) + 1;
		}
		// contributors issues count
		const credits_new_issues = get_items_with_timeframe.map(
			(item: StoredMongoCBVSchema): string => {
				return item.cbv.credits;
			},
		);
		const cred_counts: Record<string, number> = {};
		for (const usr of credits_new_issues) {
			cred_counts[usr] = (cred_counts[usr] || 0) + 1;
		}

		//returning object
		const return_object = {
			blockchains: JSON.stringify(bc_counts),
			severities: JSON.stringify(sev_counts),
			contributors: JSON.stringify(cred_counts),
		};
		return return_object;
	} catch (error) {
		return error.message;
	}
};

// types
type MonthResume = {
	number_of_issues: string;
	average_severity: string;
};
type TotalIssues = [string, number];
const mongodb_find_report_data = async (): Promise<MonthResume[]> => {
	const current_date = new Date();
	const dates = [
		dateFns.subMonths(current_date, 6).getMilliseconds(),
		dateFns.subMonths(current_date, 5).getMilliseconds(),
		dateFns.subMonths(current_date, 4).getMilliseconds(),
		dateFns.subMonths(current_date, 3).getMilliseconds(),
		dateFns.subMonths(current_date, 2).getMilliseconds(),
		dateFns.subMonths(current_date, 1).getMilliseconds(),
	];
	try {
		const get_items_with_timeframe = await issues.find({
			timestamp: { $gte: dates[0] },
		}, { noCursorTimeout: false });

		// blockchain issues count
		const total_issues = get_items_with_timeframe.map(
			(item: StoredMongoCBVSchema): TotalIssues => {
				return [item.cbv.score, item.timestamp];
			},
		);
		const scattered_data = {
			six_months: (await total_issues).filter((item) =>
				item[1] >= dates[0] && item[1] < dates[1]
			),
			five_months: (await total_issues).filter((item) =>
				item[1] >= dates[1] && item[1] < dates[2]
			),
			four_months: (await total_issues).filter((item) =>
				item[1] >= dates[2] && item[1] < dates[3]
			),
			three_months: (await total_issues).filter((item) =>
				item[1] >= dates[3] && item[1] < dates[4]
			),
			two_months: (await total_issues).filter((item) =>
				item[1] >= dates[4] && item[1] < dates[5]
			),
			one_months: (await total_issues).filter((item) => item[1] >= dates[5]),
		};

		const return_array: MonthResume[] = [];
		for (const month in scattered_data) {
			const _month = {
				number_of_issues: (scattered_data[month].length).toString().replace(
					'0',
					'',
				),
				average_severity: (scattered_data[month].map((a: TotalIssues) =>
					Number(a[0])
				).reduce((a: number, b: number) => a + b, 0) /
					scattered_data[month].length).toFixed(2).replace('NaN', ''),
			} as MonthResume;
			return_array.push(_month);
		}

		return return_array;
	} catch (error) {
		return error.message;
	}
};

export {
	mongodb_find_all_cbv,
	mongodb_find_by_blockchain,
	mongodb_find_by_cbv_code,
	mongodb_find_by_id,
	mongodb_find_by_latest,
	mongodb_find_for_home_page,
	mongodb_find_report_data,
	mongodb_find_with_labels,
	mongodb_find_with_search_string,
	mongodb_find_with_time_frame,
	mongodb_store_cbv,
};
