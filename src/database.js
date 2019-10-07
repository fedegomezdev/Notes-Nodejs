const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notesapp', {
    useCreateIndex: true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db conectada');
});

