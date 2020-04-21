import React, { useState } from 'react'
import { Paper, Grid, Hidden } from '@material-ui/core';
import SingleProduct from './SingleProduct';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    title: {
        background: '#FF5C00',
        display: 'inline',
        color: 'white',
        padding: '8px 10px',
        borderRadius: '5px 5px 0px 0px',
        fontWeight: 'bold',
        fontSize: '20px'
    },
    cBanner: {
        width: '100%',
        height: '100%',
        borderRadius: '5px'
    },
    bannerContainer: {
        height: '258px',
        width: '260px',
        padding: '10px 0px 0px 10px ',
    }
})

export default function ProductSection({ image }) {
    const classes = useStyles();
    const [products, setproducts] = useState([
        {
            name: 'Laptop',
            image: 'pic1.png',
            price: 100
        },
        {
            name: 'Laptop',
            image: 'pic1.png',
            price: 100
        },
        {
            name: 'Laptop',
            image: 'pic1.png',
            price: 100
        },
        {
            name: 'Laptop',
            image: 'pic1.png',
            price: 100
        },
        {
            name: 'Laptop',
            image: 'pic1.png',
            price: 100
        },
    ])
    return (

        <div className='mt-5'>
            <div className={classes.title}>FASHION</div>
            <Paper elevation={3}>
                <div className="d-flex">
                    <Hidden smDown>
                        <div className={classes.bannerContainer}>
                            <img src={require(`../images/${image}`)} className={classes.cBanner} />
                        </div>
                    </Hidden>
                    <div className='d-flex justify-content-between wrapper'>
                        {
                            products.map((item, index) => (
                                <SingleProduct product={item} key={index} />
                            ))
                        }
                    </div>
                </div>
            </Paper>
        </div>


    )
}

