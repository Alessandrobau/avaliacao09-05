//importa o mongoose
import mongoose from 'mongoose';

//cria o esquema (schema) a ser adicionado na model
const schema = new mongoose.Schema({
  _id: Number,
  nome: String,
  imagem_perfil: String,
  biografia: String,
  expertise: String,
  git_hub: String,
  linkedin: String
});

//cria uma model chamada Users com esse schema passado
const professor = mongoose.model('professor', schema);

export default professor;