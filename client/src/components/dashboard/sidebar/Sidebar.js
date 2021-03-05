import React, { Component } from 'react'
import "./Sidebar.css";
import logo from "../../../assets/logo.png";
import { Link } from 'react-router-dom';

//this class is usefull for sidebar creation

class Sidebar extends Component {

    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         showDropdown: false
    //     }
    // }

    // dropdown = () => {

    //     this.setState({
    //         showDropdown: !this.state.showDropdown
    //     })

    // }

    render() {
        //let btn_class = this.state.showDropdown ? "show" : "noshow";
        return (
            <div className=" " id="sidebar">
                <div className="sidebar__title">
                    <div className="sidebar__img">
                        {<img src={logo} alt="logo" />}
                        <h1>Akhil</h1>
                    </div>
                    <i
                        className="fa fa-times"
                        id="sidebarIcon"
                    ></i>
                </div>
                <div className="sidebar__menu">
                    <div className="sidebar__link active_menu_link">
                        <i className="fa fa-home"></i>

                        <Link to="/Dashboard/Home">
                            <a href="/">Dashboard</a>
                        </Link>
                    </div>

                    <div className="sidebar__link">
                        <i className="fa fa-user-secret" aria-hidden="true"></i>
                        <Link to="/Dashboard/today">
                            <a href="#">Today</a>
                        </Link>
                    </div>



                    {/* <div className="sidebar__link">
                        <i className="fa fa-building-o"></i>
                        <button class="dropdown-btn" onClick={this.dropdown}>Reports
                        <i class="fa fa-caret-down"></i>
                        </button>

                        <div className={btn_class}>
                            <ul>
                                <li><a>Resource wise </a></li>
                                <li><a>Team Wise</a></li>
                            </ul>
                        </div>
                    </div> */}
                    {/* <div className="sidebar__link">
                        <i className="fa fa-wrench"></i>
                        <a href="#">Team Control</a>
                    </div> */}
                    <div className="sidebar__link">
                        <i className="fa fa-archive"></i>
                        <Link to="/Dashboard/LeaveTracker">
                            <a href="#">Leave Tracker</a>
                        </Link>
                    </div>

                    <div className="sidebar__logout">
                        <i className="fa fa-power-off"></i>
                        <a href="#">Log out</a>
                    </div>
                </div>
            </div>

        )
    }
}

export default Sidebar
