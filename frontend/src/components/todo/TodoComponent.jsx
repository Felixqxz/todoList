import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

export default function TodoComponent(props) {
    const navigate = useNavigate()
    const params = useParams()
    const [todo, setTodo] = useState({
        id: params.id,
        description: '',
        targetDate: moment(new Date()).format('YYYY-MM-DD')
    });


    useEffect(() => {
        if (todo.id === -1) {
            return
        }

        let username = AuthenticationService.getLoggedInUserName()

        TodoDataService.retrieveTodo(username, todo.id)
            .then(response => setTodo(prevTodo => { 
                return {
                    description: response.data.description,
                    targetDate: moment(response.data.targetDate).format('YYYY-MM-DD'),
                    ...prevTodo
                }
            })
        )}, [todo]);
   
    const validate = (values) => {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter at least 5 Characters in Description'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }

        return errors

    }

    const onSubmit = (values) => {
        let username = AuthenticationService.getLoggedInUserName()

        let item = {
            id: todo.id,
            description: values.description,
            targetDate: values.targetDate
        }

        if (todo.id === -1) {
            TodoDataService.createTodo(username, item)
                .then(() => navigate('/todos'))
        } else {
            TodoDataService.updateTodo(username, todo.id, item)
                .then(() => navigate('/todos'))
        }

        console.log(values);
    }


    let { description, targetDate } = todo
        //let targetDate = todo.targetDate

    return (
        <div>
            <h1>Todo</h1>
            <div className="container">
                <Formik
                    initialValues={{ description, targetDate }}
                    onSubmit={onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={validate}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div"
                                    className="alert alert-warning" />
                                <ErrorMessage name="targetDate" component="div"
                                    className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate" />
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>

            </div>
        </div>
    )
}
