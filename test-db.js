const { Sequelize } = require("sequelize");
require("dotenv").config();

async function testConnection() {
  console.log("🧪 Testando conexão PostgreSQL...\n");
  console.log("📋 Configurações:");
  console.log("URL:", process.env.DATABASE_URL);
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log();

  try {
    const sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl:
          process.env.NODE_ENV === "production"
            ? {
                require: true,
                rejectUnauthorized: false,
              }
            : false,
      },
      logging: console.log,
    });

    await sequelize.authenticate();
    console.log("✅ Conexão PostgreSQL estabelecida com sucesso!");

    // Teste de query
    const [results, metadata] = await sequelize.query("SELECT version()");
    console.log("🐘 Versão PostgreSQL:", results[0].version);

    await sequelize.close();
    console.log("✅ Teste concluído com sucesso!");
  } catch (error) {
    console.error("❌ Erro na conexão:", error.message);
    console.error("📋 Detalhes:", error);
  }
}

testConnection();
