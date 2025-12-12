const Aluno = require('../models/AlunoModel');

exports.index =  async(req, res) => {
    const alunos = await Aluno.buscaAlunos();
    res.render('alunos', { 
        alunos,
        tituloPagina: ''
    });
};

exports.register = (req, res) => {
    res.render('aluno-register', { aluno: {} });
};

exports.confirm = async(req, res) => {
    try{
        const aluno = new Aluno(req.body);
        await aluno.register();

        if(aluno.errors.length > 0) {
            req.flash('errors', aluno.errors);
            req.session.save(function() {
                return res.redirect('/alunos/register');
            });
            return;
        }

        req.flash('success', 'Aluno registrado com sucesso.');
        req.session.save(function() {
            res.redirect('/alunos/register');
        });
        return;

    } catch(e) {
        console.log(e);
        return res.send(e);   
    }
};

exports.editIndex = async function(req, res) {
    if(!req.params.id) return res.render('404');

    const aluno = await Aluno.buscaporId(req.params.id);
    if(!aluno) return res.render('404');

    res.render('aluno-register', { aluno });
};

exports.edit = async function(req, res) {
    try{
        if(!req.params.id) return res.render('404');
        const aluno = new Aluno(req.body);
        await aluno.edit(req.params.id);

        if(aluno.errors.length > 0) {
            req.flash('errors', aluno.errors);
            req.session.save(function() {
                return res.resdirect(`/alunos/register/${req.params.id}`);
            });
            return;
        }

        req.flash('success', 'Aluno editado com sucesso.');
        req.session.save(function() {
            res.redirect(`/alunos/register/${aluno.aluno._id}`);
        });
        return;
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.delete = async function(req, res) {
    if(!req.params.id) return res.render('404');

    const aluno = await Aluno.delete(req.params.id);
    if(!aluno) return res.render('404');

    req.flash('success', 'Aluno apagado com sucesso.');
    req.session.save(function() {
        res.redirect('/alunos/index');
    });
    return;
};

exports.indexPago = async (req, res) => {
    const alunos = await Aluno.buscaporStatus(true);
    res.render('alunos', { 
        alunos,
        tituloPagina: '(Pagos)' 
    });
};

exports.indexPendente = async (req, res) => {
    const alunos = await Aluno.buscaporStatus(false);
    res.render('alunos', { 
        alunos,
        tituloPagina: '(Pendentes)'
    });
};