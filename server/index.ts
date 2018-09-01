import Hapi from 'hapi';
import setRoutes from './router';

const server = new Hapi.Server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    routes: {
        cors: true,
    },
});

setRoutes(server);

const init = async () => {
    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: false,
            logEvents: ['response']
        }
    });
    await server.register(require('inert'));
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
