import React from 'react'
import { Grid, Hidden, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CategoryList from './CategoryList';
import Slider from './Slider';

const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    }
}))

export default function Hero() {

    const classes = styles();
    return (
       
            <Grid container spacing={3}>
                <Hidden smDown>
                    <Grid item md={2}>
                        <CategoryList />
                    </Grid>
                </Hidden>
                <Grid item xs={12} sm={8}>
                    <Slider />
            </Grid>
                <Grid item xs={12} sm={4} md={2}>
                    best selling bar
            </Grid>
            </Grid>
     
    )
}
