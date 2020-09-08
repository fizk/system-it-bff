import http from 'http';
// import { printSchema } from 'graphql';
// import schema from './schema';
import requestListener from './requestListener';

const port = process.env.SERVER_PORT || 8080;

console.log('GraphQL server starting up\n');
// console.log(printSchema(schema));

http.createServer(requestListener).listen(port, () => console.log(`Server started on ${port}`));
