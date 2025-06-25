const db = require('../config/db');

function gerarProtocolo() {
  return Math.floor(100000 + Math.random() * 900000);
}

exports.criarReclamacao = (req, res) => {
  const { numero_onibus, linha, horario, nome_motorista, descricao } = req.body;
  const protocolo = gerarProtocolo();

  const query = 'INSERT INTO reclamacoes (numero_onibus, linha, horario, nome_motorista, descricao, protocolo) VALUES (?, ?, ?, ?, ?, ?)';
  const valores = [numero_onibus, linha, horario, nome_motorista, descricao, protocolo];

  db.query(query, valores, (err, result) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao registrar reclamação' });
    }
    res.status(201).json({ mensagem: 'Reclamação registrada com sucesso', protocolo });
  });
};

exports.listarReclamacoes = (req, res) => {
  db.query('SELECT * FROM reclamacoes', (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar reclamações' });
    }
    res.json(results);
  });
};
