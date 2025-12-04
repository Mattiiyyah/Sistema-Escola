require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    console.log('Conectado à base de dados.');
    app.emit('pronto');
  })
  .catch(e => console.log('ERRO DE CONEXÃO:', e)); // Adicionei um texto para destacar o erro

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

// Configuração do Helmet permitindo scripts externos (Bootstrap, etc)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // Permite arquivos do próprio servidor
      scriptSrc: [
        "'self'", 
        "https://cdn.jsdelivr.net", // Bootstrap 5 e Popper.js
        "https://code.jquery.com",  // jQuery (se usar)
        "https://cdnjs.cloudflare.com" // Outras libs comuns
      ],
      styleSrc: [
        "'self'", 
        "'unsafe-inline'", // Necessário para alguns estilos inline do Bootstrap
        "https://cdn.jsdelivr.net", 
        "https://fonts.googleapis.com", // Google Fonts
        "https://cdnjs.cloudflare.com"
      ],
      imgSrc: [
        "'self'", 
        "data:", // Permite imagens em base64
        "https:" // Permite imagens de qualquer site HTTPS (útil para avatares)
      ],
      fontSrc: [
        "'self'", 
        "https://fonts.gstatic.com", // Fontes do Google carregadas no CSS
        "https://cdnjs.cloudflare.com",
        "https://cdn.jsdelivr.net"
      ],
    },
  },
}));

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
app.use(middlewareGlobal); // Variáveis globais (ex: usuário logado, mensagens de erro)
app.use(checkCsrfError);   // Checa se o token de segurança é válido
app.use(csrfMiddleware);   // Envia o token para todas as páginas

// Rotas da aplicação
app.use(routes);

// Inicialização do Servidor (só inicia depois de conectar no BD)
app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});