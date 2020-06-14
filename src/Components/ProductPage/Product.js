import React, { useState, useEffect,createContext } from 'react'
import { Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProductDetails from './ProductDetails';
import ProductImages from './ProductImages';
import Axios from 'axios';


export const ProductContext = createContext();


const useStyles = makeStyles(theme => ({
    picContainer: {
        textAlign: 'center'
    },
    mainImage: {
        width: '80%',
        maxHeight: '600px'
    },
    thumbnail: {
        flex: '0 0 auto',

        margin: '5px',
        height: '100px',
        width: '100px',
        border: '1px solid black',
        '&:hover': {
            border: '1px solid red',
        }
    }
}))

export default function Product(props) {

    const id = props.match.params.id;

    const [product, setproduct] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0)
    },[]);


    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_DOMAIN}/api/products/${id}`)
            .then(response => {
                setproduct(response.data.data)
                setLoading(false)
            })
            // .catch(error=>{
            //     error.response.status == 404 ? console.log('sadfkasjdfasdfasdasd') : console.log('s')
            // })
    }, [])


    const classes = useStyles();
    return (
        <Container style={{ marginTop: '70px' }}>
            <Grid container spacing={3}>

                {
                    loading ? '' :

                        <ProductContext.Provider value={{product}}>
                            <Grid item xs={12} md={6}>
                                <ProductImages />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <ProductDetails />
                            </Grid>

                        </ProductContext.Provider>
                }

            </Grid>
        </Container>
    )
}