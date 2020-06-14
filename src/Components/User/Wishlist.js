import React, { useState, useEffect, useContext } from 'react'
import { Grid, Container, Paper, IconButton, Divider, Button, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../../App';
import SingleProduct from '../Sections/SingleProduct';


const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: '20px',
        border: 0
    },
}))


export default function Wishlist() {

    const classes = useStyles();

    const { wishListItems, setWishListItems, authOpen, setAuthOpen } = useContext(AppContext);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <Paper variant='outlined' square className={classes.paper}>
            <h5>Wishlist</h5>
            <Grid container spacing={1}>
                {
                    wishListItems.length > 0 ?
                        wishListItems.map((item, index) => (
                            <Grid item xs={12} md={3} key={index}>
                                <SingleProduct product={item.product} loading={false} />
                            </Grid>
                        ))
                        :
                        <p className='mt-3 ml-1'>You Don't Have Any Items In Your Wishlist</p>
                }

            </Grid>
        </Paper>
    )
}
