document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('form-contato');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();

    if (!nome || !email || !mensagem) {
      alert('Por favor, preencha todos os campos antes de enviar.');
      return;
    }

    alert(`Obrigado pela mensagem, ${nome}! Entraremos em contato em breve.`);
    form.reset();
  });


  const projetosContainer = document.querySelector('.projetos-container');

  const repositoriosDesejados = ['TRABALHO-01', 'PORTFOLIO-CURSO', 'UC12-FRONT-END'];
  const token = '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';
  const usuario = 'lucasdocurso'; 

  projetosContainer.innerHTML = '';

  repositoriosDesejados.forEach((repoName) => {
    fetch(`https://api.github.com/repos/${usuario}/${repoName}`, {
      headers: {
        Authorization: `token ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Erro no repositório ${repoName}`);
        return res.json();
      })
      .then((repo) => {
        const div = document.createElement('div');
        div.className = 'projeto';
        div.innerHTML = `
          <h3>${repo.name}</h3>
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Ver Projeto no GitHub</a>
        `;
        projetosContainer.appendChild(div);
      })
      .catch((err) => {
        console.error(`Erro ao carregar o repositório ${repoName}:`, err);
      });
  });
});

  