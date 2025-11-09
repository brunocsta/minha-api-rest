const { Cliente } = require("pg");
require("dotenv").config();

//fix de permissões PostgreSQL v15+
async function fixPermissions() {
  const superClient = new Client({
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "api_rest_dev",
    username: "postgres", // Superuser
    password: process.env.POSTGRES_PASSWORD || "bmartins30",
  });
  try {
    console.log(" Conectando como superuser...");
    await superClient.connect();

    console.log("Concedendo permissões ao usuário api_user...");

    const queries = [
      "GRANT ALL ON SCHEMA public TO api_user;",
      "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO api_user;",
      "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO api_user;",
      "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO api_user;",
      "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO api_user;",
    ];

    for (const query of queries) {
      await superClient.query(query);
      console.log("✅", query);
    }

    console.log("Permissões concedidas com sucesso!");
  } catch (error) {
    console.error("Erro:", error.message);
    console.log("\n SOLUÇÃO MANUAL:");
    console.log(
      'psql -U postgres -d api_rest_dev -c "GRANT ALL ON SCHEMA public TO api_user;"'
    );
  } finally {
    await superClient.end();
  }

  // tsta com o usuário api_user
  const userClient = new Client({
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "api_rest_dev",
    username: "api_user",
    password: "bmartins",
  });

  try {
    console.log(" Testando permissões...");
    await userClient.connect();

    await userClient.query(
      "CREATE TABLE IF NOT EXISTS test_permissions (id SERIAL PRIMARY KEY);"
    );
    await userClient.query("DROP TABLE IF EXISTS test_permissions;");

    console.log("Teste de permissões passou!");
  } catch (error) {
    console.error(" Teste falhou:", error.message);
  } finally {
    await userClient.end();
  }
}

fixPermissions();
