//importo o mongoose
import mongoose from "mongoose";

//crio uma string de conexao cujo database se chama project
mongoose.connect('mongodb+srv://alessandrobau011:mL9XnwICmuNv0Mzb@cluster0.orrzzqd.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//com base nos dados de conexao, peço para efetivamente realizar a conexao
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão com o banco de dados:'));
db.once('open', function() {
  console.log('Conexão com o banco de dados estabelecida com sucesso.');
});

export default db;