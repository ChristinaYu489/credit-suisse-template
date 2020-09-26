import { Router } from "express";
var router = Router();

router.post('/', function (req, res) {
    var basket = req.body;

    console.log(basket);
    let body = Math.round((Math.random()*30000+3)).toString();
    res.send(body);
});


module.exports = router;
