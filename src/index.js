const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const routes = require('./routes/reclamacoes');

app.use(cors());
app.use(express.json());

// Servir frontend estático
app.use(express.static(path.join(__dirname, '../../frontend')));

// Rotas API
app.use('/api/reclamacoes', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
