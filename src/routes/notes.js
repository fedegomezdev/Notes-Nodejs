const router = require('express').Router(); 
const Note = require('../models/Notes');

const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add' , isAuthenticated , (req, res) => {  //cuando pedimos eso, primero se fija si esta autenticado , en caso que no redirecciona
    res.render('notes/newNote');                            //en caso de que si, continua con lo de req,res
})

router.post('/notes/new-note', isAuthenticated , async (req, res) => {
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
       const newNote = new Note({title, description});    
       newNote.user = req.user.id; //al momento que passport guarda el usuario guarda todo en req.user, y ahi pedimos el id
       await newNote.save(); //recien ahi se guarda
       req.flash('success_msg', 'Nota Guardada');
       res.redirect('/notes');
    }
})

router.get('/notes', isAuthenticated ,async (req, res) => {
   const notes = await Note.find({user: req.user.id}).sort({date: 'desc'}); //que encuentre las notas y las ordena por fecha de manera descendiente
   res.render('notes/allNotes' , {                                          //ademas queremos solo las notas con las que el usuario se autentico    
       notes
   })
})

router.get('/notes/edit/:id', isAuthenticated ,async(req, res) => {
    const note = await Note.findById(req.params.id)
    res.render('notes/editNote', {note});
})

router.put('/notes/edit-note/:id', isAuthenticated ,async(req,res) => {
    const {title , description } = req.body;
    const note = await Note.findByIdAndUpdate(req.params.id , {title, description});
    req.flash('success_msg', 'Nota Actualizada');
    res.redirect('/notes');
})

router.delete('/notes/delete/:id', isAuthenticated ,async(req, res) => {
    await Note.findOneAndRemove(req.params.id);
    req.flash('success_msg', 'Nota Eliminada');

    res.redirect('/notes');
})

module.exports = router;