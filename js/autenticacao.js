document.addEventListener('DOMContentLoaded', function() {
    const dadosUsuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    const botaoCtaPrincipal = document.getElementById('cta-principal');
    const areaDireita = document.querySelector('.right-area');

    if (dadosUsuario && botaoCtaPrincipal && areaDireita) {
        // Pega apenas o primeiro nome
        const primeiroNome = dadosUsuario.nome.split(' ')[0];

        // Cria o texto de saudação
        const saudacao = document.createElement('span');
        saudacao.className = 'header-saudacao'; // Nova classe para o estilo
        saudacao.textContent = `Olá, ${primeiroNome}!`;

        // Cria o novo botão "Sair"
        const botaoSair = document.createElement('a');
        botaoSair.href = '#';
        botaoSair.textContent = 'Sair';
        botaoSair.className = 'btn-cta-header'; // Classe para o botão verde

        botaoSair.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('usuarioLogado');
            window.location.href = 'home.html';
        });

        // Limpa a área direita e adiciona os novos elementos
        areaDireita.innerHTML = ''; // Limpa "nav" e o botão antigo
        const nav = document.createElement('nav'); // Recria o menu de navegação
        nav.innerHTML = `
            <a href="home.html">Home</a>
            <a href="#">Sobre</a>
            <a href="#">Contatos</a>
            <a href="#">Ajuda</a>
        `;
        
        areaDireita.appendChild(nav);
        areaDireita.appendChild(saudacao);
        areaDireita.appendChild(botaoSair);
    }
});