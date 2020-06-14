import React from 'react'
import { Grid, Paper } from '@material-ui/core';
import SingleProduct from '../Sections/SingleProduct';
import {CategoryTitle} from '../Sections/ProductSection';
import { useState, useEffect } from 'react';
import axios from 'axios';



export default function JustForYou() {
    const [products, setProducts] = useState(Array.from(Array(20).keys()));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/api/products?limit=20`)
            .then(response => {
                setProducts(response.data.data)
                setLoading(false)
            }).catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [])

    return (
        <Paper elevation={0} style={{position:'relative',marginTop:'5rem'}}>
            <CategoryTitle title={'Just For You'} />
            <Grid container spacing={1}>
                {
                    products.map((product, index) => (
                        <Grid item xs={12} md={2} key={index}>
                            <SingleProduct product={product} loading={loading} />
                        </Grid>
                    ))
                }

            </Grid>
        </Paper>
    )
}