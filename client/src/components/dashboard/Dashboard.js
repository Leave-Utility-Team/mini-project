import React, { Component } from 'react'
import Navbar from "./navbar/Navbar"
import Sidebar from './sidebar/Sidebar';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LeaveTracker from '../leave-tracker/LeaveTracker';
import Today from '../today/Today';
import Home from '../Home/Home';

class Dashboard extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Navbar />
                    <Sidebar />
                    <Switch>
                        <Route path="/Dashboard/Home" exact component={Home} />
                        <Route path="/Dashboard/today" component={Today} />
                        <Route path="/Dashboard/LeaveTracker" component={LeaveTracker} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Dashboard