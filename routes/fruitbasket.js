import { Router } from "express";
var router = Router();

router.post('/', function (req, res) {
    var basket = req.body;
    console.log(basket);
    var data = JSON.stringify(req.body);
    console.log(data);

    let body = Math.round((Math.random()*12000+3)).toString();
    console.log({"guess": body});
    res.send(body);
});


module.exports = router;
