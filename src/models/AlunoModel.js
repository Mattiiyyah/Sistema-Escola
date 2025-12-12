const moongose = require('mongoose');
const validator = require('validator');

const AlunoSchema = new moongose.Schema({
    nome: { type: String, required: true },
    turma: { type: String, required: true },
    nomeResponsavel: { type: String, required: true }, 
    emailResponsavel: { type: String, required: true }, 
    telefoneResponsavel: { type: String, required: true }, 
    valor: { type: Number, required: true },
    pago: { type: Boolean, required: true },
    criadoEm: { type: Date, default: Date.now }
});

const AlunoModel = moongose.model('Aluno', AlunoSchema);

class Aluno {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.aluno = null;
    }

    async register() {
        this.valida();
        if(this.errors.length > 0) return;
        this.aluno = await AlunoModel.create(this.body);
    };

    valida() {
        
        this.cleanUp();

        //validação para o nome do aluno
        if(!this.body.nome || this.body.nome.trim().length === 0) this.errors.push('Adicione o nome do aluno');

        if(!/^[A-Za-zÀ-ÿ\s]+$/.test(this.body.nome)) this.errors.push('Nome do aluno só pode conter letras');  

        //validação turma
        if(!this.body.turma) this.errors.push('Adicione o aluno a uma turma!');

        //validação para o nome do responsável
        if(!this.body.nome || this.body.nome.trim().length === 0) this.errors.push('Adicione o nome do responsável');

        if(!/^[A-Za-zÀ-ÿ\s]+$/.test(this.body.nome)) this.errors.push('Nome do responsável só pode conter letras');  
        
        //email do responsável precisa ser valido
        if(this.body.emailResponsavel && !validator.isEmail(this.body.emailResponsavel)) this.errors.push('E-mail inválido');

        //validação para o telefone
        if(!this.body.telefoneResponsavel || this.body.telefoneResponsavel.length < 5) this.errors.push('Telefone inválido');
    

        //validação para o valor
        if(isNaN(this.body.valor)) this.errors.push('Digite o valor corretamente');
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string' && typeof this.body[key] !== 'number' && typeof this.body[key] !== 'boolean') {
                this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome,
            turma: this.body.turma,
            nomeResponsavel: this.body.nomeResponsavel, 
            emailResponsavel: this.body.emailResponsavel, 
            telefoneResponsavel: this.body.telefoneResponsavel,
            valor: this.body.valor,
            pago: this.body.pago
        };
    }

    async edit(id) {
        if(typeof id !== 'string') return;
        this.valida();
        if(this.errors.length > 0) return;
        this.aluno = await AlunoModel.findByIdAndUpdate(id, this.body, { new: true});
    }

    //métodos estáticos
    static async buscaporId(id) {
        if(typeof id !== 'string') return;
        const aluno = await AlunoModel.findById(id);
        return aluno;
    }

    static async buscaAlunos() {
        const alunos = await AlunoModel.find()
            .sort({criadoEm: -1});
        return alunos; 
    }

    static async buscaporStatus(status) {
        const alunos = await AlunoModel.find({pago: status})
            .sort({criadoEm: -1})
        return alunos;
    }

    static async delete(id) {
        if(typeof id !== 'string') return;
        const aluno = await AlunoModel.findOneAndDelete({_id: id});
        return aluno;
    }

} 
module.exports = Aluno;