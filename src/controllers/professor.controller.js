import { Router } from "express";
import {
    listarProfessores,
    adicionarProfessor,
    atualizarProfessor,
    deletarProfessor,
    authentication
} from "../services/professor.service.js";
import authenticationMiddleware from "../middlewares/auth.middleware.js"
import { professorSchema } from "../utils/schemaValidation.js"

const professorRoutes = Router();

//rota para listar professors 
professorRoutes.get("/", authenticationMiddleware, async (req, res) => {
    const professor = await listarProfessores();
    return res.status(200).json(professor);
});

//rota pra criar professor
professorRoutes.post("/", authenticationMiddleware, async (req, res) => {
    const { error } = await professorSchema.validate(req.body);
    if (error) {
        throw { status: 401, message: error.message };
    }
    const professorCreated = await adicionarProfessor(req.body);
    return res.status(200).json(professorCreated);
});

//atualizar professor
professorRoutes.put("/:id", authenticationMiddleware, async (req, res) => {
    const { id } = req.params;
    const { error } = await professorSchema.validate(req.body);
    if (error) {
        throw { status: 401, message: error.message };
    }

    const professorUpdated = await atualizarProfessor(id, req.body);
    return res.status(200).json(professorUpdated);
});

//deletar professor
professorRoutes.delete("/:id", authenticationMiddleware, async (req, res) => {
    const { id } = req.params;
    const professorDeleted = await deletarProfessor(id);
    return res.status(200).json(professorDeleted);
});

professorRoutes.post('/login', async (req, res) => {
    console.log(req.body);
    const token = await authentication(req.body);
    res.status(200).json(token);
})

export default professorRoutes;