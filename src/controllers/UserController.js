import User from "../models/User";

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      res.json(novoUser);
    } catch (e) {
      console.log(e);
      res.status(400).json({
        //tirando a mensagem do objeto de erro gerado
        error: e.message || e.parent?.detail,
      });
    }
  }
}

export default new UserController();
