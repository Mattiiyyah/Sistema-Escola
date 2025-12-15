import validator from 'validator';

export default class Aluno {
    constructor(formClass) {
        this.formClass = document.querySelector(formClass);
    }

    init() {
       if(this.formClass) this.eventSubmit();
    }

    eventSubmit() {
        this.formClass.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validate(e);
        });
    }
    
    validate(e) {
       const el = e.target;
       const nomeInput = el.querySelector('input[name="nome"]');
       const turmaSelect = el.querySelector('select[name="turma"]');
       const nomeResponsavelInput = el.querySelector('input[name="nomeResponsavel"]');
       const emailResponsavelInput = el.querySelector('input[name="emailResponsavel"]');
       const telefoneResponsavelInput = el.querySelector('input[name="telefoneResponsavel"]');
       const valorInput = el.querySelector('input[name="valor"]');
       const pagoSelect = el.querySelector('select[name="pago"]');

       let error = false;

       //Helper para pegar a div de erro (dentro do form-floating ou for do input-group) 
       const getErrorDivInput = (input) => {
            let div = input.parentElement.querySelector('.invalid-feedback');
            if(!div) {
                const group = input.closest('.input-group');
                if(group) div = group.nextElementSibling;
            }
            return div;
       } 

       const getErrorDivSelect = (select) => {
            let div = select.parentElement.querySelector('.invalid-feedback');
            return div;
       }

       // Helper para setar erro com display manual
       const setErrorInput = (input, msg) => {
          const div = getErrorDivInput(input);
          input.classList.add('is-invalid');
          if(div) {
             div.innerText = msg;
             div.style.disply = 'block';
          }
       }

       const setErrorSelect = (select, msg) => {
          const div = getErrorDivSelect(select);
          select.classList.add('is-invalid');
          if(div) {
             div.innerText = msg;
             div.style.display = 'block';
          }
       } 

       const clearErrorInput = (input) => {
          const div = getErrorDivInput(input);
          input.classList.remove('is-invalid');
          if(div) {
             div.innerText = '';
             div.style.display = 'none';
          }
       }

       const clearErrorSelect = (select) => {
          const div = getErrorDivSelect(select);
          select.classList.remove('is-invalid');
          if(div) {
             div.innerText = '';
             div.style.display = 'none';
          }
       }

       // validação para o nome
       if(nomeInput) {
          if(!nomeInput.value || nomeInput.value.trim().length === 0) {
            setErrorInput(nomeInput, 'Nome é obrigatório');
            error = true;
          } 
          else if(!/^[A-Za-zÀ-ÿ\s]+$/.test(nomeInput.value)) {
            setErrorInput(nomeInput, 'Nome só pode conter letras');
            error = true;
          }
          else {
            clearErrorInput(nomeInput);
          }
       }

       //validação para a turma
       if(turmaSelect) {
          if(!turmaSelect.value) {
            setErrorSelect(turmaSelect, 'Turma é obrigatória');
            error = true;
          }
          else {
            clearErrorSelect(turmaSelect);
          }
       }

       //validação para o nome do responsável
       if(nomeResponsavelInput) {
          if(!nomeResponsavelInput.value || nomeResponsavelInput.value.trim().length === 0) {
            setErrorInput(nomeResponsavelInput, 'Nome do responsável é obrigatório');
            error = true;
          } 
          else if(!/^[A-Za-zÀ-ÿ\s]+$/.test(nomeResponsavelInput.value)) {
            setErrorInput(nomeResponsavelInput, 'Nome do responsável só pode conter letras');
            error = true;
          }
          else {
            clearErrorInput(nomeResponsavelInput);
          }
       }

       //validação email do responsavael
       if(emailResponsavelInput) {
          if(!validator.isEmail(emailResponsavelInput.value)) {
            setErrorInput(emailResponsavelInput, 'E-mail inválido');
            error = true;
          }
          else {
            clearErrorInput(emailResponsavelInput);
          }
       }
       
       //validação para o telefone do responsável
       if(telefoneResponsavelInput) {
          if(!telefoneResponsavelInput.value || telefoneResponsavelInput.value.length < 5) {
            setErrorInput(telefoneResponsavelInput, 'Telefone é obrigatório');
            error = true;
          }
          else {
            clearErrorInput(telefoneResponsavelInput);
          }
       }

       //validação para o valor
       if(valorInput) {
         if(!valorInput.value) {
            setErrorInput(valorInput, 'Valor é obrigatório');
            error = true;
         }
         else if(isNaN(valorInput.value)) {
            setErrorInput(valorInput, 'Valor inválido');
            error = true;
         }
         else {
            clearErrorInput(valorInput);
         }
       }

       //validação para o pagamento
       if(pagoSelect) {
         if(pagoSelect.value !== 'true' && pagoSelect.value !== 'false') {
            setErrorSelect(pagoSelect, 'Pagamento é obrigatório');
            error = true;
         }
         else {
            clearErrorSelect(pagoSelect);
         }
       }

       if (!error) el.submit();
    }
}