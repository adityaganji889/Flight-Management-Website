import React, { Component } from "react";
import AdminNavBar from "../components/admin-nav-bar";
import AdminDashboard from "./admin-dashboard";
import "./admin-landing-page.css";
class AdminLandingPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            navBarClass: ''
        };
    }
    onNavBarHandler = (className) => {
        this.setState({
            navBarClass: className
        })
    }
    render(){
        let navClass = `admin-landing-page-1 ${this.state.navBarClass}`;
        return(
            <div className="admin-landing-page">
            <div className = {navClass}>
            <AdminNavBar onNavBarHandler = {this.onNavBarHandler} />
            </div>
            <div className = "admin-landing-page-2">
            <AdminDashboard />
            </div>
            </div>
        )
    }
}
export default AdminLandingPage;