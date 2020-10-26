import React, { useEffect,useState } from 'react'
import { Paper, Grid } from '@material-ui/core';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import { makeStyles } from '@material-ui/styles';
import useLoadingBar from '../Common/useLoadingBar';

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: '3rem',
        color: '#FF6108'
    },
    text: {
        margin: 0,
        fontWeight: 700,
        '&:hover': {
            color: '#FF6108'
        }

    },
    itemContainer:{
        padding: '20px', 
        justifyContent: 'center',
        display:'flex',
        ['@media (max-width:480px)']: { 
            padding:'5px',
            justifyContent: 'start',
            marginLeft:'70px'
        }
    }

}))

export default function Elementor({ addLoadingBar }) {

    const classes = useStyles();
 
    useEffect(() => {
        addLoadingBar(10)
    }, [])



    return (
        <>
            <Paper elevation={0} variant='outlined' style={{ marginTop: '2rem' }}>
                <Grid container  >
                
                    <Grid item xs={12} md={3}>
                        <div className={classes.itemContainer}>
                            <LocalShippingOutlinedIcon className={classes.icon} />
                            <div className="ml-2" style={{ fontFamily: 'sans-serif', }}>
                                <p className={classes.text}>Free Delivery</p>
                                <p style={{ margin: 0, color: '#666695' }}>From 99$</p>
                            </div>
                        </div>
                    </Grid>

                     <Grid item  xs={12} md={3}>
                        <div className={classes.itemContainer}>
                            <MonetizationOnOutlinedIcon className={classes.icon} />
                            <div className="ml-2" style={{ fontFamily: 'sans-serif', }}>
                                <p className={classes.text}>Moneyback Guarantee</p>
                                <p style={{ margin: 0, color: '#666695' }}>1 Week Back</p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <div className={classes.itemContainer}>
                            <PaymentOutlinedIcon className={classes.icon} />
                            <div className="ml-2" style={{ fontFamily: 'sans-serif', }}>
                                <p className={classes.text}>Payment Method</p>
                                <p style={{ margin: 0, color: '#666695' }}>Secure Payment</p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <div className={classes.itemContainer}>
                            <ContactSupportOutlinedIcon className={classes.icon} />
                            <div className="ml-2" style={{ fontFamily: 'sans-serif', }}>
                                <p className={classes.text}>Support</p>
                                <p style={{ margin: 0, color: '#666695' }}>24 hours</p>
                            </div>
                        </div>
                    </Grid>





                </Grid>
            </Paper>
        </>
    )
}


