const moongose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new moongose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const LoginModel = moongose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.admin = null;
    }

    async login() {
        this.valida();
        if(this.errors.length > 0) return;
        this.admin = await LoginModel.findOne({ email: this.body.email});

        if(!this.admin) {
            this.errors.push('Essa conta não existe!');
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.admin.password)) {
            this.errors.push('Senha inválida');
            this.admin = null;
            return;
        }
    }

    async register() {

        //validacao para nome
        if(!this.body.nome || this.body.nome.trim().length === 0) this.errors.push('Adicione seu nome');

        if(!/^[A-Za-zÀ-ÿ\s]+$/.test(this.body.nome)) this.errors.push('Nome só pode conter letras');  

        this.valida();

        //validacao senhas iguais
        if(this.body.confirmpassword !== this.body.password) {
            this.errors.push('As senhas precisam ser iguais!');
        }
          
        if(this.errors.length > 0) return;

        await this.adminExists();

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.admin = await LoginModel.create(this.body);

    }

    async adminExists() {
        this.admin = await LoginModel.findOne({ email: this.body.email});
        if(this.admin) this.errors.push('Essa conta já existe!');
    }

    async resetPassword() {
        this.valida();
        this.admin = await LoginModel.findOne({ email: this.body.email});

        if(!this.admin)  this.errors.push('Admin não encontrado!');

        if(this.body.confirmpassword !== this.body.password) 
        this.errors.push('As senhas precisam ser identicas!');

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.newPassword = bcryptjs.hashSync(this.body.password, salt);
        await LoginModel.findByIdAndUpdate(this.admin._id, { password: this.body.newPassword }, { new: true });
    }


    valida() {
        this.cleanUp();

        //email precisa ser válido
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

        //senha precisa ter entre 3 a 8 caracteres
        if(this.body.password.length < 3 || this.body.password.length > 8) 
            this.errors.push('A senha precisa ter entre 3 a 8 caracteres');
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome,
            email: this.body.email,
            password: this.body.password,
            confirmpassword: this.body.confirmpassword
        };
    }
}

module.exports = Login;