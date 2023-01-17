import { Application, makeExecutableSchema, oakCors, Router, send } from 'deps';
import { GraphQLHTTP } from './src/helpers/graphql_http.ts';

import { ENVIRONMENT } from 'environment';
import { resolvers } from './src/graphql/resolvers.ts';
import { typeDefs } from './src/graphql/typedef.ts';


const books = new Map<string, any>();
books.set("1", {
  id: "1",
  title: "Frankenstein",
  author: "Mary Shelley",
});

const router = new Router();
router
  .get("/", async (context) => {
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}/src/graphql/documentation/public`,
      index: "index.html",
    });
  })
  .get("/graphql", async (context) => {
		const graphql = await GraphQLHTTP<Request>({
			schema: makeExecutableSchema({ resolvers, typeDefs }),
			graphiql: true,
		})(context.request);
    context.response = graphql
  })
  .redirect("/*", "/");

const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());

if (ENVIRONMENT.PROD != 'prod') {
	console.log(`Server running`);
	console.log(
		`GraphQL documentation: http://${ENVIRONMENT.URL}:${ENVIRONMENT.PORT}`,
	);
	console.log(
		`GraphQL playground: http://${ENVIRONMENT.URL}:${ENVIRONMENT.PORT}/graphql`,
	);
}
await app.listen({ port: ENVIRONMENT.PORT });
