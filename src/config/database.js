require("dotenv").config();

// Para Windows, às vezes localhost não resolve
const host = process.env.DB_HOST || "127.0.0.1";
const port = process.env.DB_PORT || 5432;
const username = process.env.DB_USER || "api_user";
const password = process.env.DB_PASS || "bmartins";
const database = process.env.DB_NAME || "api_rest_dev";

module.exports = {
  dialect: "postgres",
  host,
  port,
  username,
  password,
  database,

  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },

  dialectOptions: {
    // SSL apenas em produção
    ssl:
      process.env.NODE_ENV === "production"
        ? {
            require: true,
            rejectUnauthorized: false,
          }
        : false,

    // Timezone
    timezone: "America/Sao_Paulo",
  },

  timezone: "America/Sao_Paulo",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  // Log apenas em desenvolvimento
  logging:
    process.env.NODE_ENV === "development"
      ? (msg) => console.log("🐘 PostgreSQL:", msg)
      : false,
};
