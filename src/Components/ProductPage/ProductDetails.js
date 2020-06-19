import React, { useState, useContext, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { IconButton, Chip } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Tooltip from '@material-ui/core/Tooltip';
import ProductExpansionPanel from './ProductExpansionPanel'
import Typography from '@material-ui/core/Typography';
import RatingExpansionPanel from './RatingExpansionPanel';
import ReviewExpansionPanel from './ReviewExpansionPanel';
import Quantity from '../Common/Quantity';
import { ProductContext } from './Product';
import CreateReviewExpansionPanel from './CreateReviewExpansionPanel';
import axios from 'axios';
import { AppContext } from '../../App';
import NotiToast from '../Common/NotiToast';
import useCartItem from '../Common/useCartItem';
import useWishList from '../Common/useWishList';
import clsx from 'clsx'
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles(theme => ({
    btnRoot: {
        padding: '5px 10px',
        '&:focus': {
            outline: 'none'
        }
    },
    chip1: {
        background: '#FF7426',
        minWidth:'130px',
        color: '#fff',
        '&:hover': {
            background: 'red'
        },
        '&:focus': {
            background: '#FF7426'
        }
    },
    chip2: {
        background: 'red',
        minWidth:'130px',
        color: '#fff',
        '&:hover': {
            background: '#FF7426'
        },
        '&:focus': {
            background: 'red'
        }
    },
    chip3:{
        opacity:.2,
    },
    stock: {
        margin: 0,
        // background: '#FF5C00',
        color: 'white',
        display: 'inline-block',
        padding: '5px 10px'
    },
    sDesc: {
        fontSize: '14px',
        padding: '5px 0',
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    },
    fIcon: {
        border: '2px solid #FF7426',
        cursor: 'pointer',
        marginLeft: '5px',
        borderRadius: '50%',
        padding: '4px',
        color: '#FF7426',
        fontSize: '30px',
        '&:hover': {
            color: 'white',
            background: '#ff7426'

        }
    },
    buttonProgress: {
        position: 'absolute',
        top: '4px',
        right: '55px',
    },

}))

export default function ProductDetails() {
    const classes = useStyles();
    const [qty, setqty] = useState(1);
    // const [inCart, setInCart] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const { product } = useContext(ProductContext)

    const toast = NotiToast();

    const { cartItems, setCartItems } = useContext(AppContext)

    const [inWishList, inWishListPending, toWishList, setWishListProduct] = useWishList();
    const [inCart, inCartPending, addToCart, removeFromCart, setCartItemProduct] = useCartItem();

    // const addToCart = (product_id) => {
    //     setInCart(!inCart)


    //     axios.post(`${process.env.REACT_APP_DOMAIN}/api/checkout/cart/add/${product_id}`, {
    //         "product_id": product_id,
    //         "quantity": quantity,
    //         "is_configurable": false
    //     }, { withCredentials: true })
    //         .then(response => {
    //             console.log(response)
    //             setCartItems(response.data.data)
    //             toast('Item Added to Cart', 'success')
    //         })
    // }


    // const removeFromCart = () => {
    //     setInCart(!inCart)
    //     const cartitem = cartItems.items.find(item => item.product.id == product.id)


    //     axios.get(`${process.env.REACT_APP_DOMAIN}/api/checkout/cart/remove-item/${cartitem.id}`, {
    //         withCredentials: true
    //     }).then(response => {
    //         console.log(response)
    //         if (response.data.data == null) {
    //             setCartItems({})
    //         } else {
    //             setCartItems(response.data.data)
    //         }

    //         toast('Item removed', 'error')
    //     })
    // }


    // useEffect(() => {
    //     setQuantity(cartItems.quantity)
    //     if (Object.entries(cartItems).length > 0) {
    //         if (cartItems.items.some(item => item.product.id == product.id)) {

    //             setInCart(true)
    //         }
    //     }

    // }, [cartItems])


    useEffect(() => {
        setQuantity(cartItems.quantity)
        setCartItemProduct(product)
        setWishListProduct(product)
    }, [product])



    return (
        <div style={{ padding: '5px' }}>
            <h5>{product.name}</h5>
            <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
            <p style={{ fontSize: '20px' }}>{product.formated_price}</p>
            {
                product.in_stock ?
                    <p className={classes.stock} style={{ background: '#FF5C00' }}>In Stock</p>
                    :
                    <p className={classes.stock} style={{ background: 'red' }}>Out of Stock</p>
            }

            <div className={classes.sDesc} dangerouslySetInnerHTML={{ __html: product.short_description }} />

            <div className="d-flex mt-3">

                <Quantity quantity={quantity} setQuantity={setQuantity} />

                <div className="ml-2">

                    <div className="" style={{ display: 'inline-block', position: 'relative' }}>

                        <Chip
                            label={inCart ? "Remove From Cart" : "Add To Cart"}
                            disabled={product.in_stock ? false : true}
                            className={
                                clsx({
                                  [classes.chip2] : inCart,  
                                  [classes.chip1] : !inCart,  
                                  [classes.chip3] : inCartPending, 
                                })
                            }
                            onClick={() => inCart ? removeFromCart() : addToCart(quantity)}
                        />
                        {inCartPending && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>

                    {
                        inWishList ?

                            <Tooltip title="Remove From Wishlist">
                                {/* <div className={classes.iconContainer}> */}
                                <FavoriteIcon className={clsx(classes.fIcon, { animate: inWishListPending })} onClick={toWishList} />
                                {/* </div> */}
                            </Tooltip>
                            :
                            <Tooltip title="Add To Wishlist">
                                {/* <div className={classes.iconContainer}> */}
                                <FavoriteBorderIcon className={clsx(classes.fIcon, { animate: inWishListPending })} onClick={toWishList} />
                                {/* </div> */}
                            </Tooltip>
                    }




                    <Tooltip title="Compare">
                        <CompareArrowsIcon className={classes.fIcon} />
                    </Tooltip>
                </div>
            </div>

            <ProductExpansionPanel

                summary='Details'
                rich={true}
                details={product.description}

            />

            <RatingExpansionPanel />

            <ReviewExpansionPanel id={product.id} />

            <CreateReviewExpansionPanel id={product.id} />


        </div>
    )
}
