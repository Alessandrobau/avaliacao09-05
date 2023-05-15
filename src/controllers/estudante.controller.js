import { Router } from "express";
import {
    listarEstudantes,
    criarEstudante,
    atualizarEstudante,
    deletarEstudante
} from "../services/estudante.service";

const estudanteRoutes = Router();

//rota para listar estudantes 
estudanteRoutes.get("/", async (req, res) => {
    const estudante = await listarEstudantes();
    return res.status(200).json(estudante);
});

//rota pra criar estudante
estudanteRoutes.post("/", async (req, res) => {
    // const { error } = await estudanteSchema.validade(req.body);
    // if (error) {
    //     throw { status: 401, message: error.message };
    // }
    const estudanteCreated = await criarEstudante(req.body);

    return req.status(200).json(estudanteCreated);
});

//atualizar estudante
estudanteRoutes.put("/:id", async (req, res) => {
    const { id } = req.params;
    // const { error } = await estudanteSchema.validade(req.body);
    // if (error) {
    //     throw { status: 401, message: error.message };
    // }

    const estudanteUpdated = await atualizarEstudante(id, req.body);
    return res.status(200).json(estudanteUpdated);
});

//deletar estudante
estudanteRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const estudanteDeleted = await deletarEstudante(id);
    return req.status(200).json(estudanteDeleted);
});

export default estudanteRoutes;