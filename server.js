require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    console.log('Conectado à base de dados.');
    app.emit('pronto');
  })
  .catch(e => console.log('ERRO DE CONEXÃO:', e)); 

// Importação de Sessões e Flash Messages
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

// Rotas e Caminhos
const routes = require('./routes');
const path = require('path');

// Segurança
const helmet = require('helmet');
const csrf = require('csurf');

// Importação dos seus Middlewares (que você ainda vai criar/ajustar)
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middlewares.js');

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        // Mantém as configurações padrão de segurança
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        
        // Permite scripts do site e do CDN (Bootstrap)
        "script-src": ["'self'", "https://cdn.jsdelivr.net"],
        
        // Permite estilos (CSS) do site e do CDN
        "style-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        
        // Permite conexões (como os ficheiros .map) ao CDN
        "connect-src": ["'self'", "https://cdn.jsdelivr.net"],
        
        // Opcional: Permite imagens do CDN, caso o Bootstrap precise
        "img-src": ["'self'", "data:", "https://cdn.jsdelivr.net"] 
      },
    },
  })
);


// Tratamento de dados de formulário (body-parser)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Arquivos Estáticos (CSS, Imagens, JS do front)
app.use(express.static(path.resolve(__dirname, 'public')));

// Configuração da Sessão
const sessionOptions = session({
    secret: 'sistema-escolinha-secreto',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

// Configuração da View Engine (EJS)
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Configuração do CSRF
app.use(csrf());

// Nossos Middlewares Próprios
app.use(middlewareGlobal); 
app.use(checkCsrfError);  
app.use(csrfMiddleware);   

// Rotas da aplicação
app.use(routes);

// Inicialização do Servidor (só inicia depois de conectar no BD)
app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});