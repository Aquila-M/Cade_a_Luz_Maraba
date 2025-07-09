document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            
            const nomeInput = document.getElementById('nome');
            const emailInput = document.getElementById('email');
            const senhaInput = document.getElementById('senha');
            const confirmarSenhaInput = document.getElementById('confirmar-senha');

            const nomeValue = nomeInput.value.trim();
            const emailValue = emailInput.value.trim();
            const senhaValue = senhaInput.value.trim();
            const confirmarSenhaValue = confirmarSenhaInput.value.trim();

            if (nomeValue === '' || emailValue === '' || senhaValue === '') {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            if (senhaValue !== confirmarSenhaValue) {
                alert('As senhas não coincidem.');
                return;
            }
            
            // --- INÍCIO DA LÓGICA DE SALVAMENTO ---

            // 1. Pega a lista de usuários que JÁ EXISTE no LocalStorage.
           
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // 2. Verifica se o e-mail já foi cadastrado.
            const userExists = users.some(user => user.email === emailValue);
            if (userExists) {
                alert('Este e-mail já foi cadastrado. Por favor, utilize outro.');
                return;
            }

            // 3. Cria um objeto para o novo usuário.
            const newUser = {
                nome: nomeValue,
                email: emailValue,
                senha: senhaValue
            };

            // 4. Adiciona o novo usuário à lista.
            users.push(newUser);

            // 5. Salva a lista ATUALIZADA de volta no LocalStorage.
            localStorage.setItem('users', JSON.stringify(users));
            
            // 6. Avisa o usuário e o redireciona para a tela de login.
            alert('Cadastro realizado com sucesso! Você será redirecionado para a tela de login.');
            window.location.href = 'login.html';
        });
    }
});