import { Router } from "express";
import {
    listarEstudantes,
    criarEstudante,
    atualizarEstudante,
    deletarEstudante,
    authentication
} from "../services/estudante.service.js";

import authenticationMiddleware from "../middlewares/auth.middleware.js"
import { estudanteSchema } from "../utils/schemaValidation.js";

const estudanteRoutes = Router();

//rota para listar estudantes 
estudanteRoutes.get("/", authenticationMiddleware, async (req, res) => {
    const estudante = await listarEstudantes();
    return res.status(200).json(estudante);
});

//rota pra criar estudante
estudanteRoutes.post("/", async (req, res) => {
    const { error } = await estudanteSchema.validate(req.body);
    if (error) {
        throw { status: 401, message: error.message };
    }
    const estudanteCreated = await criarEstudante(req.body);

    return res.status(200).json(estudanteCreated);
});

//atualizar estudante
estudanteRoutes.put("/:id", authenticationMiddleware, async (req, res) => {
    const { id } = req.params;
    const { error } = await estudanteSchema.validate(req.body);
    if (error) {
        throw { status: 401, message: error.message };
    }

    const estudanteUpdated = await atualizarEstudante(id, req.body);
    return res.status(200).json(estudanteUpdated);
});

//deletar estudante
estudanteRoutes.delete("/:id", authenticationMiddleware, async (req, res) => {
    const { id } = req.params;
    const estudanteDeleted = await deletarEstudante(id);
    return res.status(200).json(estudanteDeleted);
});

estudanteRoutes.post('/login', async (req, res) => {
    const token = await authentication(req.body);
    res.status(200).json(token);
});

export default estudanteRoutes;