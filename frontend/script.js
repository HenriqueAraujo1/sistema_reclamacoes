document.getElementById('form-reclamacao').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const dados = Object.fromEntries(formData.entries());

  try {
    const resposta = await fetch('http://localhost:3000/api/reclamacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      document.getElementById('resposta').innerText = `Reclamação registrada com sucesso! Protocolo: ${resultado.protocolo}`;
      e.target.reset();
    } else {
      document.getElementById('resposta').innerText = 'Erro ao registrar reclamação.';
    }
  } catch (error) {
    console.error(error);
    document.getElementById('resposta').innerText = 'Erro ao conectar com o servidor.';
  }
});
