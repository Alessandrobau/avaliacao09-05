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

//listar
const listarEstudantes = async () => {
    const listaEstudante = await Estudante.find();
    return listaEstudante;
};

//atualização
const atualizarEstudante = async (id, dados) => {
    const atualizacaoEstudante = await Estudante.findByIdAndUpdate(id, dados, { new: true });
    return atualizacaoEstudante;
};

//remoção
const deletarEstudante = async (id) => {
    await Estudante.findByIdAndDelete(id);
};

export {
    criarEstudante,
    listarEstudantes,
    atualizarEstudante,
    deletarEstudante
};