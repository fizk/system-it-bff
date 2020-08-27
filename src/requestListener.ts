import type { IncomingMessage, ServerResponse } from 'http';
import { graphql } from 'graphql';
import schema from './schema';
import client from './client';

export default (request: IncomingMessage, response: ServerResponse) => {
    let body = '';
    request.on('data', function (data) {
        body += data;
        if (body.length > 1e6) request.connection.destroy();
    });

    request.on('end', function () {
        const json = JSON.parse(body);
        graphql(
            schema,
            json.query,
            json.variables,
            { client: client({
                connection: 'keep-alive',
                authorization: request.headers.authorization || '',
                'x-transaction': request.headers['x-transaction'] || '',
            }) }
        ).then(result => {
            const chunk = Buffer.from(JSON.stringify(result, undefined, 4), 'utf8');
            response.setHeader('Content-Type', 'application/json' + '; charset=utf-8');
            response.setHeader('Content-Length', String(chunk.length));
            response.end(chunk);
        }).catch(error => {
            console.error(error);
            response.end(error);
        });
    });
}
