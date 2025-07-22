async function carregarReclamacoes() {
  try {
    console.log('Carregando reclamações...'); // Verifica se entrou na função
    const res = await fetch('http://localhost:3000/api/reclamacoes');
    const dados = await res.json();
    console.log('Dados recebidos:', dados); // Verifica os dados recebidos

    const corpoTabela = document.getElementById('tabela-reclamacoes');
    if (!corpoTabela) {
      console.log('Elemento tbody não encontrado');
      return;
    }

    corpoTabela.innerHTML = '';

    dados.forEach((item) => {
      const linha = document.createElement('tr');

      // Formata a data para dd/mm/aaaa
      let dataFormatada = '-';
      if (item.data_ocorrencia) {
        const data = new Date(item.data_ocorrencia);
        dataFormatada = data.toLocaleDateString('pt-BR');
      }

      linha.innerHTML = `
        <td>${item.numero_onibus}</td>
        <td>${item.linha}</td>
        <td>${dataFormatada}</td>
        <td>${item.horario}</td>
        <td>${item.nome_motorista || '-'}</td>
        <td>${item.descricao}</td>
      `;

      corpoTabela.appendChild(linha);
    });
  } catch (error) {
    console.error('Erro ao carregar reclamações:', error);
  }
}

// Envio do formulário de reclamação
const form = document.getElementById('formReclamacao');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
      numero_onibus: document.getElementById('numero_onibus').value,
      linha: document.getElementById('linha').value,
      data_ocorrencia: document.getElementById('data_ocorrencia').value, // novo campo
      horario: document.getElementById('horario').value,
      nome_motorista: document.getElementById('nome_motorista').value,
      descricao: document.getElementById('descricao').value,
    };

    try {
      const res = await fetch('http://localhost:3000/api/reclamacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      const resposta = await res.json();
      const mensagem = document.getElementById('mensagem');
      if (res.ok) {
        mensagem.textContent = `Reclamação registrada! Protocolo: ${resposta.protocolo}`;
        form.reset();
      } else {
        mensagem.textContent = resposta.erro || 'Erro ao registrar reclamação';
      }
    } catch (error) {
      document.getElementById('mensagem').textContent = 'Erro ao conectar com o servidor';
    }
  });
}

// Só chama se estiver em reclamacoes.html
if (window.location.pathname.includes('reclamacoes.html')) {
  carregarReclamacoes();
}
