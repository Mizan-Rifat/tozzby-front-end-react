import React, { useState, useContext } from 'react'
import { Paper, Divider, Button, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../../App';
import { orderContext } from './Checkout';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import NotiToast from '../Common/NotiToast';



const useStyles = makeStyles((theme) => ({

    paper: {
        padding: '5px',
        background: '#FFFFFF',
        // border: 'none',
        margin: '10px 0'
    },

    thumbnailImage: {
        height: '90px',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
    buttonProgress: {
        position: 'absolute',
        left: '47px',
        top: '6px',
    },

}))

export default function OrderSummary() {
    const history = useHistory();
    const { user, cartItems, setCartItems, setAuthOpen } = useContext(AppContext);
    const { order,setOrder} = useContext(orderContext);
    const classes = useStyles();
    const toast = NotiToast();


    const [loading, setLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)


    const placeOrder = () => {


        setLoading(true)
        axios.post(`${process.env.REACT_APP_DOMAIN}/api/checkout/save-order?token=true`,
            {

            },
            {
                withCredentials: true
            }
        ).then(response => {
            if(response.data.hasOwnProperty('redirect_url')){
                history.push('/checkout/card_payment')
            }else{
                setLoading(false)
                setIsSuccess(true)
                setOrder(response.data.order)
                history.push('/checkout/order_success')
                setCartItems({})
                
            }
            
        })
            .catch(error => {
                setLoading(false)
            })
    }

    return (
        <div>
            {
                Object.entries(cartItems).length > 0 &&

                   
                    <>
                        <div className="address">
                            <p style={{ fontWeight: 700 }}>Address</p>


                            {
                                cartItems.billing_address != null ?
                                    <>
                                        <div>{cartItems.billing_address.name}</div>
                                        <div>{cartItems.billing_address.address1[0]}</div>
                                        <div>{cartItems.billing_address.city} {cartItems.billing_address.postcode}</div>
                                        <div>{cartItems.billing_address.country_name}</div>
                                        <div>Contact : {cartItems.billing_address.phone}</div>
                                    </>

                                    : ''
                            }

                        </div>
                        <div className="product mt-2">
                            <h5>Items</h5>
                            <Divider />
                            {
                                cartItems.items.map((item, index) => (
                                    <div className="d-flex mt-1 mb-1" key={index}>
                                        <div className="col-2">
                                            <div className={classes.thumbnailImage}
                                                style={{ backgroundImage: `url(${item.product.base_image.small_image_url})` }} />
                                        </div>
                                        <div className="col-10">
                                            <h5>{item.product.name}</h5>
                                            <div className="">{item.formated_base_price} * {item.quantity}</div>
                                            <div style={{ fontWeight: '700', fontSize: '16px' }}>{item.formated_total}</div>
                                        </div>
                                    </div>
                                ))
                            }


                            <Divider />
                        </div>

                        <div className="placeOrder mt-4">
                            <div className="d-flex">

                                <div className="col-6 mt-4">
                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: 0 }}>Payment Method</p>
                                    <p className="">
                                        {cartItems.payment != null ?
                                                cartItems.payment.method_title
                                            :
                                            ''
                                        }</p>

                                    <div className="mt-3" style={{ position: 'relative' }}>
                                        <Button
                                            variant='contained'
                                            onClick={placeOrder}
                                            color='primary'
                                            disabled={loading}
                                            style={{ borderRadius: 0, }}
                                        >
                                            Place Order
                                        </Button>
                                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                    </div>

                                </div>

                                <div className="col-6">

                                    <Paper variant="outlined" square className={classes.paper} style={{ padding: '30px' }}>

                                        <div className="d-flex justify-content-between " style={{ margin: '5px 0' }}>
                                            <div className='text-secondary'>Sub Total</div>
                                            <div className="font-weight-bold" style={{ fontSize: "16px" }}>{cartItems.formated_sub_total}</div>
                                        </div>

                                        <div className="d-flex justify-content-between " style={{ margin: '5px 0' }}>
                                            <div className='text-secondary'>Discount</div>
                                            <div className="font-weight-bold" style={{ fontSize: "16px" }}>{cartItems.formated_discount}</div>
                                        </div>



                                        <Divider style={{ margin: '10px 0' }} />

                                        <div className="d-flex justify-content-between">
                                            <div className='font-weight-bold' >Grand Total</div>
                                            <div className="font-weight-bold" style={{ fontSize: "16px" }}>{cartItems.formated_grand_total}</div>
                                        </div>
                                    </Paper>
                                </div>
                            </div>
                        </div>

                        <div className="text-right mt-3">
                            <Button
                                variant='contained'
                                onClick={() => history.push('/checkout/payment_method')}
                                color='secondary'
                            // disabled = {!isSuccess}
                            >
                                Back
                            </Button>
                        </div>
                    </>
                    
                    
            }
        </div>
    )
}