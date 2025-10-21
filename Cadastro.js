document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do formulário
    const form = document.querySelector('.form-content form');
    const firstNameInput = document.getElementById('firstname');
    const lastNameInput = document.getElementById('lastname');
    const emailInput = document.getElementById('email');
    const numberInput = document.getElementById('number');
    const continueButton = document.querySelector('.continue-button button');

    // Agrupa todos os campos de input para facilitar a verificação
    const inputs = [firstNameInput, lastNameInput, emailInput, numberInput];

    // Função para validar um único campo e dar feedback visual
    const validateInput = (input) => {
        const value = input.value.trim();
        let isValid = true;

        // Regra 1: Verifica se o campo não está vazio
        if (value === '') {
            isValid = false;
        }

        // Regra 2: Verifica se o email tem um formato válido
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
            }
        }

        // Adiciona ou remove a classe 'invalid' para o feedback visual
        if (isValid) {
            input.classList.remove('invalid');
        } else {
            input.classList.add('invalid');
        }

        return isValid;
    };

    // Função para verificar todos os campos do formulário
    const checkFormValidity = () => {
        // Usa o método 'every' para garantir que TODOS os inputs são válidos
        const isFormValid = inputs.every(input => validateInput(input));
        
        // Ativa ou desativa o botão com base na validade do formulário
        continueButton.disabled = !isFormValid;
    };

    // Adiciona um "ouvinte" para cada campo. A validação acontece enquanto o usuário digita.
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input); // Valida o campo atual para feedback instantâneo
            checkFormValidity();  // Verifica o formulário inteiro para decidir sobre o botão
        });
    });

    // Estado inicial: Desativa o botão e verifica o formulário (caso haja dados pré-preenchidos)
    checkFormValidity();

    // ... (todo o código de validação que já existe) ...

    // Adiciona um "ouvinte" para o evento de 'submit' do formulário
    form.addEventListener('submit', (event) => {
        // Impede que o formulário recarregue a página (comportamento padrão)
        event.preventDefault(); 
        
        // (Opcional) Você pode mostrar um alerta de sucesso aqui
        alert('Cadastro realizado com sucesso! Redirecionando para a página principal.');

        // Redireciona o usuário para a página principal
        window.location.href = 'index.html';
    });
});