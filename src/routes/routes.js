import { Router } from "express";
import estudanteController from "../controllers/estudante.controller.js";
import matriculaController from "../controllers/matricula.controller.js";
import professorController from "../controllers/professor.controller.js";
import cursoController from "../controllers/curso.controller.js";

//habilita o uso de rotas
const routes = Router();
//cria uma rota /users, que vai ter as possibilidades dentro do userController
routes.use('/estudantes', estudanteController);
routes.use('/curso', cursoController); //implementar
routes.use('/matricula', matriculaController);//implementar
routes.use('/professor', professorController);//implementar

export default routes;