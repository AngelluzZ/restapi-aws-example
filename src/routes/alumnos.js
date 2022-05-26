const {Router} = require('express');
const router = Router();
const _ = require('underscore');

const alumnos = require('../alumnos.json');

function validateData(alumno){
    let errors = 0;
    errors += (typeof alumno.nombres === 'string');
    errors += (typeof alumno.apellidos === 'string');
    errors += (typeof alumno.matricula === 'string');
    errors += (typeof alumno.promedio === 'number');
    return errors === 4;
}

router.get('/:id', (req, res) => {
    const { id } = req.params;
    let select_alumno = undefined;
    if ( id ){
        _.each(alumnos, (alumno, i) => {
            if (alumno.id == id) {
                select_alumno = alumno;
                //res.json(alumno);
            }
        });
        if (select_alumno){
            res.json(select_alumno);
        } else {
            res.status(404).json({error:'Wrong Request: Not Found'});
        }
    }
});

router.get('/', (req, res) => {
        res.status(200).json(alumnos);
});

router.post('/', (req, res) => {
    const id = alumnos.length + 1;
    const {nombres, apellidos, matricula, promedio} = req.body;
    const nuevoAlumno = { id, ...req.body};
    const dataIsValid = validateData({nombres, apellidos, matricula, promedio});
    if (!dataIsValid){
        res.status(400).json({error: 'Invalid Request Format.'});
    } else if(nombres, apellidos, matricula, promedio){
        alumnos.push(nuevoAlumno);
        res.status(201).json(alumnos);
    } else {
        res.status(500).json({error:'Wrong Request'});
    }
});

router.delete('/', (req, res) => {
    res.status(405).json({error:'Wrong Request: Method Not Allowed'});
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, matricula, promedio } = req.body;
    let dataIsValid = validateData({nombres, apellidos, matricula, promedio});
    if (!dataIsValid){
        res.status(400).json({error: 'Invalid Request Format.'});
    } else if ( id && nombres && apellidos && matricula && promedio) {
        _.each(alumnos, (alumno, i) => {
            if (alumno.id == id) {
                alumno.nombres = nombres;
                alumno.apellidos = apellidos;
                alumno.matricula = matricula;
                alumno.promedio = promedio;
            }
        });
        res.status(200).json(alumnos);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    let select_alumno = undefined;
    if (id) {
        _.each(alumnos, (alumno) => {
            if (alumno.id == id) {
                select_alumno = alumno;
            }
        });
        if (select_alumno){
            alumnos.splice(alumnos.indexOf(select_alumno), 1);
            res.status(200).json(alumnos);
        } else {
            res.status(404).json({error:'Wrong Request: Not Found'});
        }
    } 
});

module.exports = router;