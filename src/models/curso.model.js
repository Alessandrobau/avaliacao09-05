//importa o mongoose
import mongoose from 'mongoose';

//cria o esquema (schema) a ser adicionado na model
const schema = new mongoose.Schema({
  nome: String,
  descricao: String,
  carga_horaria: String,
  avaliacao: String,
  valor: String,
  logo: String,
  professor_responsible: String,
  status: Boolean
}, { collection: 'curso' });

//cria uma model chamada Users com esse schema passado
const curso = mongoose.model('curso', schema);

export default curso;