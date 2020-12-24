import React from 'react';
import { Link } from 'react-router-dom';
import './../Landing/Landing.css';

class SignUpPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            partnerName: '',
            userName: '',
            password: '',
            registererr: false,
            registersuccess: false
          };
        this.controller = new AbortController();
        this.handleChange = this.handleChange.bind(this);
        this.attemptRegistration = this.attemptRegistration.bind(this);
      }

    handleChange=(e)=>{
        this.setState ({ [e.target.name]: e.target.value });
    }

    buildURL() {
		var url = '/accounts/process_get';
		return url;
	}

    attemptRegistration() {
        var registrationDetails = {
            'account': this.state.userName,
            'password': this.state.password
        };
        var profileDetails = {
            'firstName': this.state.firstName,
            'lastName': this.state.lastName,
            'userName': this.state.userName,
            'partnerName': this.state.partnerName
        };

        var reqBody = JSON.stringify(registrationDetails);
        var reqBodyMongo = JSON.stringify(profileDetails);
        console.log(reqBody);
        console.log(reqBodyMongo);

        // Make request to server
        var url = this.buildURL();
        fetch(url, {
            method: 'post',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: reqBody,
            signal: this.controller.signal
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (!data.success) {
                this.setState({ registererr: true });
                return;
            } else {
                // placeholder to redirecting backt to '/'
                this.setState({registersuccess: true});
            }
        })
        .then(() => {
            fetch('/profiles/profiles', {
                method: 'post',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: reqBodyMongo,
                signal: this.controller.signal
            })
            .then(ress => ress.json())
            .then(dataa => {
                console.log(dataa);
                if (!dataa.success) {
                    this.setState({ registererr: true });
                }
            })
            .catch(err => err);
        })
        .catch(err => err);
    };

	componentWillUnmount() {
		this.controller.abort();
	}

    render() {
        if (this.state.registererr) {
            return (
                <div className="main">
                    <h1 id="User Sign Up">Sign up for an Account</h1>
                    <form action="" method="post">
    
                        <legend>Create an account with us</legend>
    
                        <div id="registration_error">
                            <p>Please provide a valid username and password</p>
                        </div>
    
                        <div className="input-content">
                            <div>
                                <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="First name"/>
                            </div>
    
                            <div>
                                <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Last name"/><br/>
                            </div>
    
                            <div>
                                <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange} placeholder="username"/><br/>
                            </div>

                            <div>
                                <input type="text" name="partnerName" value={this.state.partnerName} onChange={this.handleChange} placeholder="partner username"/><br/>
                            </div>
    
                            <div>
                                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="password"/><br/>
                            </div>
                        </div>
    
                        <div className="buttons">
                            <Link to="/">
                                <input id="back_btn" type="button" value="BACK"/>
                            </Link>
                            <input id="submit_sign_up_btn" type="button" value="REGISTER" onClick={this.attemptRegistration}/>
                        </div>
                    </form>
    
                </div>
            )
        } 
        if (this.state.registersuccess) {
                return (
                    <div className="main">
                        <h1 id="Sign Up Success">Signup successful!</h1>

                        <div className="buttons">
                                <Link to="/">
                                    <input id="submit_login_btn" type="button" value="LOGIN"/>
                                </Link>
                        </div>
                    </div>
                )
        } else {
            return (
                <div className="main">
                    <h1 id="User Sign Up">Sign up for an Account</h1>
                    <form action="" method="post">
    
                        <legend>Create an account with us</legend>
    
                        <div id="registration_error"></div>
    
                        <div className="input-content">
                            <div>
                                <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="First name"/>
                            </div>
    
                            <div>
                                <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Last name"/><br/>
                            </div>
    
                            <div>
                                <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange} placeholder="username"/><br/>
                            </div>

                            <div>
                                <input type="text" name="partnerName" value={this.state.partnerName} onChange={this.handleChange} placeholder="partner username"/><br/>
                            </div>
    
                            <div>
                                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="password"/><br/>
                            </div>
                        </div>
    
                        <div className="buttons">
                            <Link to="/">
                                <input id="back_btn" type="button" value="BACK"/>
                            </Link>
                            <input id="submit_sign_up_btn" type="button" value="REGISTER" onClick={this.attemptRegistration}/>
                        </div>
                    </form>
    
                </div>
            )
        }
    }
}

export default SignUpPage;
