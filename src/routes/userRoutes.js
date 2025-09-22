import { Router } from "express";
import userController from "../controllers/UserController";

const router = Router();

router.post("/", userController.store);

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
