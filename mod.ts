import { makeExecutableSchema, serveDir, Server } from 'deps';
import { GraphQLHTTP } from './src/helpers/graphql_http.ts';

import { ENVIRONMENT } from 'environment';
import { resolvers } from './src/graphql/resolvers.ts';
import { typeDefs } from './src/graphql/typedef.ts';

const handler = async (request: Request) => {
	const { pathname } = new URL(request.url);

	if (pathname === '/graphql') {
		const graphql = await GraphQLHTTP<Request>({
			schema: makeExecutableSchema({ resolvers, typeDefs }),
			graphiql: true,
		})(request);
		return graphql;
	} else {
		const static_root = './src/graphql/documentation/public';
		const _static = serveDir(request, {
			fsRoot: static_root,
		});
		return _static;
	}
};
const hostname = ENVIRONMENT.URL;
const port = Number(ENVIRONMENT.PORT);
const server = new Server({ hostname, port, handler });
await server.listenAndServe();
