import React from 'react'
import { Grid, Hidden, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CategoryList from '../Sidebars/CategoryList';
import Slider from './Slider';
const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop:'5px'
        // position:'relative'
    },
    imgStyle: {
        width:'200px',
        height:'170px',
        transition:'.3s ease-in',
        '&:hover':{
            transform:'scale(1.1)',
            cursor:'pointer'
        }
    }
}))

export default function Hero() {

    const classes = styles();
    return (

        <Grid container spacing={3} className={classes.root}>

            <Grid item xs={12} sm={8}>
                <Slider />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <img src={require('../images/bn.jpg')} className={classes.imgStyle}/>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={require('../images/bn1.jpg')} className={classes.imgStyle}/>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={require('../images/bn2.jpg')} className={classes.imgStyle}/>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={require('../images/bn3.jpg')} className={classes.imgStyle}/>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>

    )
}
