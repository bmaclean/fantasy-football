const client = require('./db-connect.js');

const runQuery = (str, values) => {
  return client.query(str, values)
          .then((res) => console.log(res))
          .catch((err) => console.log(`${JSON.stringify(err)}`));
}

class Manager {

  // singleton
  constructor() {
    if (!Manager.instance) {
      Manager.instance = this;
    }
    return Manager.instance;
  }

  createTable(str) {
    return runQuery(str, undefined);
  }

  dropTable(name) {
    return runQuery(`DROP TABLE ${name}`);
  }

  query(str, values) {
    // STUB
    return runQuery(str, values);
  }

  insert(str) {
    // STUB
    // inserts row into table
  }

  closeConnection() {
    client.end((err) => {
      console.log('client has disconnected')
      if (err) {
        console.log(`${JSON.stringify(err)}`)
      }
    })
  }

}

// the single instance
const manager = new Manager();
Object.freeze(manager);

module.exports = manager;
