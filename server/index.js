const app = require('./app');
const config = require('./config');

if (require.main === module) {
  app.listen(config.port);
  console.log("Server listening on ", config.port);
}
