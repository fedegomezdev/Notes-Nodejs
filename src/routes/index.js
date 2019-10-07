const router = require('express').Router(); 

router.get('/', (req, res) =>{
    res.render('index.hbs');
})

router.get('/about' , (req,res) => {
    res.render('about.hbs');   //no hace falta que pongamos el .hbs porque ya lo confiuguramos antes
} )

module.exports = router;