const client = require('./db-connect.js');

const runQuery = (str, values) => {
  return client.query(str, values)
          .then((res) => res)
          .catch((err) => err);
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

  deleteAllTableRows(table) {
    return runQuery(`DELETE FROM ${table}`);
  }

  query(str, values) {
    return runQuery(str, values);
  }

  insertRow(table, valuesTemplate, values) {
    return runQuery(`INSERT INTO ${table} VALUES(${valuesTemplate})`, values);
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
