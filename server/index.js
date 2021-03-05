const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
var bodyParser = require("body-parser");
const app = express()
const jwt = require('jsonwebtoken')
let _router = express.Router();
app.use(express.json())
app.use(cors());



//for business logic
const AllRisk = require('./Business_logic/AllRisk');
const align_date = require('./Business_logic/align-date');
const saveLeave = require('./Business_logic/saveLeave');
//for post method
app.use(express.static("public"));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


const db = mysql.createConnection({
    // user: "root",
    // host: "localhost",
    // password: "1248",
    // database: "internship",
    host: 'remotemysql.com',

    // Get the User for DB from Environment or use default
    user: 'W9jGKSIVO9',

    // Get the Password for DB from Environment or use default
    password: 'Oy0t3OtVFu',

    // Get the Database from Environment or use default
    database: 'W9jGKSIVO9',

    dateStrings: 'date',
});


app.use("/api", _router);

const verifyJWT = (req, res, next) => {
    const token = req.headers['x-token']

    console.log(token)

    if (!token) {
        res.send("Authentication Failure! Access Denied!")
    }
    else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "Authentication error!" });
            }
            else {
                req.userId = decoded.id
                next()
            }
        })
    }
}

app.get('/isUserAuth', verifyJWT, (req, res) => {
    res.send("Yes you are an authenticated user!")
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username.length == 0 || password.length == 0)
        res.json({ auth: false, msg: "Username or password cannot be empty!" })
    else {

        db.query("SELECT * FROM employee WHERE emp_name = ?;", username, (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                db.query("SELECT emp_name,password FROM employee WHERE emp_name = ? and password = ?;", [username, password], (err, result1) => {
                    if (result1.length > 0) {
                        const id = result[0].emp_id;
                        const token = jwt.sign({ id }, "jwtSecret", {
                            expiresIn: 300,
                        })
                        res.json({ auth: true, result: result, token: token })
                    }
                    else {
                        res.json({ auth: false, msg: "Wrong Username/Password Combination" })
                    }
                })
            }
            else {
                res.json({ auth: false, msg: "User doesn't exist!" })
            }
        })
    }

})

_router.get('/getAllRisk', async (_request, _response) => {

    //console.log('callling...');
    let result = await AllRisk();

    _response.status(200)
        .send({ data: result });
});

app.post('/getSingleDepartment', (req, res) => {
    const deptId = req.body.deptId;
    db.query("SELECT dept_name, threshold from department where dept_id = ?;", deptId, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    })
})

app.post('/getLeaves', (req, res) => {
    eno = req.body.eno;
    //console.log(eno)
    db.query("SELECT start_date, end_date from leaves where emp_id = ?;", eno, (err, result) => {
        if (err) {
            res.send(err)
        }
        else {
            res.send(result)
        }
    })
})

app.get('/getRecords', (req, res) => {
    db.query("SELECT employee.emp_id, emp_name, DATE(start_date) as start_date, DATE(end_date) as end_date from employee, leaves where employee.emp_id = leaves.emp_id;", (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result)
        }
    })
})

app.get('/getDepartments', (req, res) => {
    db.query("SELECT dept_id, dept_name FROM department;", (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result)
        }
    })
})

app.post('/getEmployeeData', (req, res) => {
    const deptId = req.body.deptId;
    db.query("SELECT employee.emp_id,emp_name FROM emp_dept,employee where dept_id=? and emp_dept.emp_id = employee.emp_id;", deptId, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result)
        }
    })
})

app.post('/getEmpNamesFromId', (req, res) => {
    var names = []
    const ids = req.body.idArray;
    var len = ids.length;
    var i = 0;
    ids.map((value) => {
        db.query("SELECT emp_name from employee WHERE emp_id = ?;", value, (err, result) => {
            result.map(value => {
                names.push(value.emp_name);
                i++;
                if (i === len)
                    res.send(names)
            });
        })
    })
})

app.post("/saveLeave", (req, res) => {
    const { date } = req.body;
    const { empId } = req.body;

    //if (date[0] != NULL || date[0] == 0) {
    let _start = align_date(date[0]);
    let _end = align_date(date[1]);
    let today = new Date();
    let startCheck = new Date(date[0]);
    if (((startCheck.getMonth() + 1) >= (today.getMonth() + 1)) && ((startCheck.getDate()) >= (today.getDate()))) {
        console.log("start =" + _start);
        console.log("end =" + _end);
        console.log("employee =" + empId);

        saveLeave(_start, _end, empId)

        res.status(200)
            .send({ answer: 'leaves have Been Added' });
    }
    else {
        res.status(404)
            .send({ answer: "Invalid Date Selection, Please Try Again With Valid date" });
    }
    // } else {
    //     res.status(404)
    //         .send({ answer: "Date Could Not Be NULL" });
    // }


});

app.listen(3001, () => {
    console.log("Server started running!")
});