import {
    Router
} from "express";
var router = Router();

function pminus(a, b){
    return {
        "x": a.x - b.x,
        "y":a.y - b.y
    }
}

function pplus(a,b){
    return {
        "x": a.x + b.x,
        "y":a.y + b.y
    }
}

function sgn(x){
}

function mult(p0, p1, p2){
    return (p1.x-p0.x)*(p2.y-p0.y)-(p2.x-p0.x)*(p1.y-p0.y);
}

function judge(p1,p2, q1,q2){
    let temp1 = (p1.x-q1.x)*(q2.y-q1.y)-(p1.y-q1.y)*(q2.x-q1.x);
    let temp2 = (p2.x-q1.x)*(q2.y-q1.y)-(p2.y-q1.y)*(q2.x-q1.x);

    if((temp1==0)&&(temp2!=0)){
        return {"x":p1.x,"y":p1.y}
    }
    else if (temp1!=0 && temp2==0){
        return {"x":p2.x,"y":p2.y}
    }
    else if((temp1==0&&temp2==0) || (temp1*temp2>0)){
        return {}
    }
    else if (temp1*temp2<0){
        var k0,k1, b0,b1;
        if(p1.x == p2.x){
            let k1 = (q2.y-q1.y)/(q2.x-q1.x);
            let b1 = q1.y-k1*q1.x;
            console.log(q1, q2, k1,b1);
            return {"x": p1.x,"y":(k1*p1.x+b1)}
        }
        if(q1.x==q2.x){
            k0 = (p2.y-p1.y)/(p2.x-p1.x);
            b0 = p1.y-k1*p1.x;
            return {"x":q1.x,"y": k0*q1.x+b0}
        }
        if(p1.y==p2.y){
            k1 = (q2.y-q1.y)/(q2.x-q1.x);
            b1 = q1.y-k1*q1.x;
            return {"x":(p1.y-b1)/k1,"y":p1.y}
        }
        if(q1.y==q2.y){
            k0 = (p2.y-p1.y)/(p2.x-p1.x);
            b0 = p1.y-k1*p1.x;
            return {"x":(q1.y-b0)/k0,"y":q1.y}
        }
        k0 = (p2.y-p1.y)/(p2.x-p1.x);
            b0 = p1.y-k0*p1.x;
            k1 = (q2.y-q1.y)/(q2.x-q1.x);
            b1 = q1.y-k1*q1.x;
            let x = (b1-b0)/(k0-k1);
            let y = x*k0+b0;
            return {"x":x,"y":y}
    }
}


router.post('/', function (req, res) {
    var line = req.body['lineCoordinates'];
    var shape = req.body['shapeCoordinates'];

    let result = [];
    let len = shape.length;
    for (var i =0; i<= len;i++){
        let tempRes = judge(shape[i%len],shape[(i+1)%len],line[0],line[1]);
        console.log(tempRes)
        tempRes.x = Math.round(tempRes.x * 100) / 100;
        tempRes.y = Math.round(tempRes.y * 100) / 100;
        if(tempRes.x && !result.find(e => tempRes.x==e.x&&tempRes.y==e.y)){
            result.push(tempRes);
        }
    }

    console.log("My result--> %s", result);
    res.send(result);
});

module.exports = router;