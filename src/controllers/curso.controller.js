import { Router } from "express";
import {
    listarCursos,
    adicionarCurso,
    atualizarCurso,
    deletarCurso
} from "../services/curso.service.js";
import authenticationMiddleware from "../middlewares/auth.middleware.js";
import { cursoSchema } from "../utils/schemaValidation.js";
const cursoRoutes = Router();

//rota para listar cursos 
cursoRoutes.get("/:nome", authenticationMiddleware, async (req, res) => {
    const curso = await listarCursos();
    return res.status(200).json(curso);
});

//rota pra criar curso
cursoRoutes.post("/", authenticationMiddleware, async (req, res) => {
    const { error } = await cursoSchema.validate(req.body);
    if (error) {
        throw { status: 401, message: error.message };
    }
    const cursoCreated = await adicionarCurso(req.body);

    return req.status(200).json(cursoCreated);
});

//atualizar curso
cursoRoutes.put("/:id", authenticationMiddleware, async (req, res) => {
    const { id } = req.params;
    const { error } = await cursoSchema.validate(req.body);
    if (error) {
        throw { status: 401, message: error.message };
    }

    const cursoUpdated = await atualizarCurso(id, req.body);
    return res.status(200).json(cursoUpdated);
});

//deletar curso
cursoRoutes.delete("/:id", authenticationMiddleware, async (req, res) => {
    const { id } = req.params;
    const cursoDeleted = await deletarCurso(id);
    return res.status(200).json(cursoDeleted);
});

export default cursoRoutes;