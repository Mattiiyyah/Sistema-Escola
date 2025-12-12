import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login.js';

const login = new Login('.form-login');
login.init();

const cadastro = new Login('.form-cadastro');
cadastro.init();

