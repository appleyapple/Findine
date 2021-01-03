import React from 'react';
// import './../mainapp/Mainapp.css';
import './Landing.css';
import { Link} from 'react-router-dom';

class LandingPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userName:'',
            password:'',
            loginerr: false
          };

        this.handleChange = this.handleChange.bind(this);
        this.attemptLogin = this.attemptLogin.bind(this);
        }

        handleChange=(e)=>{
            this.setState ({ [e.target.name]: e.target.value });
        }


        buildURL() {
            var url = '/accounts/login';
            return url;
        }

        buildURLSession() {
            var url = '/sessions/sessions/setSession';
            return url;
        }

        clearSession(){
            var urlclearSession = '/sessions/sessions/clearSession';
            fetch(urlclearSession, {
                method: 'post'
            });
        }
    
        attemptLogin(event) {
            //prevent reload
            event.preventDefault();

            var loginDetails = {
                'account': this.state.userName,
                'password': this.state.password
            };

            var reqBody = JSON.stringify(loginDetails);
            // console.log(reqBody);

            var sessionDetails = {
                'userName': this.state.userName
            };

            var reqBodySession = JSON.stringify(sessionDetails);

            //Make request to server
            var url = this.buildURL();
            fetch(url, {
                method: 'post',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: reqBody
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.success) {
                    // make request to session to sessionDB
                    var urlSession = this.buildURLSession();
                    fetch(urlSession, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: reqBodySession
                    });
                    this.props.history.push('/lobby');
                } else {
                    this.setState({ loginerr: true });
                }
            });
        };

    componentDidMount() {
        this.clearSession();
    }

    render() {

        if (this.state.loginerr === false) {
            return (
            
                <div className="main">
                    <h1 id="User Sign Up">Welcome to Finedine</h1>
                    <form action="" method="post" className="login-form">
        
                        <legend>Login to get started</legend>
        
                        <div className="input-content">
                            <div>
                                <input type="text" value={this.state.userName} onChange={this.handleChange} name="userName" placeholder="username"/>
                            </div>
                            <div>
                                <input type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="password"/>
                            </div>
                        </div>
        
                        <div className="buttons">
                            <Link to="/signup">
                                <input id="submit_sign_up_btn" type="button" value="SIGN UP"/>
                            </Link>
                            <input id="submit_login_btn" type="submit" value="LOGIN" onClick={this.attemptLogin}/>
                        </div>
                    </form>
                    <br></br>
                </div>
            )
        } else {
            return (
            
                <div className="main">
                    <h1 id="User Sign Up">Welcome to Finedine</h1>
                    <form action="" method="post" className="login-form">
        
                        <legend>Login to get started</legend>
                        <p>Invalid username or password</p>
        
                        <div className="input-content">
                            <div>
                                <input type="text" value={this.state.userName} onChange={this.handleChange} name="userName" placeholder="username"/>
                            </div>
                            <div>
                                <input type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="password"/>
                            </div>
                        </div>
        
                        <div className="buttons">
                            <Link to="/signup">
                                <input id="submit_sign_up_btn" type="button" value="SIGN UP"/>
                            </Link>
                            <input id="submit_login_btn" type="submit" value="LOGIN" onClick={this.attemptLogin}/>
                        </div>
                    </form>
                    <br></br>
                </div>
            )
        }
    }
}

export default LandingPage;
