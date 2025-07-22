const express = require('express');
const router = express.Router();
const controller = require('../controllers/reclamacoesController');

router.post('/', controller.criarReclamacao);
router.get('/', controller.listarReclamacoes);



module.exports = router;
