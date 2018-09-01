import { Request, RequestQuery, Server } from 'hapi';
import R from 'ramda';

import { pathToString } from '../util';
import { getWords, solve } from './lib/solver';

/* tslint:disable-next-line:no-var-requires */
const dictionary: { words: string[] } = require('../files/dictionary.json');

export default function setRoutes(server: Server): void {
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.file('index.html');
        },
    });
    ['index.html', 'bundle.js', 'main.css'].map((path) => {
        server.route({
            method: 'GET',
            path: `/${path}`,
            handler: (request, h) => {
                return h.file(path);
            },
        });
    });

    server.route({
        method: 'GET',
        path: '/api',
        handler: (request, h) => {
            return {
                links: {
                    'start-game': `${getBaseUrlFromReq(request)}/boards`,
                },
            };
        },
    });
    server.route({
        method: 'POST',
        path: '/api/boards',
        handler: (request, h) => {
            const board = 'TAP*EAKSOBRSS*XD';
            const links = {
                'validate-word': `${getBaseUrlFromReq(request)}/boards/${board}`,
                'get-solution': `${getBaseUrlFromReq(request)}/boards/${board}/solution`,
            };
            return { board, links };
        },
    });
    server.route({
        method: 'GET',
        path: '/api/boards/{board}/solution',
        handler: (request, h) => {
            const { board } = request.params;
            const solution = solve(dictionary.words, board);
            return { board, words: solution };
        },
    });
    server.route({
        method: 'GET',
        path: '/api/boards/{board}',
        handler: (request, h) => {
            const { board } = request.params;
            const path = getPathFromReq(request);
            const attempt = pathToString(board, path);
            const candidateWords = dictionary.words.filter(word => word.length === attempt.length);
            const words = getWords(candidateWords, attempt);
            return { attempt, board, words };
        },
    });
}

function getPathFromReq(request: Request): number[] {
    let { path } = request.query as RequestQuery;
    if (typeof path === 'string') {
        path = path.split(',');
    }
    return R.map(el => parseInt(el, 10), path);
}

function getBaseUrlFromReq(request: Request): string {
    return `${request.headers['x-forwarded-proto'] || 'http'}://${request.info.host}/api`
}
