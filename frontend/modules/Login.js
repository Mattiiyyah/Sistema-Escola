import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.formClass = document.querySelector(formClass);
    }

    init() {
        if (!this.formClass) return;
        this.eventSubmit();
        this.eventClick();

        //impedinmento de acesso direto ao cadastro 
        if (window.location.hash === '#register') {
            const registerTab = document.querySelector('#pills-register-tab');
            if (registerTab) registerTab.click();
        }
    }

    eventSubmit() {
        this.formClass.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validate(e);
        });
    }

    eventClick() {
        this.formClass.addEventListener('click', (e) => {
            this.seePassword(e);
        });
    }

    seePassword(e) {
        const elementoClicado = e.target;

        if (!elementoClicado.classList.contains('bi-eye') && !elementoClicado.classList.contains('bi-eye-slash')) {
            return;
        }

        let inputId;
        if (elementoClicado.id === 'toggleLoginPassword') inputId = 'loginPassword';
        if (elementoClicado.id === 'toggleRegisterPassword') inputId = 'registerPassword';
        if (elementoClicado.id === 'toggleConfirmPassword') inputId = 'confirmpassword';

        if (inputId) {
            const input = document.querySelector(`#${inputId}`);

            if (input.type === 'password') {
                input.type = 'text';
                elementoClicado.classList.remove('bi-eye');
                elementoClicado.classList.add('bi-eye-slash');
            } else {
                input.type = 'password';
                elementoClicado.classList.remove('bi-eye-slash');
                elementoClicado.classList.add('bi-eye');
            }
        }
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        const nameInput = el.querySelector('input[name="nome"]');
        const confirmPasswordInput = el.querySelector('input[name="confirmpassword"]');

        let error = false;

        // Helper para pegar a div de erro (dentro do form-floating ou fora do input-group)
        const getErrorDiv = (input) => {
            let div = input.parentElement.querySelector('.invalid-feedback');
            if (!div) {
                const group = input.closest('.input-group');
                if (group) div = group.nextElementSibling;
            }
            return div;
        };

        // Helper para setar erro com display manual
        const setError = (input, msg) => {
            const div = getErrorDiv(input);
            input.classList.add('is-invalid');
            if (div) {
                div.innerText = msg;
                div.style.display = 'block';
            }
        };

        const clearError = (input) => {
            const div = getErrorDiv(input);
            input.classList.remove('is-invalid');
            if (div) {
                div.innerText = '';
                div.style.display = 'none';
            }
        };

        // Validação de Email
        if (emailInput) {
            if (!validator.isEmail(emailInput.value)) {
                setError(emailInput, 'E-mail inválido');
                error = true;
            } else {
                clearError(emailInput);
            }
        }

        // Validação de Senha
        if (passwordInput) {
            if (passwordInput.value.length < 3 || passwordInput.value.length > 8) {
                setError(passwordInput, 'Senha precisa ter entre 3 a 8 caracteres');
                error = true;
            } else {
                clearError(passwordInput);
            }
        }

        // Validação de Confirmação de Senha
        if (confirmPasswordInput && passwordInput) {
            if (confirmPasswordInput.value !== passwordInput.value) {
                setError(confirmPasswordInput, 'As senhas precisam ser iguais');
                error = true;
            } else {
                clearError(confirmPasswordInput);
            }
        }

        // Validação de Nome (Apenas Cadastro)
        if (nameInput) {
            if (!nameInput.value || nameInput.value.trim().length === 0) {
                setError(nameInput, 'Nome é obrigatório');
                error = true;
            }
            else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nameInput.value)) {
                setError(nameInput, 'Nome só pode conter letras');
                error = true;
            } else {
                clearError(nameInput);
            }
        }

        if (!error) el.submit();
    }
}