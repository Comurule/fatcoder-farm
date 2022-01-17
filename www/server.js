const http = require('http');
const app = require('../src');
const logger = require('../src/utils/logger');


const server = http.createServer(app);

//App listens
const port = process.env.PORT || 8081;
server.listen(port, () => { logger.info(`Listening on PORT: ${port}`); });