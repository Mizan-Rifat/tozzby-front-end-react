import React, { useState, useEffect } from 'react';
import ProductExpansionPanel from './ProductExpansionPanel';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';




const useStyles = makeStyles((theme) => ({
    heading: {
        background: '#EEEEEE',
        padding: '20px',
        fontSize: '16px'
    }

}))

export default function ProductSpecification({ id }) {
    const classes = useStyles();
    const [state, setstate] = useState({
        additionalData: [],
        loading: true
    })

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_DOMAIN}/api/product-additional-information/${id}`)
            .then(response => {
                setstate({
                    ...state,
                    additionalData: response.data.data,
                    loading: false
                })
            })
            .catch(error => {
                console.log(error)
            })

    }, [])


    return (
        <Paper variant="outlined" square>
            <div className={classes.heading}>
                <div style={{ fontWeight: 'bold' }}>Specification</div>
            </div>
            <div className="" style={{ padding: '20px' }}>
                <Details data={state} />
            </div>
        </Paper>
    )
}

function Details({ data }) {
    return (
        <div className="">
            <table>
                {
                    data.additionalData.filter(item=>item.value != '').map(item => (
                        <tr>
                            <td style={{width:'40%',fontWeight:700}}>{item.label}</td>
                            <td style={{width:'20%'}}>:</td>
                            <td>{item.value}</td>
                        </tr>
                    ))
                }


            </table>
        </div>
    )
}