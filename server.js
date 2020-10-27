require('dotenv').config();
const customExpress = require('./custom-express/config.js');
const app = customExpress();
const conn = require('./database/conn.js');
const Tables = require('./database/Tables.js');

conn.connect(error => {
  if (error) {
    console.log('Error to try to connect with database!');
  }
  Tables.init(conn);
  app.listen(3000, () => { console.log('Server listening on port 3000') });
});
