import { Router } from "express";
var router = Router();

router.post('/', function (req, res) {
    var n = req.body['number_of_salads'];
    var s = req.body['salad_prices_street_map'];

    let clen = s.length;
    let rlen = s[0].length;
    let min = 500000;

    for(let i=0; i <clen;i++){
        
        for(let j = 0; j <= rlen-n;j++){
            var sum = 0;
            var size = 0;
            if(s[i][j]!="X"){
                for(let k=j; k<j+n && s[i][k]!="X";k++){
                    sum+=parseInt(s[i][k]);
                    size++;
                }
                // console.log("(%d,%d), %d --> %d",i, j, size, sum);
                if(size == n && sum< min ){
                    min = sum;
                }
            }
        }
    }


    if(min == 500000){
        min = 0;
    }

    let result = min;
    // console.log("My result is--> %s", req.body);
    res.send({"result":result});
});


module.exports = router;
