const { Client } = require("pg");
require("dotenv").config();

async function testConnection() {
  console.log(" Testando conexão PostgreSQL...\n");
  console.log(" Configurações:");
  console.log("URL:", process.env.DATABASE_URL);
  console.log("Host:", process.env.DB_HOST);
  console.log("Port:", process.env.DB_PORT);
  console.log("Database:", process.env.DB_NAME);
  console.log("User:", process.env.DB_USER);
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log();

  const client = new Client({
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "api_rest_dev",
    user: process.env.DB_USER || "api_user",
    password: process.env.DB_PASS || "bmartins",
  });

  try {
    await client.connect();
    console.log("Conexõ com PostgreSQL estabelecida com sucesso.");

    //teste de query
    const result = await client.query("SELECT version()");
    console.log(
      "Versão PostgreSQL: ",
      result.rows[0].version.split(" ")[0],
      result.rows[0].version.split(" ")[1]
    );

    // Teste de permissões
    await client.query(
      "CREATE TABLE IF NOT EXISTS test_permissions (id SERIAL PRIMARY KEY);"
    );
    await client.query("DROP TABLE IF EXISTS test_permissions;");
    console.log(" Permissões do schema public: OK");

    console.log(" Teste concluído com sucesso!");
  } catch (error) {
    console.error(" Erro na conexão:", error.message);
    if (error.message.includes("permission denied")) {
      console.log(
        "\n  SOLUÇÃO: Execute este comando para corrigir permissões:"
      );
      console.log(
        'psql -U postgres -d api_rest_dev -c "GRANT ALL ON SCHEMA public TO api_user;"'
      );
    }
  } finally {
    await client.end();
  }
}

testConnection();
