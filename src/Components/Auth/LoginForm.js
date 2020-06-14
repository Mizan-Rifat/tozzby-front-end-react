import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    inputGroupText: {
        background: '#c0392b !important',
        color: 'white!important',
        border: '0!important',
        borderRadius: '0.25rem 0 0 0.25rem!important'
    },
    formDisable: {
        pointerEvents: 'none',
        opacity: '0.5',
        background: 'rgba(255, 255, 255, 0.6)'

    }
}))

export default function LoginForm({ userDispatch, loading, setLoading, isSuccess, setIsSuccess, formData, setFormData, hasError, renderError, handleFieldChange, authOpen, setAuthOpen }) {

    const classes = useStyles();

    const [fields, setFields] = useState([]);


    const initState = {
        email: '',
        password: '',
        errors: []
    }

    const toTitleCase = (phrase) => {
        return phrase
            .toLowerCase()
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };



    useEffect(() => {
        setFormData(initState)
    }, [])

    useEffect(() => {
        const { errors, ...fields } = initState;

        const allFields = Object.keys(fields).map(item => (
            {
                type: item == 'password' || item == 'password_confirmation' ? 'password' : 'text',
                name: item,
                value: formData[item],
                placeholder: item == 'email' ? 'Enter Email' : toTitleCase(item)
            }
        ))
        setFields(allFields);
    }, [formData])


    const login = (e) => {

        e.preventDefault();
        setLoading(true)

        axios.post(`${process.env.REACT_APP_DOMAIN}/api/customer/login?token=true`, {
            email: formData.email,
            password: formData.password
        }, {
            withCredentials: true
        })
            .then(response => {

                if (response.status === 200) {
                    console.log(response)
                    setLoading(false)

                    userDispatch({
                        type:'LOGIN',
                        payload:response.data.data
                    })
                    
                    setIsSuccess(true)
                }
            })
            .catch(error => {
                console.log(error.response)

                if (error.response.status == 422) {

                    setFormData({
                        ...formData,
                        error: '',
                        errors: error.response.data.errors
                    })
                }
                if (error.response.status == 401) {

                    setFormData({
                        ...formData,
                        errors: [],
                        error: error.response.data.error
                    })
                }

                setLoading(false)


            })
    }


    return (
        <>
            {
                formData.hasOwnProperty('error') &&

                <div className='mb-2 d-flex justify-content-center'>
                    <strong className='text-danger'>{formData.error}</strong>
                </div>
            }


            <form className={loading && classes.formDisable} style={{ marginBottom: '0px' }} onSubmit={login}>

                {
                    fields.map((field, index) => (

                        <div className="form-group" key={index}>
                            <label htmlFor={field.name}>{field.placeholder}</label>

                            <input type={field.type}
                                className={`form-control ${hasError(field.name) && 'invalid'} `}
                                id={field.name}
                                aria-describedby={field.name}
                                placeholder={field.placeholder}
                                name={field.name}
                                onChange={handleFieldChange}
                                value={field.value}
                            />

                            {
                                renderError(field.name)
                            }

                        </div>

                    ))
                }



                <Button type='submit' variant='contained' color="primary" className='mr-2'>
                    Login
                </Button>

                <a href="">Forgot Password</a>

                <div className="">
                    <p>Don't have an account?</p>
                    <Button variant='contained' color="primary" className='mr-2' onClick={() => setAuthOpen({ ...authOpen, comp: 2 })}>
                        Register Here
                    </Button>
                </div>

            </form>


        </>
    )
}

