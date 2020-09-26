import {
    Router
} from "express";
var router = Router();

function hasOne(arr){
    for(let i=0;i<arr.length;i++){
        if(arr[i]=="1") return true;
    }
    return false;
}

router.post('/', function (req, res) {
    var area = req.body;

    var clen = area.length;
    var rlen = area[0].length;
    var visit = [];
    var cluster = []
    var pos = -1;
    var c = [-1, 0, 1, -1, 1, -1, 0, 1]
    var r = [-1, -1, -1, 0, 0, 1, 1, 1]

    for (let i = 0; i < clen; i++) {
        var arr = []
        for (let j = 0; j < rlen; j++) {
            if (area[i][j] == '*') arr.push(true);
            else arr.push(false);
        }
        visit.push(arr);
    }

    // console.log(visit);
    // console.log(clen, rlen);

    for (let i = 0; i < clen; i++) {
        for (let j = 0; j < rlen; j++) {
            if (!visit[i][j]) {
                cluster.push([]);
                visit[i][j] = true;
                pos++;
                let queue = [];
                queue.push([i, j]);
                cluster[pos].push(area[i][j]);
                while(queue.length>0){
                    // console.log(queue);
                    let crt = queue.shift();
                    let ni = crt[0], nj = crt[1];
                    for (let k = 0; k < 8; k++) {
                        if (nj + r[k] >= 0 && nj + r[k] < rlen && ni + c[k] >= 0 && ni + c[k] < clen && 
                            area[ni + c[k]][nj + r[k]] != '*' && visit[ni + c[k]][nj + r[k]]==false) {
                                queue.push([ni+c[k],nj+r[k]]);
                                cluster[pos].push(area[ni+c[k]][nj+r[k]]);
                                visit[ni+c[k]][nj+r[k]] = true;
                                // console.log("added [%d, %d]",ni+c[k],nj+r[k]);
                        }
                    }
                }
            }
        }
    }

    console.log(cluster);

    let answer = 0;
    for(let i=0;i<cluster.length;i++){
        if(hasOne(cluster[i])) answer++;
    }


    res.send({
        "answer": answer
    });
});


module.exports = router;