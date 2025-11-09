class HomeController {
  async index(req, res) {
    res.jsonres.json({
      message: "API REST - Curso Luiz Otávio Miranda (ADAPTAÇÃO DEPLOY RENDER)",
      version: "1.0.0",
      database: "PostgreSQL",
      deploy: "Render",
      timestamp: new Date().toISOString(),
    });
  }
}

export default new HomeController();
