//token no headers para que o usuário se mantenha autenticado com o token
import jwt from "jsonwebtoken";
import User from "../models/User";

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ["Login required."],
    });
  }

  const [, token] = authorization.split(" ");
  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ["Usuário inválido."],
      });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return res.status(401).json({
      errors: ["Token inválido ou expirado."],
    });
  }
};
