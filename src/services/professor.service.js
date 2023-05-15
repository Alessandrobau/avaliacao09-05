import Professor from "../models/professor.model"

//adicionar
const adicionarProfessor = async (dados) => {
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
const atualizarProfessor = async (id, dados) => {
    const atualizacaoProfessor = await Professor.findByIdAndUpdate(id, dados, { new: true });
    return atualizacaoProfessor;
};

//remover
const deletarProfessor = async (id) => {
    await Professor.findByIdAndDelete(id);
};

export {
    adicionarProfessor,
    listarProfessores,
    atualizarProfessor,
    deletarProfessor
};