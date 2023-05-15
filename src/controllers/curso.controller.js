import { Router } from "express";
import {
    listarCurso,
    criarCurso,
    atualizarCurso,
    deletarCurso
} from "../services/curso.service";

const cursoRoutes = Router();

//rota para listar cursos 
cursoRoutes.get("/", async (req, res) => {
    const curso = await listarCurso();
    return res.status(200).json(curso);
});

//rota pra criar curso
cursoRoutes.post("/", async (req, res) => {
    // const { error } = await cursoSchema.validade(req.body);
    // if (error) {
    //     throw { status: 401, message: error.message };
    // }
    const cursoCreated = await criarCurso(req.body);

    return req.status(200).json(cursoCreated);
});

//atualizar curso
cursoRoutes.put("/:id", async (req, res) => {
    const { id } = req.params;
    // const { error } = await cursoSchema.validade(req.body);
    // if (error) {
    //     throw { status: 401, message: error.message };
    // }

    const cursoUpdated = await atualizarCurso(id, req.body);
    return res.status(200).json(cursoUpdated);
});

//deletar curso
cursoRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const cursoDeleted = await deletarCurso(id);
    return req.status(200).json(cursoDeleted);
});

export default cursoRoutes;