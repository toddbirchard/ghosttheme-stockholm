//github.js

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'a9tw3rjw',
  database: 'github_repos'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'a9tw3rjw',
  database: 'github_repos'
});

con.query('SELECT * FROM githubrepos', (err,rows) => {
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);
});
