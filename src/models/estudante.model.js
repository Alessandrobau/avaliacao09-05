//importa o mongoose
import mongoose from 'mongoose';

//cria o esquema (schema) a ser adicionado na model
const schema = new mongoose.Schema({
  _id: Number,
  nome: String,
  imagem_perfil: String,
  telefone: String,
  cpf: String,
  email: String,
  password: String
});

//cria uma model chamada Users com esse schema passado
const estudante = mongoose.model('estudante', schema);

export default estudante;