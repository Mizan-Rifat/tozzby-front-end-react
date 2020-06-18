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
export const orderContext = createContext();

export default function Checkout(props) {
    const history = useHistory();
    const [order,setOrder] = useState('');
    const { user, cartItems, setAuthOpen } = useContext(AppContext);

    const classes = useStyles();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    useEffect(() => {
        if (Object.entries(user).length == 0) {
            setAuthOpen({ comp: 1, state: true })
        }

    }, [user])

    return (
        <>
            {

                Object.entries(user).length == 0 ?


                    <div className="text-center">
                        <h5 style={{ marginTop: '100px' }}>You need to be logged in to view this page.</h5>
                    </div>

                    :

                    < Container style={{ paddingLeft: '50px', paddingRight: '50px', marginTop: '100px' }
                    }>
                        <Paper variant="outlined" square className={classes.paper} style={{ border: 'none', }}>
                            <div className="">
                                <h5 style={{ fontWeight: 700 }}>Checkout</h5>
                            </div>
                        </Paper>
                        <Grid container spacing={3}>

                            <Grid item xs={12} sm={8}>


                                <orderContext.Provider value={{ order, setOrder }}>

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
                                </orderContext.Provider>


                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <Paper variant="outlined" square className={classes.paper} style={{ position: 'sticky', top: '70px' }}>
                                    <CartSummary />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container >

            }
        </>
    )
}



function CartSummary({ }) {
    const classes = useStyles();
    return (
        <div className="" style={{ padding: '30px' }}>
            <div className="">
                <h5>Cart Summary</h5>
            </div>
            <div className="" >
                <div className="d-flex justify-content-between " style={{ margin: '5px 0' }}>
                    <div className='text-secondary'>Sub Total</div>
                    <div className="font-weight-bold" style={{ fontSize: "16px" }}>$100</div>
                </div>
                <div className="d-flex justify-content-between " style={{ margin: '5px 0' }}>
                    <div className='text-secondary'>Sub Total</div>
                    <div className="font-weight-bold" style={{ fontSize: "16px" }}>$100</div>
                </div>
                <div className="d-flex justify-content-between " style={{ margin: '5px 0' }}>
                    <div className='text-secondary'>Sub Total</div>
                    <div className="font-weight-bold" style={{ fontSize: "16px" }}>$100</div>
                </div>
                <div className="d-flex justify-content-between " style={{ margin: '5px 0' }}>
                    <div className='text-secondary'>Sub Total</div>
                    <div className="font-weight-bold" style={{ fontSize: "16px" }}>$100</div>
                </div>
                <div className="d-flex justify-content-between " style={{ margin: '5px 0' }}>
                    <div className='text-secondary'>Sub Total</div>
                    <div className="font-weight-bold" style={{ fontSize: "16px" }}>$100</div>
                </div>




                <div className="">
                    <div className="form-group d-flex">
                        <input type="text" className={`form-control ${classes.couponBox}`} placeholder="Coupon" />
                        <Button color='primary' style={{ borderRadius: 0, marginLeft: '5px' }} variant="contained">Apply</Button>
                    </div>




                </div>



                <Divider style={{ margin: '10px 0' }} />

                <div className="d-flex justify-content-between">
                    <div className='font-weight-bold' >Grand Total</div>
                    <div className="font-weight-bold" style={{ fontSize: "16px" }}>$100</div>
                </div>
                <Button variant='contained' disableFocusRipple={true} className={classes.checkoutBtn}>Proceed To Checkout</Button>
            </div>
        </div>
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