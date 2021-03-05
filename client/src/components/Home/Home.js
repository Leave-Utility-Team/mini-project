import React, { Component } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import "./Home.css"
import Axios from 'axios';
import Calender from '../Risk-calender/Risk-calender'

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            rawdata: [],
            department: [],
            isDataSet: false,
            setDepartment: false,
            setEmployee: false,
            employee: [],
            singleDept: [],
            setSingleDept: false,
            id: 0
        })
    }

    async showRecords() {
        var res;
        await Axios.get('http://localhost:3001/getRecords').then(response => {
            res = response.data;
            this.setState({
                rawdata: res,
                isDataSet: true,
            })
        });
    }

    async getDepartments() {
        var res;
        await Axios.get('http://localhost:3001/getDepartments').then(response => {
            res = response.data;
            this.setState({
                department: res,
                setDepartment: true,
            })
        })

    }

    async getSingleDepartment(value) {
        const departmentID = value;
        var res;
        await Axios.post('http://localhost:3001/getSingleDepartment', {
            deptId: departmentID,
        }).then(response => {
            res = response.data;
            this.setState({
                singleDept: res,
                setSingleDept: true,
            }, () => console.log("Deparment : ", this.state.singleDept))
        })
    }

    async getEmployeeData(e) {
        var res;
        this.getDeptId(e);
        const value = e.target.value;
        this.getSingleDepartment(value);
        await Axios.post('http://localhost:3001/getEmployeeData', {
            deptId: value,
        }).then(response => {
            res = response.data;
            this.setState({
                employee: res,
                setEmployee: true,

            }, () => console.log("Deparment : ", this.state.singleDept))
        })
    }

    componentDidMount() {
        this.showRecords()
        this.getDepartments()
    }
    getDeptId(e) {
        var val = e.target.value;
        this.setState({
            id: val,
        })
    }


    render() {
        return (
            <div className="home" >
                {this.state.setSingleDept && this.state.singleDept.map((value, index) => {
                    return (

                        <p > Threshold &nbsp;&nbsp;= {value.threshold}%</p>

                    )

                })
                }
                <div className="drop-down">
                    <p> Select Team </p>
                    <select>
                        <option selected>--select--</option>
                        {this.state.setDepartment && this.state.department.map((value, index) => {
                            return (
                                <option key={index} value={value.dept_id} onClick={(e) => this.getEmployeeData(e)}>{value.dept_name}</option>
                            )
                        })}
                    </select>
                </div>

                <Calender id={this.state.id} />
                <div className="team-wise-employee">
                    Team Wise Employees
                    {/* <ReactBootStrap.Table> */}
                    <table className="tab">
                        {this.state.setEmployee &&
                            <thead>
                                <tr>
                                    <th>Name</th>
                                </tr>
                            </thead>}
                        <tbody>
                            {this.state.setEmployee && this.state.employee.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{value.emp_name}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                    {/* </ReactBootStrap.Table> */}
                </div>

            </div >
        );
    }
}

export default Home
