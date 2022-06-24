import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

export default function ListTodosComponent() {
    const navigate = useNavigate()
    const [todoList, setTodoList] = useState({
        todos: [],
        message: null
    });

    useEffect(() => {
        refreshTodos()
    }, [todoList]);

    const refreshTodos = () => {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
            .then(
                response => {
                    setTodoList(prevTodoList => { 
                        return { 
                            todos: response.data,
                            ...prevTodoList
                        }
                    })
                }
            )
    }

    const deleteTodoClicked = (id) => {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    setTodoList(prevTodoList => { 
                        return { 
                            message: `Delete of todo ${id} Successful`,
                            ...prevTodoList
                        }
                    })
                    refreshTodos()
                }
            )

    }

    const addTodoClicked = () => {
        navigate(`/todos/-1`)
    }

    const updateTodoClicked = (id) => {
        navigate(`/todos/${id}`)

    }

    return (
        <div>
            <h1>List Todos</h1>
            {todoList.message && <div class="alert alert-success">{todoList.message}</div>}
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Target Date</th>
                            <th>IsCompleted?</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todoList.todos.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td><button className="btn btn-success" onClick={() => updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="row">
                    <button className="btn btn-success" onClick={addTodoClicked}>Add</button>
                </div>
            </div>
        </div>
    )
}
