import { Router } from "express";
import {
    listarProfessores,
    criarProfessor,
    atualizarProfessor,
    deletarProfessor
} from "../services/professor.service";

const professorRoutes = Router();

//rota para listar professors 
professorRoutes.get("/", async (req, res) => {
    const professor = await listarProfessores();
    return res.status(200).json(professor);
});

//rota pra criar professor
professorRoutes.post("/", async (req, res) => {
    // const { error } = await professorSchema.validade(req.body);
    // if (error) {
    //     throw { status: 401, message: error.message };
    // }
    const professorCreated = await criarProfessor(req.body);

    return req.status(200).json(professorCreated);
});

//atualizar professor
professorRoutes.put("/:id", async (req, res) => {
    const { id } = req.params;
    // const { error } = await professorSchema.validade(req.body);
    // if (error) {
    //     throw { status: 401, message: error.message };
    // }

    const professorUpdated = await atualizarProfessor(id, req.body);
    return res.status(200).json(professorUpdated);
});

//deletar professor
professorRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const professorDeleted = await deletarProfessor(id);
    return req.status(200).json(professorDeleted);
});

export default professorRoutes;