require("dotenv").config();

module.exports = {
  dialect: "postgres",
  host: process.env.DATABASE_URL,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === "production"
        ? {
            require: true,
            rejectUnauthorized: false,
          }
        : false,
    timezone: "America/Sao_Paulo",
  },
  timezone: "America/Sao_Paulo",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  loggin: process.env.NODE_ENV === "development" ? console.log : false,
};
