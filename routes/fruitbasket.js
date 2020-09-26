import { Router } from "express";
var router = Router();

router.post('/', function (req, res) {
    var basket = req.body;

    console.log(basket);
    console.log(req.body);
    let body = 240;
    res.send('5000');
});


module.exports = router;
