var dao = require('db/dao');

var dao = require('db/dao');

//create a DAO from configuration
var customers = dao.create({
  "dbName": "CUSTOMERS",
  "properties": [{
      "name": "id",
      "dbName": "ID",
      "type": "BIGINT",
      "id": true
    }, {
      "name": "orgName",
      "dbName": "ORG_NAME",
      "type": "VARCHAR",
      "required": true
    },{
      "name": "employeesNumber",
      "dbName": "ORG_EMP_NUM",
      "type": "INTEGER",
      "required": true
   },{
      "name": "orgDescription",
      "dbName": "ORG_DESCR",
      "type": "VARCHAR",
      "required": false
   }]
});

//Create CUSTOMERS table
customers.createTable();