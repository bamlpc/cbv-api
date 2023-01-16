import { makeExecutableSchema, serveDir, Server, withCors } from 'deps';
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

const handlerWithCorse = withCors(handler)
const hostname = ENVIRONMENT.URL;
const port = Number(ENVIRONMENT.PORT);
const server = new Server({ hostname, port, handler});
if (ENVIRONMENT.PROD != 'prod') {
	console.log(`Server running`);
	console.log(
		`GraphQL documentation: http://${ENVIRONMENT.URL}:${ENVIRONMENT.PORT}`,
	);
	console.log(
		`GraphQL playground: http://${ENVIRONMENT.URL}:${ENVIRONMENT.PORT}/graphql`,
	);
}
await server.listenAndServe();
