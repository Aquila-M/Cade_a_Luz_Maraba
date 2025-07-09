document.addEventListener('DOMContentLoaded', function() {
    
    
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            
            const emailInput = document.querySelector('input[name="email"]');
            const senhaInput = document.querySelector('input[name="senha"]');

            const emailValue = emailInput.value.trim();
            const senhaValue = senhaInput.value.trim();

            if (emailValue === '' || senhaValue === '') {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            

        
            const users = JSON.parse(localStorage.getItem('users')) || [];

            //procura por um usuário que tenha o mesmo email E a mesma senha
            const foundUser = users.find(user => user.email === emailValue && user.senha === senhaValue);

            //Verifica se o usuário foi encontrado
            if (foundUser) {
                localStorage.setItem('usuarioLogado', JSON.stringify(foundUser));
                
                alert(`Login bem-sucedido! Bem-vindo, ${foundUser.nome}!`);
                window.location.href = 'denunciacomLista.html';
            } else {
                
                alert('E-mail ou senha incorretos. Por favor, tente novamente.');
            }
        });
    }
});