import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SimpleTabs from './SimpleTabs';


export const OrderContext = createContext();

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        // padding: '20px',
        border: 0,
        marginTop: '20px'
    },
    tabRoot: {
        fontWeight: 700,
        fontSize: '16px',
    },
    name: {
        fontSize: '16px',
        flex: 4
    }
}))

export default function OrderView(props) {
    const classes = useStyles();

    const id = props.match.params.id
    const [order, setOrder] = useState({});

    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/api/orders/${id}?token=true`,
            {
                withCredentials: true
            }
        ).then(response => {
            setOrder(response.data.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <Paper variant='outlined' square className={classes.paper}>
            {
                Object.entries(order).length != 0 &&
                <>
                    <h5>Order #{`${id}`}</h5>

                    <OrderContext.Provider value={{ order }}>
                        <SimpleTabs />
                    </OrderContext.Provider>
                </>
            }
        </Paper>
    )
}

