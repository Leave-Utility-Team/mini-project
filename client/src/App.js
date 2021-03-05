import Login_Register from "./components/login-register/Login_Register";
import './App.css';
import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/Login' exact component={Login_Register} />
            <Route path='/Dashboard' component={Dashboard} />
          </Switch>
        </BrowserRouter>
        {/* <Login_Register /> */}
      </div>
    );
  }
}

export default App;