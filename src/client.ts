import http from 'http';
import querystring from 'querystring';
import type { IncomingHttpHeaders, IncomingMessage } from "http";
import type { ParsedUrlQueryInput } from 'querystring';
import type { Unit } from './definition';

export default (headers: IncomingHttpHeaders) => ({
    post: (url: string, body: object): Promise<IncomingHttpHeaders> => {
        return new Promise((pass, fail) => {
            const request = http.request({
                host: process.env.UNIT_SERVER_HOST,
                port: process.env.UNIT_SERVER_PORT || 80,
                path: url,
                headers: headers,
                method: 'POST',
            }, (response: IncomingMessage) => {
                let body = '';
                response.setEncoding('utf8');
                response.on('data', chunk => body += chunk);
                response.on('end', () => {
                    if ((response.statusCode as number) > 299) {
                        Boolean(body) && console.error(
                            response.statusCode,
                            JSON.parse(body),
                            response.headers
                        );
                        Boolean(body) && fail(new Error(JSON.parse(body).message));
                        !Boolean(body) && fail(new Error((response.statusCode || 0).toString()));
                    } else {
                        pass(response.headers);
                    }
                });
            });
            request.on('error', error => fail(error.message));
            const postData = querystring.stringify(body as ParsedUrlQueryInput);
            request.write(postData);
            request.end();
        });
    },
    fetch: (url: string): Promise<Unit | ReadonlyArray<Unit>> => {
        let hrstart = process.hrtime();
        return new Promise((pass, fail) => {
            const request = http.request({
                host: process.env.UNIT_SERVER_HOST,
                port: process.env.UNIT_SERVER_PORT || 80,
                path: url,
                headers: headers,
                method: 'GET',
            }, (response: IncomingMessage) => {
                let body = '';
                response.setEncoding('utf8');
                response.on('data', chunk => body += chunk);
                response.on('end', () => {
                    if ((response.statusCode as number) > 299) {
                        Boolean(body) && console.error(
                            response.statusCode,
                            JSON.parse(body),
                            response.headers
                        );
                        Boolean(body) && fail(new Error(JSON.parse(body).message));
                        !Boolean(body) && fail(new Error((response.statusCode || 0).toString()));
                    } else {
                        let hrend = process.hrtime(hrstart);
                        console.info(url + " fetch: %ds %dms", hrend[0], hrend[1] / 1000000);
                        pass(JSON.parse(body));
                    }
                });
            });
            request.on('error', error => fail(error.message));
            request.end();
        });
    }
})
