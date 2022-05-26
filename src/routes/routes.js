const { Router } = require('express');
const router = Router();

// routes
router.get('/', (req, res) =>{
    res.status(404).json({error:'Wrong Request: Method Not Allowed'});
})

router.post('/', (req, res) =>{
    res.status(404).json({error:'Wrong Request: Method Not Allowed'});
})

module.exports = router;