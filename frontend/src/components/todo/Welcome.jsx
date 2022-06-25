import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js'

export default function WelcomeComponent() {
    const [msg, setMsg] = useState("");
    const params = useParams()

    const retrieveWelcomeMessage = () => {


        HelloWorldService.executeHelloWorldPathVariableService(params.name)
            .then(response => handleSuccessfulResponse(response))
            .catch(error => handleError(error))
    }

    const handleSuccessfulResponse = (response) => {
        console.log(response)
        setMsg(response.data.message)
    }

    const handleError = (error) => {


        let errorMessage = error.message ? error.message : ''

        if (error.response && error.response.data) {
            errorMessage += error.response.data.message
        }

        setMsg(errorMessage)
    }


    return (
        <>
            <h1>Welcome!</h1>
            <div className="container">
                Welcome {params.name}.
                You can manage your todos <Link to="/todos">here</Link>.
            </div>
            <div className="container">
                Click here to get a customized welcome message.
                <button onClick={retrieveWelcomeMessage}
                    className="btn btn-success">Get Welcome Message</button>
            </div>
            <div className="container">
                {msg}
            </div>

        </>
    )


}

