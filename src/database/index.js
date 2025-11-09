const Sequelize = require("sequelize");
const databaseConfig = require("../config/database");

const Aluno = require("../models/Aluno");
const User = require("../models/User");
const Foto = require("../models/Fotos");

const models = [Aluno, User, Foto];
const connection = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    port: databaseConfig.port,
    dialect: databaseConfig.dialect,
    define: databaseConfig.define,
    dialectOptions: databaseConfig.dialectOptions,
    timezone: databaseConfig.timezone,
    pool: databaseConfig.pool,
    logging: databaseConfig.logging,
  }
);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);

module.exports = connection;
