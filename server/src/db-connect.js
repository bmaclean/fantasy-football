const pg = require('pg');

const client = new pg.Client();

const initClient = async () => {
  try {
    await client.connect();
    console.log(client.connectionParameters);
  } catch (err) {
    console.log(err);
  }
}
initClient();
module.exports = client;
