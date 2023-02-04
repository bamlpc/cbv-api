import { CBV } from 'schemas';
import {
	mongodb_find_all_cbv,
	mongodb_find_by_blockchain,
	mongodb_find_by_cbv_code,
	mongodb_find_by_id,
	mongodb_find_by_latest,
	mongodb_find_for_home_page,
	mongodb_find_report_data,
	mongodb_find_with_search_string,
	mongodb_find_with_time_frame,
} from '../mongodb/methods.ts';
import { store_cbv_with_credentials } from '../helpers/graphql_post_handler.ts';

const resolvers = {
	Query: {
		find_all_cbv: () => mongodb_find_all_cbv(),
		find_report_data: () => mongodb_find_report_data(),
		// deno-lint-ignore no-explicit-any
		find_by_latest: (_root: any, args: Record<string, string>) =>
			mongodb_find_by_latest(args),
		// deno-lint-ignore no-explicit-any
		find_by_search_string: (_root: any, args: Record<string, string>) =>
			mongodb_find_with_search_string(args),
		// deno-lint-ignore no-explicit-any
		find_by_id: (_root: any, args: Record<string, string>) =>
			mongodb_find_by_id(args),
		// deno-lint-ignore no-explicit-any
		find_by_blockchain: (_root: any, args: Record<string, string[]>) =>
			mongodb_find_by_blockchain(args),
		// deno-lint-ignore no-explicit-any
		find_by_cbv_code: (_root: any, args: Record<string, string>) =>
			mongodb_find_by_cbv_code(args),
		find_with_time_frame: (
			// deno-lint-ignore no-explicit-any
			_root: any,
			args: Record<string, Record<string, number>>,
		) => mongodb_find_with_time_frame(args),
		find_for_home_page: (
			// deno-lint-ignore no-explicit-any
			_root: any,
			args: Record<string, Record<string, number>>,
		) => mongodb_find_for_home_page(args),
	},
	Mutation: {
		// deno-lint-ignore no-explicit-any
		store_cbv: (_root: any, args: Record<string, CBV>) =>
			store_cbv_with_credentials(args),
	},
};

export { resolvers };
