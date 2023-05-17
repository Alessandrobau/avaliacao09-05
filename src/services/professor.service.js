import bcrypt from "bcrypt";
import { generateJWTToken } from "../utils/jwt.js";
import Professor from "../models/professor.model.js";

//adicionar
const adicionarProfessor = async (dados, imagePath) => {
    // if (!isProfessor) {
    //     throw { status: 401, message: "Apenas professores podem cadastrar professores." };
    // }

    const { nome, email } = dados;

    const existingProfessor = await Professor.findOne({ $or: [{ nome }, { email }] });

    if (existingProfessor) {
        throw { status: 400, message: "Já existe um professor com esses dados." };
    }

    dados.password = bcrypt.hashSync(dados.password, 8);
    dados.imagem_perfil = imagePath;

    console.log(dados);
    const professorCreate = new Professor(dados);
    await professorCreate.save();
    return professorCreate;
};

//listar
const listarProfessores = async () => {
    const listaProfessores = await Professor.find();
    return listaProfessores;
};
//atualizar
const atualizarProfessor = async (id, dados, isProfessor) => {
    if (!isProfessor) {
        throw { status: 401, message: "Apenas professores podem editar professores." };
    }

    const { nome, email } = dados;

    const existingProfessor = await Professor.findOne({
        $and: [
            { _id: { $ne: id } },
            { $or: [{ nome }, { email }] }
        ]
    });

    if (existingProfessor) {
        throw { status: 400, message: "Já existe um professor com esses dados." };
    }

    dados.password = bcrypt.hashSync(dados.password, 8);
    const atualizacaoProfessor = await Professor.findByIdAndUpdate(id, dados, { new: true });
    return atualizacaoProfessor;
};

//remover
const deletarProfessor = async (id, isProfessor) => {
    await Professor.findByIdAndDelete(id);
};


//autenticação 
const authentication = async ({ email, password }) => {
    console.log(password);
    if (!email || !password) {
        throw { status: 401, message: "Campos faltantes." };
    }

    const professor = await Professor.findOne({ email });
    const comparePassword = bcrypt.compareSync(password, professor.password);

    if (!professor || !comparePassword) {
        throw { status: 401, message: "Professor ou senha inválido" };
    }

    const { _id, nome } = professor;

    // Gerar o token
    const token = generateJWTToken({ _id, nome, email, isProfessor: true });
    return { token };
};

export {
    adicionarProfessor,
    listarProfessores,
    atualizarProfessor,
    deletarProfessor,
    authentication
};