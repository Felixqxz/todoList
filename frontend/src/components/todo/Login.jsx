import React, {useState} from 'react';

import AuthenticationService from './AuthenticationService.js'

export default function Login() {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
        hasLoginFailed: false,
        showSuccessMessage: false
    });

    const handleChange = (event) => {

        setLoginForm(prevLoginForm => {
            return {
                [event.target.name]: event.target.value,
                ...prevLoginForm
                }
            })
    }


    const loginClicked = () => {

        AuthenticationService
            .executeJwtAuthenticationService(loginForm.username, loginForm.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.history.push(`/welcome/${loginForm.username}`)
            }).catch(() => {
                setLoginForm(loginForm => {
                    return {
                        showSuccessMessage: false,
                        hasLoginFailed: true,
                        ...loginForm
                    }
                })
            })

    }

        return (
            <div>
                <h1>Login</h1>
                <div className="container">

                    {loginForm.hasLoginFailed && 
                        <div className="alert alert-warning">Invalid Credentials</div>}

                    {loginForm.showSuccessMessage && 
                        <div>Login Sucessful</div>}

                    User Name: <input type="text" name="username" value={loginForm.username} onChange={handleChange} />
                    Password: <input type="password" name="password" value={loginForm.password} onChange={handleChange} />
                    
                    <button className="btn btn-success" onClick={loginClicked}>Login</button>
                </div>
            </div>
        )
}
