import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

export default function AuthenticatedRoute() {
    if (AuthenticationService.isUserLoggedIn()) {
        return <Route {...this.props} />
    } else {
        return <Redirect to="/login" />
    }

}
