var moment = require('moment');
var fs = require('fs');
const dbConfig = require('../database-confiq/config');
const connection = require('../database-confiq/connection');
const query = require('../database-confiq/query');
//const  dbConfig = require('../database-confiq')




module.exports = async () => {
    //async function calculate() {
    // await p;
    // var data = [
    //     Risk = [{ date: '2021-02-10' }]
    // ];


    var data = [[]];

    var a = moment('2021-03-05');
    var b = moment('2021-04-20');

    const conn = await connection(dbConfig).catch(e => { })


    for (var i = 1; i <= 3; i++) {
        // var teamName = await query(conn, 'SELECT  FROM department where dept_id=' + i).catch(console.log);)
        var requiredThreshold = await query(conn, 'SELECT threshold,dept_name FROM department where dept_id=' + i).catch(console.log);
        var totalMemberAllocated = await query(conn, 'select count(emp_id) as abc from emp_dept where dept_id =' + i);

        var add = {
            teamId: i,
            teamName: requiredThreshold[0].dept_name,
            threshold: requiredThreshold[0].threshold,
            current_threshold: 0,
            risk: []

        }

        data.push(add);
        //console.log('check =' + totalMemberAllocated[0].abc);


        //console.log("-------------------department " + i + "------------------");


        for (var m = moment(a); m.diff(b, 'days') <= 0; m.add(1, 'days')) {
            // console.log('on date', m.format('YYYY-MM-DD'));
            let empId = await query(conn, 'SELECT emp_id FROM leaves where "' + m.format('YYYY-MM-DD') + '" BETWEEN start_date AND end_date').catch(console.log);
            // console.log('this much employees are absent', empId);

            var employeeshortage = [];
            var count = 0;
            for (let j = 0; j < empId.length; j++) {
                // console.log(empId[j].emp_id + " in");

                let ok = await query(conn, 'SELECT * FROM emp_dept where emp_id =' + empId[j].emp_id + ' AND dept_id =' + i).catch(console.log);
                // console.log(ok.length + ' means');
                if (ok.length > 0) {
                    count++;
                    employeeshortage.push(empId[j].emp_id);
                }
            }
            // console.log("employee shortage on :", m.format('YYYY-MM-DD'));
            //  console.log(employeeshortage);
            var Risk = {

            }
            if (employeeshortage.length > 0) {
                //logic of threshold
                var temp = (((totalMemberAllocated[0].abc) * (requiredThreshold[0].threshold)) / 100);
                //console.log("chahiye " + temp + ' hai ' + ((totalMemberAllocated[0].abc) - count));
                if (temp > ((totalMemberAllocated[0].abc) - count)) {
                    //  console.log('this is risk day');
                    Risk = {
                        date: m.format('YYYY-MM-DD'),
                        employeeshortage: employeeshortage
                    }


                    //   console.log(Risk);
                    data[i]['current_threshold'] = ((((totalMemberAllocated[0].abc) - count) * 100) / (totalMemberAllocated[0].abc));
                    data[i].risk.push(Risk);




                }
            }
            if (data[i]['current_threshold'] == 0)
                data[i]['current_threshold'] = ((((totalMemberAllocated[0].abc) - count) * 100) / (totalMemberAllocated[0].abc));
        }


    }
    //console.log('final data');
    // console.log(data);
    // console.log(data[1].Risk)
    // console.log(data[3].Risk);
    // console.log("json" + JSON.stringify(data));

    data.shift();
    // console.log('date=' + moment().format('YYYY-MM-DD'));
    return data;

}
//calculate();