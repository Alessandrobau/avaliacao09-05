import Estudante from "../models/estudante.model.js";
import { generateJWTToken } from "../utils/jwt.js";

//criacao, leitura, atualizacao e exclusao

//criacao
const criarEstudante = async (dados) => {
    console.log(dados);
    const estudanteCreate = new Estudante(dados);
    await estudanteCreate.save();
    return estudanteCreate;
}


export {
    criarEstudante
};