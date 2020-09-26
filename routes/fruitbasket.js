import { Router } from "express";
var router = Router();

router.post('/', function (req, res) {
    var basket = req.body;

    // console.log("My result is--> %s", req.body);
    let body = 240;
    res.send('240');
});


module.exports = router;
