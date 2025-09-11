import express, { json } from "express";

class App {
  constructor() {
    this.app = express;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {}
}

//exporta a classe já instanciada, neste caso exporta o express (que é o app)
export default new App().app;
