import estudanteRoutes from "../controllers/estudante.controller.js";
import Estudante from "../models/estudante.model.js";
import { generateJWTToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
//criacao, leitura, atualizacao e exclusao

//criacao
const criarEstudante = async (dados) => {
    const { cpf, nome, email } = dados;

    const existingEstudante = await Estudante.findOne({ $or: [{ cpf }, { nome }, { email }] });

    if (existingEstudante) {
        throw { status: 400, message: "Já existe um estudante com esses dados." };
    }

    dados.password = bcrypt.hashSync(dados.password, 8);

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
    const { cpf, nome, email } = dados;

    const existingEstudante = await Estudante.findOne({
        $and: [
            { _id: { $ne: id } },
            { $or: [{ cpf }, { nome }, { email }] }
        ]
    });

    if (existingEstudante) {
        throw { status: 400, message: "Já existe um estudante com esses dados." };
    }

    dados.password = bcrypt.hashSync(dados.password, 8);
    const atualizacaoEstudante = await Estudante.findByIdAndUpdate(id, dados, { new: true });
    return atualizacaoEstudante;
};

//remoção
const deletarEstudante = async (id) => {
    await Estudante.findByIdAndDelete(id);
};

//login
const authentication = async ({ email, password }) => {
    if (!email || !password) {
        throw { status: 401, message: "Campos faltantes." };
    }
    const estudante = await Estudante.findOne({ email });

    const comparePassword = bcrypt.compareSync(password, estudante.password);

    if (!estudante || !comparePassword) {
        throw { status: 401, message: "Estudante ou senha inválido" };
    }

    const { _id, nome } = estudante;

    const token = generateJWTToken({ _id, nome, email, isProfessor: false });
    return { token };
};

export {
    criarEstudante,
    listarEstudantes,
    atualizarEstudante,
    deletarEstudante,
    authentication
};