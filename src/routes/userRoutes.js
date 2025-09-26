import { Router } from "express";
import userController from "../controllers/UserController";
import loginRequired from "../middlewares/loginRequired";

const router = Router();

//ilustrativas - não são rotas usadas numa aplicação real
//router.get("/", loginRequired, userController.index);
//router.get("/:id", userController.show);

//rotas reais (seguras)
router.post("/", userController.store);
router.put("/", loginRequired, userController.update);
router.delete("/", loginRequired, userController.delete);

export default router;

/*
Boas práticas de controllers:
-max 5 métodos
-index -> lista todos usuários -> GET
-store/create -> cria novo usuário -> POST
-delete -> apaga um usuário -> DELETE
-show -> mostra um usuário -> GET
-update -> atualiza um usuário -> PATCH/PUT
*/
