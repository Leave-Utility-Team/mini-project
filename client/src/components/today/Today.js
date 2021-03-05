import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment'
import './Today.css';


class Today extends Component {

    constructor(props) {
        super(props)

        this.state = {
            persons: [],
            isLoaded: false,
            today: moment().format('YYYY-MM-DD')
        }
    }
    // componentDidUpdate() {

    //     axios.get(`http://localhost:3001/api/getAllRisk`)
    //         .then(res => {
    //             const persons = res.data;
    //             console.log(persons.data)
    //             this.setState({
    //                 persons: persons.data,
    //                 isLoaded: true
    //             });
    //         },
    //             // Note: it's important to handle errors here
    //             // instead of a catch() block so that we don't swallow
    //             // exceptions from actual bugs in components.
    //             (error) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     error
    //                 });
    //             }

    //         );


    //     //})

    //     console.log("rohit", this.state.today);
    // }

    componentDidMount() {

        axios.get(`http://localhost:3001/api/getAllRisk`)
            .then(res => {
                const persons = res.data;
                console.log(persons.data)
                this.setState({
                    persons: persons.data,
                    isLoaded: true
                });
            },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }

            );


        //})

        console.log("rohit", this.state.today);
    }
    render() {
        if (this.state.isLoaded == false)
            return (
                <div>
                    <center>
                        <h2>Loading</h2>
                    </center>
                </div>
            ); else
            return (
                <div className="main">
                    <section className="align">
                        <h2>TODAY'S RISK</h2>

                        <div className="tbl-header">
                            <table cellPadding="0" cellSpacing="0" border="0">
                                <thead>
                                    <tr>
                                        <th>Team_Name</th>
                                        <th>Threshold</th>
                                        <th>Risk</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        <div className="tbl-content">
                            <table cellPadding="0" cellSpacing="0" border="0">
                                {this.state.persons.map(f => {
                                    var ok = true;
                                    return (
                                        <tbody>
                                            {
                                                f.risk.map(k => {
                                                    if (k.date == this.state.today)
                                                        return (
                                                            <tr>
                                                                <td>{f.teamName}</td>
                                                                <td>{f.current_threshold}</td>
                                                                <td>YES</td>
                                                                {ok = false}
                                                            </tr>
                                                        )
                                                })}
                                        </tbody>
                                    )
                                })}

                            </table>
                        </div>
                        <h2 className="highlight">HIGHLIGHT ALL RISKS</h2>
                        <div className="tbl-header">
                            <table cellPadding="0" cellSpacing="0" border="0">
                                <thead>
                                    <tr>
                                        <th>Team</th>
                                        <th>Date</th>
                                        <th>Actual_Threshold</th>
                                        <th>Expected_Threshold</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        <div className="tbl-content">
                            <table cellPadding="0" cellSpacing="0" border="0">
                                {this.state.persons.map(f => {
                                    return (
                                        <tbody>{/* use key here */}
                                            {f.risk.map(k => {
                                                return (
                                                    <tr>
                                                        <td>{f.teamName}</td>
                                                        <td>{k.date}</td>
                                                        <td>{f.current_threshold}</td>
                                                        <td>{f.threshold}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    )
                                })}

                            </table>
                        </div>
                    </section>
                </div >
            )
    }
}
//}
export default Today
