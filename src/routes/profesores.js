const {Router} = require('express');
const router = Router();
const _ = require('underscore');

const profesores = require('../profesores.json');

function validateData(profesor){
    let errors = 0;
    errors += (typeof profesor.numeroEmpleado === 'number');
    errors += (typeof profesor.nombres === 'string');
    errors += (typeof profesor.apellidos === 'string');
    errors += (typeof profesor.horasClase === 'number');
    return errors === 4;
}

router.get('/:id', (req, res) => {
    const { id } = req.params;
    let select_profesor = undefined;
    if ( id ){
        _.each(profesores, (profesor, i) => {
            if (profesor.id == id) {
                select_profesor = profesor;
                //res.json(profesor);
            }
        });
        if (select_profesor){
            res.json(select_profesor);
        } else {
            res.status(404).json({error:'Wrong Request: Not Found'});
        }
    }
});

router.get('/', (req, res) => {
        res.status(200).json(profesores);
});

router.post('/', (req, res) => {
    const id = profesores.length + 1;
    const {numeroEmpleado, nombres, apellidos, horasClase} = req.body;
    const nuevoprofesor = { id, ...req.body};
    const dataIsValid = validateData({numeroEmpleado, nombres, apellidos, horasClase});
    if (!dataIsValid){
        res.status(400).json({error: 'Invalid Request Format.'});
    } else if(numeroEmpleado, nombres, apellidos, horasClase){
        profesores.push(nuevoprofesor);
        res.status(201).json(profesores);
    } else {
        res.status(500).json({error:'Wrong Request'});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;
    let dataIsValid = validateData({numeroEmpleado, nombres, apellidos, horasClase});
    if (!dataIsValid){
        res.status(400).json({error: 'Invalid Request Format.'});
    } else if ( id && numeroEmpleado && nombres && apellidos && horasClase) {
        _.each(profesores, (profesor, i) => {
            if (profesor.id == id) {
                profesor.numeroEmpleado = numeroEmpleado;
                profesor.nombres = nombres;
                profesor.apellidos = apellidos;
                profesor.horasClase = horasClase;
            }
        });
        res.status(200).json(profesores);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    let select_profesor = undefined;
    if (id) {
        _.each(profesores, (profesor) => {
            if (profesor.id == id) {
                select_profesor = profesor;
            }
        });
        if (select_profesor){
            profesores.splice(profesores.indexOf(select_profesor), 1);
            res.status(200).json(profesores);
        } else {
            res.status(404).json({error:'Wrong Request: Not Found'});
        }
    } 
});

module.exports = router;