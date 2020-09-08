import http from 'http';
import querystring from './utilities/querystring';
import type { IncomingHttpHeaders, IncomingMessage } from "http";
import type { ParsedUrlQueryInput } from 'querystring';
import type { Unit, VERB } from './definition';

export default (headers: IncomingHttpHeaders) => ({
    post: (url: string, body: object, method: VERB = 'POST'): Promise<IncomingHttpHeaders> => {
        let hrstart = process.hrtime();
        return new Promise((pass, fail) => {
            const request = http.request({
                host: process.env.UNIT_SERVER_HOST,
                port: process.env.UNIT_SERVER_PORT || 80,
                path: url,
                headers: headers,
                method: method,
            }, (response: IncomingMessage) => {
                let body = '';
                response.setEncoding('utf8');
                response.on('data', chunk => body += chunk);
                response.on('end', () => {
                    let hrend = process.hrtime(hrstart);
                    switch (response.statusCode) {
                        case 200:
                        case 201:
                        case 204:
                            console.info(`${method} [${url}] > ${response.statusCode} | %ds %dms`, hrend[0], hrend[1] / 1000000);
                            pass(response.headers);
                            break;
                        case 401:
                            console.info(`${method} [${url}] > ${response.statusCode} | %ds %dms`, hrend[0], hrend[1] / 1000000);
                            fail(new Error('401 Unauthorized'));
                            break;
                        case 403:
                            console.info(`${method} [${url}] > ${response.statusCode} | %ds %dms`, hrend[0], hrend[1] / 1000000);
                            fail(new Error('403 Forbidden'));
                            break;
                        default:
                            console.info(`${method} [${url}] > ${response.statusCode} | %ds %dms`, hrend[0], hrend[1] / 1000000);
                            try {
                                Boolean(body) && console.error(
                                    response.statusCode,
                                    JSON.parse(body),
                                    response.headers
                                );
                                Boolean(body) && fail(new Error(JSON.parse(body).message));
                                !Boolean(body) && fail(new Error((response.statusCode || 0).toString()));
                            } catch (e) {
                                console.error(e, body);
                                fail(new Error(e.message || 'Server Error'));
                            }
                            break;
                    }
                });
            });
            request.on('error', error => fail(error.message));
            request.write(querystring(body as ParsedUrlQueryInput));
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
                    let hrend = process.hrtime(hrstart);
                    switch (response.statusCode) {
                        case 200:
                        case 204:
                            console.info(`GET [${url}] > ${response.statusCode} | %ds %dms`, hrend[0], hrend[1] / 1000000);
                            try {
                                pass(JSON.parse(body));
                            } catch (e) {
                                console.error(e, body);
                                fail(new Error(e.message));
                            }
                            break;
                        case 401:
                            console.info(`GET [${url}] > ${response.statusCode} | %ds %dms`, hrend[0], hrend[1] / 1000000);
                            fail(new Error('401 Unauthorized'));
                            break;
                        case 403:
                            console.info(`GET [${url}] > ${response.statusCode} | %ds %dms`, hrend[0], hrend[1] / 1000000);
                            fail(new Error('403 Forbidden'));
                            break;
                        default:
                            try {
                                let hrend = process.hrtime(hrstart);
                                console.info(`GET [${url}] > ${response.statusCode} | %ds %dms`, hrend[0], hrend[1] / 1000000);
                                Boolean(body) && console.error(
                                    response.statusCode,
                                    JSON.parse(body),
                                    response.headers
                                );
                                Boolean(body) && fail(new Error(JSON.parse(body).message));
                                !Boolean(body) && fail(new Error((response.statusCode || 0).toString()));
                            } catch (e) {
                                console.error(e, body);
                                fail(new Error(e.message || 'Server Error'));
                            }
                            break;
                    }
                });
            });
            request.on('error', error => fail(error.message));
            request.end();
        });
    }
});
