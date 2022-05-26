const express = require('express');
const app = express();
const morgan = require('morgan');

// settings
app.set('port', process.env.PORT || 8080)
app.set('json spaces', 2)

// middlewares
//app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
//app.use(require('./routes/routes'))
app.use('/alumnos',require('./routes/alumnos'))
app.use('/profesores',require('./routes/profesores'))
app.use('/',require('./routes/routes'))
app.use(function(req, res) {
    res.status(404).json({error:'Wrong Request'});
});

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})
