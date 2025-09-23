import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: "",
          //sequelize utiliza o validator por baixo dos panos
          validate: {
            len: {
              args: [3, 255],
              msg: "Campo NOME deve ter entre 3 e 255 caracteres.",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            msg: "E-mail já cadastrado",
          },
          //sequelize utiliza o validator por baixo dos panos
          validate: {
            isEmail: {
              msg: "E-mail inválido.",
            },
          },
        },
        password_hash: Sequelize.STRING,
        //cria um campo que não existe na base de dados
        //recebe a senha do user e trabalha no hash posteriormente
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: "",
          //sequelize utiliza o validator por baixo dos panos
          validate: {
            len: {
              args: [6, 50],
              msg: "A senha precisa ter entre 6 e 50 caracteres.",
            },
          },
        },
      },
      {
        sequelize,
      }
    );
    this.addHook("beforeSave", async (user) => {
      user.password_hash = await bcrypt.hash(user.password, 8);
    });

    return this;
  }

  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }
}
