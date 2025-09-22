import Aluno from "../models/Aluno";

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: "Dandara",
      sobrenome: "Martins",
      email: "dandara@gmail.com",
      idade: 17,
      peso: 58,
      altura: 1.6,
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
