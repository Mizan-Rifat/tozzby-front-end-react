import React from 'react'
import { Grid } from '@material-ui/core';
import CategoryBars from './Bars/CategoryBars';
import ProductSection from './Sections/ProductSection';

export default function Body() {
    return (

        <Grid container spacing={3}>
            <Grid item xs={12} md={2}>

            </Grid>
            <Grid item xs={12} md={10}>
                <CategoryBars />
                <ProductSection image='tab1.jpg' />
                <ProductSection image='pic4.png' />
                <ProductSection image='Album4.png' />
            </Grid>

        </Grid>
    )
}
