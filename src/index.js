const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const methodOverraid = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//inicializacion
const app = express();
require('./database');
require('./config/passport');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); //aca van los html o handlebars
app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials') ,
    extname:'.hbs'
}) );

app.set('view engine', '.hbs');

//middlewares
app.use(express.urlencoded({extended:false})) //para entender los datos q se envian ej de formularios
app.use(methodOverraid("_method")); //para q los formularios puedan mandar tmb put y cosas asi no solo post y get
app.use(session({
    secret:'mysecretapp',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize()); //tiene que ir desp del middleware session
app.use(passport.session())

app.use(flash());


//global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null ; //passport cuanto se autentican guarda la info dle usuario en un objeto req (null si no esta autenticado pusimos)
    next();
})

//routes
app.use(require('./routes/index')); //con esto le hacemos saber al sv que ahi estan las routes
app.use(require('./routes/notes'));
app.use(require('./routes/users'));


//static files
app.use(express.static(path.join(__dirname, 'public'))); //le decimos donde esta la carpeta static

//server start
app.listen(app.get('port'), ()=> {
    console.log('server on port' , app.get('port'));
})