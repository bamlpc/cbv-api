// A place to store all dependent URLs

//Standar library modules bellow
export { configSync } from 'std/dotenv/mod.ts';
export * as http from 'std/http/mod.ts';
export * as dotenv from 'std/dotenv/mod.ts';
export { serve, Server } from 'std/http/server.ts';
export { serveDir, serveFile } from 'std/http/file_server.ts';
export { KeyStack } from 'std/crypto/mod.ts';

//Third party modules bellow

export * as mongo from 'third/mongo@v0.31.1/mod.ts';
export { gql } from 'third/graphql_tag@0.0.1/mod.ts';
export { GraphQLHTTP } from 'third/gql@1.1.0/mod.ts';
export { makeExecutableSchema } from 'third/graphql_tools@0.0.2/mod.ts';
