const Login = require('../models/LoginModel');

exports.index = (req, res) => {
   if(req.session.admin) return res.render('login-logado');
   res.render('login');
};

exports.register = async (req, res) => {
   try{
      const login = new Login(req.body);
      await login.register();

      if(login.errors.length > 0) {
         req.flash('errors', login.errors);
         req.session.save(function() {
            return res.redirect('/login/index#register');
         });

         return;
      }

      req.flash('success', 'Admin criado com sucesso.');
      req.session.save(function() {
         return res.redirect('/login/index');
      });

   } catch(e) {
      console.log(e);
      return res.render('404');
   }
};


exports.login = async (req, res) => {
   try{
      const logar = new Login(req.body);
      await logar.login();

      if(logar.errors.length > 0) {
            req.flash('errors', logar.errors);
            req.session.save(function() {
                return res.redirect('/login/index');
            });

            return;
        }

        req.flash('success', 'Você entrou no seu sistema.');
        req.session.admin = logar.admin;
        req.session.save(function() {
          return res.redirect('/login/index');
        });
   
   } catch(e) {
      console.log(e);
      return res.render('404');
   }
};

exports.exist = (req, res) => {
   res.render('logout');
};

exports.logout = function(req, res) {
   req.session.destroy();
   res.redirect('/');
};

exports.reset = (req, res) => {
   res.render('redefinir-senha');
};

exports.confirm = async(req, res) => {
   try{
      const reset = new Login(req.body);
      await reset.resetPassword();

      if(reset.errors.length > 0) {
            req.flash('errors', reset.errors);
            req.session.save(function() {
                return res.redirect('/login/redefinir');
            });

            return;
        }

        req.flash('success', 'Senha alterada com sucesso. Faça login novamente.');
        
        req.session.save(function() {
          return res.redirect('/login/index');
        });
      
      } catch(e) {
      console.log(e);
      return res.render('404');
      }
};