import Hapi from 'hapi';
import setRoutes from './router';

const server = new Hapi.Server({
    port: 3000,
    host: '0.0.0.0',
});

const init = async () => {
    setRoutes(server);
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
