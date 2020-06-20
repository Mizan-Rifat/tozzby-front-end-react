import React, { useState, useEffect, useContext, createContext } from 'react'
import { Grid, Container, Paper, IconButton, Divider, Button, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../../App';
import HorizontalLinearStepper from './HorizontalLinearStepper';
import { useHistory, Route, Switch, Redirect } from 'react-router-dom';
import AddressForm from './AddressForm';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';
import PaymentCard from './PaymentCard';
import Success from './Success';
import {CartSummary} from '../Cart/Cart';
import AuthCheck from '../Common/AuthCheck';
import BackDrop from '../Common/BackDrop';

// ----------------------------------------------------


const useStyles = makeStyles((theme) => ({
    image: {
        width: '100%'
    },
    paper: {
        padding: '5px',
        background: '#FFFFFF',
        // border: 'none',
        margin: '10px 0'
    },
    btn: {
        padding: '0 6px',
        '&:focus': {
            outline: 'none'
        }
    },
    couponBox: {
        borderRadius: 0,
        border: '1px solid #303F9F'
    },
    checkoutBtn: {
        background: '#D0611E',
        color: 'white',
        borderRadius: 0,
        width: '100%',
        marginTop: '24px',
        '&:hover': {
            background: '#FF5420'
        }
    },
    required: {
        '&:after': {
            content: "'*'",
            margin: '2px'
        }
    },
    thumbnailImage: {
        height: '90px',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
    heading: {
        background: '#EEEEEE',
        padding: '20px',
        fontSize: '16px'
    }

}))
export const OrderContext = createContext();

export default function Checkout(props) {
    const history = useHistory();
    const classes = useStyles();

    
    const { cartItems,cartItemsLoading } = useContext(AppContext);
    const [authenticated,userLoading] = AuthCheck();

    

    const [order,setOrder] = useState('');


    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);


    return (
        <>
            {

                userLoading && cartItemsLoading ?

                <BackDrop />
                
                :

                !authenticated ?


                    <div className="text-center">
                        <h5 style={{ marginTop: '100px' }}>You need to be logged in to view this page.</h5>
                    </div>

                    :

                    < Container style={{ paddingLeft: '50px', paddingRight: '50px', marginTop: '100px',minHeight:'100px' }
                    }>
                        <Paper variant="outlined" square className={classes.paper} style={{ border: 'none', }}>
                            <div className="">
                                <h5 style={{ fontWeight: 700 }}>Checkout</h5>
                            </div>
                        </Paper>
                        <Grid container spacing={3}>

                            <Grid item xs={12} sm={8}>


                                <OrderContext.Provider value={{ order, setOrder }}>

                                    <Switch>


                                        <Route
                                            path='/checkout/billing_information'
                                            render={(props) =>
                                                <SingleComponent {...props} heading='Billing Information' component={<AddressForm />} />}
                                        />

                                        <Route
                                            path='/checkout/payment_method'
                                            render={(props) =>
                                                <SingleComponent {...props} heading='Paymeny Method' component={<PaymentMethod />} />}
                                        />

                                        <Route
                                            path='/checkout/order_summary'
                                            render={(props) =>
                                                <SingleComponent {...props} heading='Order Summary' component={<OrderSummary />} />}
                                        />


                                        <Route
                                            path='/checkout/card_payment'
                                            render={(props) =>
                                                <SingleComponent {...props} heading='Add Debit/Credit Card' component={<PaymentCard />} />}
                                        />

                                        <Route
                                            path='/checkout/order_success'
                                            render={(props) =>
                                                <SingleComponent {...props} heading='Order Placed' component={<Success />} />}
                                        />

                                        <Redirect from='/checkout' to='/checkout/billing_information' />

                                    </Switch>
                                </OrderContext.Provider>


                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <Paper variant="outlined" square className={classes.paper} style={{ position: 'sticky', top: '70px' }}>
                                    <CartSummary cart={cartItems} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container >

            }
        </>
    )
}





function SingleComponent({ heading, component }) {
    const classes = useStyles();
    return (

        <Paper variant="outlined" square>
            <div className={classes.heading}>
                <div style={{ fontWeight: 'bold' }}>{heading}</div>
            </div>
            <div className="" style={{ padding: '20px' }}>
                {component}
            </div>
        </Paper>
    )
}