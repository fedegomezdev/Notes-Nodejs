const helpers = {};

helpers.isAuthenticated = (req, res, next) => { //isAuthenticated es el nombre del metodo que le doy yo, no tiene que ver con lo de abajo aunque coinciden
    if(req.isAuthenticated()) {  //isAuthenticated es una funcion que viene desde passport, me devuelve un true o false
        return next();
    }
    req.flash('error_msg', 'No autorizado');
    res.redirect('/users/signin');
} 


module.exports = helpers;