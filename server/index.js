const app = require('./app');
const config = require('./config');

if (require.main === module) {
  app.listen(config.port);
}

module.exports = { connect };
