import { Router } from "express";
import alunoController from "../controllers/AlunoController";

const router = Router();

router.get("/", alunoController.index);

export default router;
