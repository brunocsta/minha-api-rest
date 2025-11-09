import Aluno from "../models/Aluno";
import Foto from "../models/Fotos";

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: [
        "id",
        "nome",
        "sobrenome",
        "email",
        "idade",
        "peso",
        "altura",
      ],
      order: [
        ["id", "DESC"],
        [Foto, "id", "DESC"],
      ],
      include: {
        model: Foto,
        attributes: ["url", "filename"],
      },
    });
    res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        error: e.message || e.parent?.details,
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["Missing ID."],
        });
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: [
          "id",
          "nome",
          "sobrenome",
          "email",
          "idade",
          "peso",
          "altura",
        ],
        order: [
          ["id", "DESC"],
          [Foto, "id", "DESC"],
        ],
        include: {
          model: Foto,
          attributes: ["url", "filename"],
        },
      });

      if (!aluno) {
        return res.status(400).json({
          errors: ["Aluno não encontrado."],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        error: e.message || e.parent?.detail,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params.id;

      if (!id) {
        return res.status(400).json({
          errors: ["Missing ID."],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ["Aluno não encontrado."],
        });
      }

      const alunoAtualizado = await aluno.update(req.body);

      return res.json(alunoAtualizado);
    } catch (e) {
      return res.status(400).json({
        error: e.message || e.parent?.detail,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["Missing ID."],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ["Aluno não encontrado."],
        });
      }

      await aluno.destroy();

      return res.json({
        apagado: true,
      });
    } catch (e) {
      return res.status(400).json({
        error: e.message || e.parent?.detail,
      });
    }
  }
}

export default new AlunoController();
