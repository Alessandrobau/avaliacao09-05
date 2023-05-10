//importa o mongoose
import mongoose from 'mongoose';

//cria o esquema (schema) a ser adicionado na model
const schema = new mongoose.Schema({
    //_eu _id, estudante, curso, data_matricula e status.
  _id: Number,
  estudante: String,
  curso: String,
  data_matricula: String,
  status: String,
});

//cria uma model chamada Users com esse schema passado
const matricula = mongoose.model('matricula', schema);

export default matricula;   