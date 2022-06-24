import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import Login from './Login.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Logout from './Logout.jsx'
import Welcome from './Welcome.jsx'
import TodoComponent from './TodoComponent.jsx'

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <Router>
                <>
                    <Header/>
                    <Routes>
                        <Route path="/" exact element={<Login />}/>
                        <Route path="/login" element={<Login />}/>
                        <AuthenticatedRoute path="/welcome/:name" element={<Welcome />}/>
                        <AuthenticatedRoute path="/todos/:id" element={<TodoComponent />}/>
                        <AuthenticatedRoute path="/todos" element={<ListTodosComponent />}/>
                        <AuthenticatedRoute path="/logout" element={<Logout />}/>
                        
                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                    <Footer/>
                </>
            </Router>

        </div>
    )
}