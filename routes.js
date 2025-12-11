const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const alunosController = require('./src/controllers/alunoController');

const { loginRequired } = require('./src/middlewares/middlewares');

//rota de pagina - visualização home
route.get('/', homeController.index);


//rotas de login 
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);
route.get('/login/redefinir', loginController.reset);
route.post('/login/redefinir/confirm', loginController.confirm);

//rotas de aluno
route.get('/alunos/index', loginRequired, alunosController.index);
route.get('/alunos/register', loginRequired, alunosController.register);
route.post('/alunos/register/confirm', loginRequired, alunosController.confirm);
route.get('/alunos/register/:id', loginRequired, alunosController.editIndex);
route.post('/alunos/edit/:id', loginRequired, alunosController.edit);
route.get('/alunos/delete/:id', loginRequired, alunosController.delete);


//rotas para sair da página
route.get('/login/exist', loginController.exist);

module.exports = route;