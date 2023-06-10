'use strict';

const Hapi = require('@hapi/hapi');

const transactionRoutes = require('./routes/transactionRoutes');
const productRoutes = require('./routes/productRoutes');
const init = async () => {

  const server = Hapi.server({
      port: 3000,
      host: 'localhost'
  });

  server.route(productRoutes);
  server.route(transactionRoutes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();