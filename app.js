document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Função para simular banco de dados no localStorage
    function getUsers() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    }

    function saveUser(user) {
        const users = getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Função de Cadastro
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const newUser = {
                username: document.getElementById('newUsername').value,
                password: document.getElementById('newPassword').value,
                userType: document.getElementById('userType').value
            };
            saveUser(newUser);
            alert('Usuário cadastrado com sucesso!');
            window.location.href = 'inicio.html';
        });
    }

    // Função de Login
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const users = getUsers();
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                loadMenu(user.userType);
            } else {
                alert('Usuário ou senha incorretos');
            }
        });
    }

    // Função de Logout
    window.logout = function () {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'inicio.html';
    }

    // Carregar Menu Dinâmico
    function loadMenu(userType) {
        document.getElementById('loginForm').classList.add('hidden');
        const menu = document.getElementById('menu');
        menu.classList.remove('hidden');
        const menuOptions = document.getElementById('menuOptions');
        menuOptions.innerHTML = '';

        if (userType === 'admin') {
            menuOptions.innerHTML += '<li><a href="#">Dashboard</a></li>';
            menuOptions.innerHTML += '<li><a href="#">Gerenciar Usuários</a></li>';
        }
        menuOptions.innerHTML += '<li><a href="#">Perfil</a></li>';
        menuOptions.innerHTML += '<li><a href="#">Configurações</a></li>';
    }

    // Verificar usuário logado
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        loadMenu(loggedInUser.userType);
    }
});
