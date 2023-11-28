const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Rinkesh123",
  host: "localhost",
  port: 5432,
  database: "atlan",
});

module.exports = pool;
