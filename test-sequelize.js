const connection = require("./src/database");

async function testSequelize() {
  try {
    console.log("Testando Sequelize... \n");

    //teste de conexão
    await connection.authenticate();
    console.log("Sequelize conectado com sucesso.");

    //teste de sync
    console.log("Testando sync de models...");
    await connection.sync({ force: false });
    console.log("Models sincronizados");

    //teste de query
    const [results] = await connection.query("SELECT version()");
    console.log(
      " PostgreSQL:",
      results[0].version.split(" ")[0],
      results[0].version.split(" ")[1]
    );

    await connection.close();
    console.log("Testes concluídos.");
  } catch (error) {
    console.error(" Erro no Sequelize:", error.message);
    console.error(" Stack:", error.stack);
  }
}

testSequelize();
