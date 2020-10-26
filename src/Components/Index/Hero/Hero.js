import React,{useEffect} from 'react'
import { Grid, Hidden, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Slider from './Slider';



const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop:'5px'
        // position:'relative'
    },
    imgStyle: {
        width:'150px',
        height:'130px',
        transition:'.3s ease-in',
        '&:hover':{
            transform:'scale(1.1)',
            cursor:'pointer'
        }
    }
}))

export default function Hero({ addLoadingBar}) {

    const classes = styles();
    
    useEffect(() => {
        addLoadingBar(10)
    }, [])
    
    return (

        <Grid container spacing={3} className={classes.root}>

            <Grid item xs={12} sm={8}>
                <Slider />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <img src={require('../../images/bn.jpg')} className={classes.imgStyle}/>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={require('../../images/bn1.jpg')} className={classes.imgStyle}/>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={require('../../images/bn2.jpg')} className={classes.imgStyle}/>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={require('../../images/bn3.jpg')} className={classes.imgStyle}/>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>

    )
}
