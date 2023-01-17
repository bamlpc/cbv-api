import { makeExecutableSchema, serve, serveDir, withCors } from 'deps';
import { GraphQLHTTP } from './src/helpers/graphql_http.ts';

import { ENVIRONMENT } from 'environment';
import { resolvers } from './src/graphql/resolvers.ts';
import { typeDefs } from './src/graphql/typedef.ts';

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
};

withCors(() => new Response(), {
  allowOrigin: "*",
	allowMethods: "GET, POST",
});
withCors(() => new Response(), {
  allowOrigin: (context) => {
    const origin = context.request.headers.get("origin")!;
    return /https?:\/\/api.test.test/.test(origin) ? origin : "null";
  },
});

if (ENVIRONMENT.PROD != 'prod') {
	console.log(`Server running`);
	console.log(
		`GraphQL documentation: http://${ENVIRONMENT.URL}:${ENVIRONMENT.PORT}`,
	);
	console.log(
		`GraphQL playground: http://${ENVIRONMENT.URL}:${ENVIRONMENT.PORT}/graphql`,
	);
}

await serve(withCors(handler))
/*
await server.listenAndServe();
*/