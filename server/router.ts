import { Server } from 'hapi';

export default function setRoutes(server: Server): void {
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return {

            };
        }
    });
}
