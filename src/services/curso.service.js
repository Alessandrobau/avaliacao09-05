import Curso from "../models/curso.model.js"
import professor from "../models/professor.model.js";


//adicionar
const adicionarCurso = async (dados) => {
    const existingCurso = await professor.findOne({ $or: [{ cpf }, { nome }, { email }] });

    if (existingCurso) {
        throw { status: 400, message: "Já existe um professor nesse curso." };
    }
    console.log(dados);
    const cursoCreate = new Curso(dados);
    await cursoCreate.save();
    return cursoCreate;
};

//update
const atualizarCurso = async (id, dados) => {
    const atualizacaoCurso = await Curso.findByIdAndUpdate(id, dados, { new: true });
    return atualizacaoCurso;
};

//listar
const listarCursos = async () => {
    const listaCurso = await Curso.find();
    return listaCurso;
};

//remover
const deletarCurso = async (id) => {
    await Curso.findByIdAndDelete(id);
};

export {
    adicionarCurso,
    listarCursos,
    atualizarCurso,
    deletarCurso
};