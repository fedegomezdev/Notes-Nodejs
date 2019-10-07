const router = require('express').Router(); 

router.get('/notes/add' , (req, res) => {
    res.render('notes/newNote');
})

router.post('/notes/new-note', (req, res) => {
    const {title, description } = req.body;
    const errors = [];
    if(!title){
        errors.push({text:'Titulo requerido'})
    }
    if(!description){
        errors.push({text:'Descripcion requerida'})
    }
    if (errors.length > 0 ){
        res.render('notes/newNote', {
            errors,
            title,
            description
        })
    } else {
        res.send('ok'); }
})

router.get('/notes', (req, res) => {
    res.send('notes desde la db');
})

module.exports = router;