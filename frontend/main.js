import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login.js';
import Aluno from './modules/Aluno.js';

const login = new Login('.form-login');
login.init();

const cadastro = new Login('.form-cadastro');
cadastro.init();

const redefinir = new Login('.form-redefinir-senha');
redefinir.init();

const aluno = new Aluno('.form-aluno');
aluno.init();