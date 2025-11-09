const app = require("./src/app");
const connection = require("./src/database");

const port = process.env.PORT || 3001;

async function startServer() {
  try {
    console.log(" Iniciando servidor...");
    console.log(" Environment:", process.env.NODE_ENV || "development");
    console.log(" Database Config:", {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
    });

    console.log(" Testando conexão com PostgreSQL...");
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout de Conexão")), 10000)
    );

    await Promise.race([connection.authenticate(), timeoutPromise]);
    console.log("PostgreSQL conectado com sucesso.");

    //Sincroniza os models ambiente dev
    if ((process.env.NODE_ENV = "development")) {
      console.log("Sincronizando models...");
      await connection.sync();
      console.log("Models sincronizados");
    }

    app.listen(port, () => {
      console.log();
      console.log(` Servidor rodando na porta ${port}`);
      console.log(` Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(` Database: PostgreSQL`);
      console.log(` URL: http://localhost:${port}`);
      console.log();
    });
  } catch (error) {
    console.error(" Erro ao inicializar servidor:");
    console.error(" Message:", error.message);
    console.error(" Code:", error.code);
    console.error(" Stack:", error.stack);
    process.exit(1);
  }
}

//Caputra sinais de finalização
process.on("SIGTERM", async () => {
  console.log("SIGTERM recebido, finalizando servidor...");
  await connection.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT recebido, finalizando servidor...");
  await connection.close();
  process.exit(0);
});

startServer();
