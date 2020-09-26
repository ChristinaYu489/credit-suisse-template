import {
    Router
} from "express";
var router = Router();

function areZeroFront(arr, pos) {
    for (let i = 0; i <= pos; i++) {
        if (arr[i] != 0) return false;
    }
    return true;
}

function areZeroEnd(arr, pos) {
    for (let i = arr.length - 1; i >= pos; i--) {
        if (arr[i] != 0) return false;
    }
    return true;
}

function change(x) {
    if (x == 0) return 1;
    else return x - 1;
}

function fullZero(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        if (arr[i] != 0) return false;
    }
    return true;
}


router.post('/', function (req, res) {
    var test = req.body["tests"];

    let answer = {
        "answers": {}
    }
    for (var i = 0; test[i] != undefined; i++) {
        // console.log("round %d", i);
        answer.answers[i] = 0;

        let queue = [];
        let len = test[i]["floor"].length;
        let node = {
            pos: 0,
            move: 0,
            arr: test[i]["floor"].slice()
        }
        queue.push(node);
        while (queue.length > 0) {
            // console.log(queue);
            let start = queue.shift();
            // console.log("on +", start);
            if (start.pos > 0) {
                if (!areZeroFront(start.arr, start.pos)) {
                    let newArr = start.arr.slice();
                    newArr[start.pos - 1] = change(start.arr[start.pos - 1])
                    if (fullZero(newArr)) {
                        answer.answers[i] = start.move + 1;
                        break;
                    }
                    let newNode = {
                        pos: start.pos - 1,
                        move: start.move + 1,
                        arr: newArr
                    };
                    // console.log("added- ", newNode);
                    queue.push(newNode)
                }
            }
            if (start.pos < len - 1) {
                if (!areZeroEnd(start.arr, start.pos)) {
                    let newArr = start.arr.slice();
                    newArr[start.pos + 1] = change(start.arr[start.pos + 1])
                    if (fullZero(newArr)) {
                        answer.answers[i] = start.move + 1;
                        break;
                    }
                    let newNode = {
                        pos: start.pos + 1,
                        move: start.move + 1,
                        arr: newArr
                    };
                    // console.log("added+ ", newNode);
                    queue.push(newNode)
                }
            }
        }
    }
    // console.log(req,req.body)
    // console.log(tests);
    console.log(JSON.stringify(answer));
    res.send(JSON.stringify(answer));

});





module.exports = router;