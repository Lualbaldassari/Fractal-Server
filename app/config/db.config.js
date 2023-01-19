module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "panzerfaust12345",
  DB: "myproject",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
