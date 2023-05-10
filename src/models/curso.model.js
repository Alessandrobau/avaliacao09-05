//importa o mongoose
import mongoose from 'mongoose';

//cria o esquema (schema) a ser adicionado na model
const schema = new mongoose.Schema({
  _id: Number,
  nome: String,
  descricao: String,
  carga_horaria: String,
  avaliacao: String,
  valor: String,
  logo: String,
  professor: String,
});

//cria uma model chamada Users com esse schema passado
const curso = mongoose.model('curso', schema);

export default curso;