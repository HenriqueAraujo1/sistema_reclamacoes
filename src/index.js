const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/reclamacoes');

app.use(cors());
app.use(express.json());

app.use('/api/reclamacoes', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
