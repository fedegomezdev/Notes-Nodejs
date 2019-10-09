const router = require('express').Router(); 
const Note = require('../models/Notes');

router.get('/notes/add' , (req, res) => {
    res.render('notes/newNote');
})

router.post('/notes/new-note', async (req, res) => {
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
       console.log(newNote);
       await newNote.save(); //recien ahi se guarda
       req.flash('success_msg', 'Nota Guardada');
       res.redirect('/notes');
    }
})

router.get('/notes', async (req, res) => {
   const notes = await Note.find().sort({date: 'desc'}); //que encuentre las notas y las ordena por fecha de manera descendiente
   res.render('notes/allNotes' , {
       notes
   })
})

router.get('/notes/edit/:id', async(req, res) => {
    const note = await Note.findById(req.params.id)
    res.render('notes/editNote', {note});
})

router.put('/notes/edit-note/:id', async(req,res) => {
    const {title , description } = req.body;
    const note = await Note.findByIdAndUpdate(req.params.id , {title, description});
    req.flash('success_msg', 'Nota Actualizada');
    res.redirect('/notes');
})

router.delete('/notes/delete/:id', async(req, res) => {
    await Note.findOneAndRemove(req.params.id);
    req.flash('success_msg', 'Nota Eliminada');

    res.redirect('/notes');
})

module.exports = router;