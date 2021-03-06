import React, {useState} from 'react'
import { useNavigate } from "react-router-dom"


import AuthenticationService from './AuthenticationService.js'

export default function Login() {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
        hasLoginFailed: false,
        showSuccessMessage: false
    });

    const navigate = useNavigate()

    const handleChange = (event) => {
        const {name, value} = event.target

        setLoginForm(prevLoginForm => {
            return {
                ...prevLoginForm,
                [name]: value
                }
            })
    }


    const loginClicked = () => {

        AuthenticationService
            .executeJwtAuthenticationService(loginForm.username, loginForm.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(loginForm.username, response.data.token)
                navigate(`/welcome/${loginForm.username}`)
            }).catch(() => {
                setLoginForm(prevLoginForm => {
                    return {
                        ...prevLoginForm,
                        showSuccessMessage: false,
                        hasLoginFailed: true
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

                    <form>
                        User Name: <input type="text" name="username" value={loginForm.username} onChange={handleChange} />
                        Password: <input type="password" name="password" value={loginForm.password} onChange={handleChange} />
                    </form>
                    
                    <button className="btn btn-success" onClick={loginClicked}>Login</button>
                </div>
            </div>
        )
}
