import type { IncomingMessage, ServerResponse } from 'http';
import { graphql } from 'graphql';
import schema from './schema';
import client from './client';

export default (request: IncomingMessage, response: ServerResponse) => {
    if (request.method !== 'POST') {
        response.statusCode = 204;
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return response.end();
    }
    let body = '';
    request.on('data', (data) => {
        body += data;
        if (body.length > 1e6) request.connection.destroy();
    });

    request.on('error', (error) => {
        console.error(error);
    })

    request.on('end', () => {
        const json = JSON.parse(body);
        graphql(
            schema,
            json.query,
            null,
            { client: client({
                connection: 'keep-alive',
                authorization: request.headers.authorization || '',
                'x-transaction': request.headers['x-transaction'] || '',
            })},
            json.variables,
            json.operationName
        ).then(result => {
            const chunk = Buffer.from(JSON.stringify(result, undefined, 4), 'utf8');
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Allow', 'POST');
            response.setHeader('Content-Type', 'application/json' + '; charset=utf-8');
            response.setHeader('Content-Length', String(chunk.length));
            response.end(chunk);
        }).catch(error => {
            console.error(error);
            response.end(error);
        });

    });
}
