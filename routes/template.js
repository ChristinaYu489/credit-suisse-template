import { Router } from "express";
var router = Router();

router.post('/', function (req, res) {
    var n = req.body['number_of_salads'];

    res.send({"result":result});
});


module.exports = router;
