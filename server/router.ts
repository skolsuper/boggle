import { Server } from 'hapi';

export default function setRoutes(server: Server): void {
    const apiBaseUrl = server.info.uri;
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
        path: '/api/',
        handler: (request, h) => {
            return {
                links: {
                    'start-game': `${apiBaseUrl}/boards`,
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
                'validate-word': `${apiBaseUrl}/boards/${board}/{path}`,
                'get-solution': `${apiBaseUrl}/boards/${board}`,
            };
            return { board, links };
        },
    });
}
