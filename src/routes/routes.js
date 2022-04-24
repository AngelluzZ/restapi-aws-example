const { Router } = require('express');
const router = Router();

// routes
router.get('/test', (req, res) =>{
    const data = {
        "name" : "Angel",
        "twitter" : "@AngelSoas"
    };
    res.json(data.name);
})

module.exports = router;