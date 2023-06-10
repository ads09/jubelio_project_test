'use strict';

const Hapi = require('@hapi/hapi');

const routes = require('./routes/routes');

// const server = Hapi.server({
//   port: 3000,
//   host: 'localhost',
// });

// server.route(routes);

// async function startServer() {
//   try {
//     await server.start();
//     console.log('Server running at: ', server.info.uri);
//   } catch(err) {
//     console.log('Error starting server: ', err);
//   }
// }
const init = async () => {

  const server = Hapi.server({
      port: 3000,
      host: 'localhost'
  });

  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();

// startServer();