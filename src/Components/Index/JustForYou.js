import React from 'react'
import { Grid, Paper, Button } from '@material-ui/core';
import SingleProduct from '../Sections/SingleProduct';
import { CategoryTitle } from '../Sections/ProductSection';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useLoadingBar from '../Common/useLoadingBar';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function JustForYou({ addLoadingBar }) {
    const [products, setProducts] = useState(Array.from(Array(20).keys()));
    const [loading, setLoading] = useState(true);

    const [next, setNext] = useState(null);
    const [nextLoading, setNextLoading] = useState(false);


    const loadMore = () => {
        setNextLoading(true)
        axios.get(next)
            .then(response => {
                setProducts([
                    ...products,
                    ...response.data.data
                ])
                setNext(response.data.links.next)
                setNextLoading(false)

            }).catch(error => {
                console.log(error)
                setNextLoading(false)

            })
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/api/products?limit=20`)
            .then(response => {
                setProducts(response.data.data)
                setNext(response.data.links.next)
                setLoading(false)
                addLoadingBar(10)

            }).catch(error => {
                console.log(error)
                setLoading(false)
                addLoadingBar(10)

            })
    }, [])



    return (
        <Paper elevation={0} style={{ position: 'relative', marginTop: '5rem' }}>
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

            {
                next != null &&

                <div className="d-flex justify-content-center" style={{ position: 'relative', marginTop: '25px' }}>

                    <Button
                        variant='contained'
                        color='primary'
                        style={{ width: '200px', borderRadius: '0px' }}
                        onClick={loadMore}
                        disabled={nextLoading}
                    >
                        load more
                    </Button>
                    {
                        nextLoading &&

                        <CircularProgress
                            size={24}
                            style={{
                                position: 'absolute',
                                left: '640px',
                                top: '6px',
                            }}
                        />
                    }
                </div>
            }
        </Paper>
    )
}
