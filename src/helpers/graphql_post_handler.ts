import { mongodb_store_cbv } from '../mongodb/methods.ts';
import { CBV } from 'schemas';
import { API_KEY } from 'environment';
import { KeyStack } from 'deps';


async function store_cbv_with_credentials(args: Record<string, CBV>): Promise<string | Error> {
	const keyStack = new KeyStack([API_KEY[0]]);
	const foreign_api_key = args.cbv.api_key!;

	const authorized = await keyStack.verify(API_KEY[1], foreign_api_key)

	if (!authorized) {
		return Error('Unauthorized');
	}

	return await mongodb_store_cbv(args);
}

export { store_cbv_with_credentials };
