import { makeExecutableSchema, serve, serveDir, withCors } from 'deps';
import { GraphQLHTTP } from './src/helpers/graphql_http.ts';

import { ENVIRONMENT } from 'environment';
import { resolvers } from './src/graphql/resolvers.ts';
import { typeDefs } from './src/graphql/typedef.ts';

// dev log while running server
const hostname = ENVIRONMENT.URL;
const port = Number(ENVIRONMENT.PORT);

if (ENVIRONMENT.PROD != 'prod') {
	console.log(`Server running`);
	console.log(
		`GraphQL documentation: ${hostname}:${port}`,
	);
	console.log(
		`GraphQL playground: ${hostname}:${port}/graphql`,
	);
}
// server
async function handler(request: Request) {
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
}

withCors(() => new Response(), {
	allowOrigin: '*',
}); /*
withCors(() => new Response(), {
  allowOrigin: (context) => {
    const origin = context.request.headers.get("origin")!;
    return /https?:\/\/api.test.test/.test(origin) ? origin : "null";
  },
});
*/

await serve(withCors(handler));
