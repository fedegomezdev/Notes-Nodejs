const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const methodOverraid = require('method-override');
const session = require('express-session');

//inicializacion
const app = express();
require('./database');

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
app.use(methodOverraid()); //para q los formularios puedan mandar tmb put y cosas asi no solo post y get
app.use(session({
    secret:'mysecretapp',
    resave: true,
    saveUninitialized: true
}))

//global variables


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