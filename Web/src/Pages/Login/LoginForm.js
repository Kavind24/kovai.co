import React, { Component } from "react";
import FacebookLogin from 'react-facebook-login';
import { Navigate } from 'react-router-dom';
import "./login.css"
import '../../App.css';

class LoginForm extends Component {
    state = {
        email: "",
        password: "",
        info: {}
    }

    handleLogin = (email, password, name="") => {
        const {handleAuthentication} = this.props;
        fetch("https://localhost:7120/login", {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email, 
                password: password,
                name: name
            })
            })
            .then(response => response.json())
            .then(data => {
                handleAuthentication(data);
                this.setState({ info: data });
            });
    }

    responseFacebook = (response) => { 
        if (response && response.accessToken) {
            this.handleLogin(response.email,'facebooklogin',response.name);
        }  
      }

    render() {
        const {info, email, password} = this.state;
        return (
            <div className="App-header">
                <div className="login">
                    <form onSubmit={() => {this.handleLogin(email, password)}}>
                        <div className="login-inputs">
                            <label><strong>Username or Email</strong></label>
                            <input type="text" name="email" required onChange={(e) => {this.setState({ email: e.target.value })}} />
                        </div>
                        <div className="login-inputs">
                            <label><strong>Password</strong></label>
                            <input type="password" name="password" required onChange={(e) => {this.setState({ password: e.target.value })}} />
                        </div>
                        <div className="login-buttons">
                        <div className="submit-button">
                            <input type="submit" value={"Login"} onClick={(e) => {this.handleLogin(email, password); e.preventDefault();}} />
                        </div>
                        </div>
                    </form>
                    <div className="login-buttons">
                        <p>-------------------OR-------------------</p>
                        <FacebookLogin buttonStyle={{padding:"6px"}}  
                            appId="1614501802314946"  
                            autoLoad={false}  
                            fields="name,email,picture"  
                            callback={this.responseFacebook}
                        />
                    </div>
                </div>
                {(info && info.role === 'Admin')&& <Navigate to="/admin" replace={true} />}
                {(info && info.role === 'Member')&& <Navigate to="/products/search" replace={true} />}
            </div>
        );
    }
}

export default LoginForm;