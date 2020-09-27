import { Router } from "express";
var router = Router();

router.post('/', function (req, res) {
    var test = req.body["tests"];
    console.log(test);

    let answer = {
        "answers": {}
    }
    for (var k = 0; k <= 100; k++) {
        if(test[k] != undefined){
            var ppl = test[k]["people"];
            var seat = test[k]["seats"];
            var dist = test[k]["spaces"];
            var dp = [];

            var box = ppl+1;
            var base = ppl + (ppl-1)*(dist-1);
            console.log("base = %d", base);
            var rest = seat - base+2;
            var ans = 1;
            for(let i=0; i< box-1;i++){
                ans = (ans * (rest-1-i));
                console.log("x %d ",(rest-1-i));
            } 
            for(let i = box-1; i >0;i--){
                ans = (ans / i)
                console.log("/ %d ",i);
            }

            // for(let i=0;i<=numPPL;i++){
            //     let arr = [];
            //     for(let j=0;j<=numSeat;j++){
            //         arr.push(0);
            //     }
            //     dp.push(arr);
            // }
            
            // for(let i=0;i<=numSeat;i++){
            //     dp[dist][i] = i;
            // }
            
            // for(let i=2;i<=numPPL;i++){
            //     for(let j=1;j<=numSeat;j++){
            //         dp[i][j]+=dp[i][j-1];
            //         if(j >= dist + 1){
            //             dp[i][j] += dp[i - 1][j - dist - 1];
            //         }
            //     }
            // }
            console.log(dp);
            answer["answers"][k] = ans;
            // answer["answers"][k] = dp[numPPL][numSeat];
        }
    }


    // res.send({"result":test});
    res.send(answer);
});


module.exports = router;
