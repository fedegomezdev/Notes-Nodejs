const router = require('express').Router(); 
const User = require('../models/User');


router.get('/users/signin', (req, res) => {
    res.render('users/signin');
})

router.get('/users/signup', (req,res) => {
    res.render('users/signup');
})

router.post('/users/signup', async (req, res) => {
    const {name , email, password, confirm_password } = req.body;
    const errors = [];
    if( password !== confirm_password ){
        errors.push({ text: 'Las contra no coinciden' });
    }
    if (password.length < 5){
        errors.push({text:'Contraseña demasiado corta'});
    }
    if(errors.length > 0 ){
        res.render('users/signup', {errors, name, email, password, confirm_password});
    }else {
      const userEmail = await User.findOne({email : email}); //me busca si en la base de datos ya hay un mail asi
      if (userEmail) { 
            req.flash('error_msg', 'El email ya esta en uso')
            res.redirect('users/signup');
    };
      const newUser =  new User({name, email, password});
      newUser.password = await newUser.encriptar(password);
      await newUser.save();
      req.flash('success_msg', 'Registrado  satisfactoriamente');
      res.redirect('/users/signin');
    }
})

module.exports = router;