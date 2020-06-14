import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Tooltip from '@material-ui/core/Tooltip';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import axios from 'axios'
import { AppContext } from '../../App';
import NotiToast from '../Common/NotiToast';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { useHistory } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx'
import useWishList from '../Common/useWishList';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '140px',
        margin: '20px',
        flex: '0 0 auto',
        background: '#F4F4F4',
        // background: '#F7F7E5',
        position: 'relative',
        cursor: 'pointer',
        // '&:hover': {
        //     transform: 'scale(1.1)',
        //     transition: '.3s ease-in'
        // }
    },

    media: {
        height: '170px',
        margin: '15px 0'
    },
    name: {
        padding: '0 !important',
        margin: '0 !important',
        marginTop: '10px',
        fontSize: '16px',
        // fontWeight: 700
    },
    pricetag: {
        fontWeight: 700,
        fontSize: '18px !important',
        color: '#FF5C00',
        display: 'inline'
    },
    options: {
        background: '#f4f4f4',
        padding: '0 7px',
        transform: 'translateY(-145px)',
        transition: '.2s ease-out',
        opacity: '1 !important'

    },


    fIcon: {

        color: '#FF7426',
        padding: '3px',
        '&:hover': {
            color: 'white',
        },

    },
    animate: {
        animation: `$spin 2000ms linear infinite`
    },
    iconContainer: {
        border: '1px solid #FF7426',
        borderRadius: '50%',
        padding: '3px',
        '&:hover': {
            color: 'white',
            background: '#ff7426',
            cursor: 'pointer'

        }
    },
    optionContainer: {
        position: 'absolute',
        top: '140px',
        zIndex: 3
    },
    "@keyframes spin":
    {
        "100%": {
            transform: "rotate(360deg)"
        }
    }
}));

export default function SingleProduct(props) {

    const { product } = props;
    const { loading = true } = props;
    const { wishlist = false } = props;
    const history = useHistory();
    const classes = useStyles();
    const { cartItems, setCartItems} = useContext(AppContext)
    const [showOptions, setShowOptions] = useState()

    const [inCart, setInCart] = useState(false);
    const [inCartPending, setInCartPending] = useState(false);


    const [inWishList, inWishListPending, toWishList,setProduct] = useWishList();

    const toast = NotiToast();




    const addToCart = () => {
        setInCartPending(true)
        axios.post(`${process.env.REACT_APP_DOMAIN}/api/checkout/cart/add/${product.id}`, {
            "product_id": product.id,
            "quantity": 1,
            "is_configurable": false
        }, { withCredentials: true })
            .then(response => {
                console.log(response)
                setCartItems(response.data.data)
                setInCartPending(false)
                setInCart(!inCart)
                toast('Item Added to Cart', 'success')
            })
    }


    const removeFromCart = () => {
        setInCartPending(true)
        const cartitem = cartItems.items.find(item => item.product.id == product.id)


        axios.get(`${process.env.REACT_APP_DOMAIN}/api/checkout/cart/remove-item/${cartitem.id}`, {
            withCredentials: true
        }).then(response => {
            console.log(response)
            if (response.data.data == null) {
                setCartItems({})
            } else {
                setCartItems(response.data.data)
            }
            setInCartPending(false)
            setInCart(!inCart)
            toast('Item removed', 'error')
        })
    }


    useEffect(() => {

        if (Object.entries(cartItems).length > 0) {
            if (cartItems.items.some(item => item.product.id == product.id)) {

                setInCart(true)
            } else {
                setInCart(false)
            }
        }

    }, [cartItems])

   
    useEffect(()=>{
            setProduct(product)
    },[product])

    return (

        <>

            {
                loading ?
                    <div>
                        <Skeleton animation='wave' height='200px' width='100%' animation='wave' />
                        <Skeleton animation='wave' height='50px' width='100%' animation='wave' />
                        <Skeleton animation='wave' height='50px' width='100%' animation='wave' />
                    </div>

                    :


                    <Card className={`${classes.root} productWrapper`} onMouseEnter={() => setShowOptions(true)} onMouseLeave={() => setShowOptions(false)} >


                        <CardMedia
                            className={classes.media}
                            image={product.base_image.medium_image_url}
                            title={product.name}
                            style={{ backgroundSize: 'contain' }}
                            onClick={() => history.push(`/product/${product.id}`)}
                        />



                        <CardContent className='text-center p-0 mt-2 position-relative'>



                            <div className="" style={{ height: '50px' }}>
                                <h5 className={classes.name}>{product.name}</h5>
                            </div>


                            {
                                product.hasOwnProperty('formated_special_price') ?
                                    <div className="d-flex justify-content-center">
                                        <div className={classes.pricetag} style={{ marginRight: '5px' }}>{product.formated_special_price}</div>
                                        <div className={classes.pricetag} style={{ textDecoration: 'line-through', fontWeight: 100 }}>{product.formated_price}</div>
                                    </div>
                                    :
                                    <p className={classes.pricetag}>{product.formated_price}</p>
                            }

                            <div className={`${classes.optionContainer} ${showOptions ? classes.options : ''}`} style={{ opacity: 1, width: '100%', height: '40px' }}>
                                <div className="d-flex justify-content-around">

                                    {
                                        inCart ?

                                            <Tooltip title="Remove From Cart">
                                                <div className={classes.iconContainer}>
                                                    <RemoveShoppingCartIcon className={clsx(classes.fIcon, { animate: inCartPending })} onClick={removeFromCart} />
                                                </div>
                                            </Tooltip>

                                            :

                                            <Tooltip title="Add To Cart">
                                                <div className={classes.iconContainer}>
                                                    <ShoppingCartIcon className={clsx(classes.fIcon, { animate: inCartPending })} onClick={addToCart} />
                                                </div>
                                            </Tooltip>

                                    }

                                    {
                                        inWishList ?

                                            <Tooltip title="Remove From Wishlist">
                                                <div className={classes.iconContainer}>
                                                    <FavoriteIcon className={clsx(classes.fIcon, { animate: inWishListPending })} onClick={toWishList} />
                                                </div>
                                            </Tooltip>
                                            :
                                            <Tooltip title="Add To Wishlist">
                                                <div className={classes.iconContainer}>
                                                    <FavoriteBorderIcon className={clsx(classes.fIcon, { animate: inWishListPending })} onClick={toWishList} />
                                                </div>
                                            </Tooltip>
                                    }


                                    <Tooltip title="Compare">
                                        <div className={classes.iconContainer}>
                                            <CompareArrowsIcon className={classes.fIcon} />
                                        </div>
                                    </Tooltip>
                                </div>
                            </div>


                        </CardContent>
                    </Card>
            }
        </>
    );
}
