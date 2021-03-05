var moment = require('moment');
var fs = require('fs');
const dbConfig = require('../database-confiq/config');
const connection = require('../database-confiq/connection');
const query = require('../database-confiq/query');
//const  dbConfig = require('../database-confiq')

// let p = new Promise(
//     (resolve, reject) => {
//         const handler = (error, result) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }
//             resolve(result);

//         }
//     });


//module.exports = async () => {
async function calculate() {
    // await p;
    var data;
    // fs.readFile('customers.json', 'utf8', function readFileCallback(err, data) {
    //     if (err)
    //         console.log(err);
    //     else {

    //         data = cb(JSON.parse(data));
    //         //console.log(obj);
    //     }

    // });

    data = [
        {
            teamId: 20,
            Risk: [
                date = '02-22-2021',
                employeeshortage = []
            ]
        }
    ]

    //data = fs.readFileSync('customers.json', 'utf8',);
    // console.log(JSON.parse(data));
    // data = JSON.parse(data);
    //var moment = require('moment');
    var a = moment('2021-02-25');
    var b = moment('2021-03-03');






    const conn = await connection(dbConfig).catch(e => { })

    //console.log(data);
    for (var i = 1; i <= 3; i++) {
        //data["teams"]["teamId"].push(i);
        //console.log(data["teams"][0].Risk);

        var requiredThreshold = await query(conn, 'SELECT threshold FROM department where dept_id=' + i).catch(console.log);
        var totalMemberAllocated = await query(conn, 'select count(emp_id) as abc from emp_dept where dept_id =' + i);

        console.log('check =' + totalMemberAllocated[0].abc);
        //requiredThreshold = parseInt(requiredThreshold);
        // totalMemberAllocated = parseInt(totalMemberAllocated);
        var add = {
            teamId: i,
            Risk: []
        }
        data.push(add);
        console.log("-------------------department " + i + "------------------");

        var index = 0;
        for (var m = moment(a); m.diff(b, 'days') <= 0; m.add(1, 'days')) {
            console.log('on date', m.format('YYYY-MM-DD'));
            let empId = await query(conn, 'SELECT emp_id FROM leaves where "' + m.format('YYYY-MM-DD') + '" BETWEEN start_date AND end_date').catch(console.log);
            console.log('this much employees are absent', empId);

            var employeeshortage = [];
            var count = 0;
            for (let j = 0; j < empId.length; j++) {
                console.log(empId[j].emp_id + " in");

                let ok = await query(conn, 'SELECT * FROM emp_dept where emp_id =' + empId[j].emp_id + ' AND dept_id =' + i).catch(console.log);
                console.log(ok.length + ' means');
                if (ok.length > 0) {
                    count++;
                    employeeshortage.push(empId[j].emp_id);
                }
            }
            console.log("employee shortage on :", m.format('YYYY-MM-DD'));
            console.log(employeeshortage);
            var Risk = {

            }
            if (employeeshortage.length > 0) {
                //logic of threshold
                let temp = (((totalMemberAllocated[0].abc) * (requiredThreshold[0].threshold)) / 100);
                console.log("chahiye " + temp + ' hai ' + ((totalMemberAllocated[0].abc) - count));
                if (temp > ((totalMemberAllocated[0].abc) - count)) {
                    console.log('this is risk day');
                    Risk = {
                        date: m.format('YYYY-MM-DD'),
                        employeeshortage: employeeshortage
                    }
                    // Risk.push(m.format('YYYY-MM-DD'));
                    // Risk["employeeshortage"].push(employeeshortage);
                    // index++;

                    console.log(Risk);
                    data[i].Risk.push(Risk);
                    //console.log('risk');
                    //console.log(Risk);
                }
            }
        }

        //data["teams"][i].Risk.push(employeeshortage);

        /* console.log(data["teams"][i]);
         console.log("risk Array data");
         console.log(data["teams"][i].Risk);*/
    }
    console.log('final data');
    console.log(data);
    console.log(data[1].Risk)
    console.log(data[3].Risk);

    return data;

}
calculate();