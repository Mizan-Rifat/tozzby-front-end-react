import React,{useState,useEffect,useContext} from 'react';
import {AppContext} from '../../App';
import axios from 'axios';
import NotiToast from '../Common/NotiToast';

export default function useWishList() {

    const [product,setCartItemProduct] = useState('');

    const {cartItems, setCartItems} = useContext(AppContext);

    const [inCart,setInCart] = useState(false);
    const [inCartPending, setInCartPending] = useState(false);
    const toast = NotiToast();

    const addToCart = (quantity) => {

        setInCart(!inCart)
        setInCartPending(true)
        axios.post(`${process.env.REACT_APP_DOMAIN}/api/checkout/cart/add/${product.id}`, {
            "product_id": product.id,
            "quantity": quantity,
            "is_configurable": false
        }, { withCredentials: true })
            .then(response => {
                setCartItems(response.data.data)
                setInCartPending(false)
                toast('Item Added to Cart', 'success')
            })
            .catch(error => {
                setInCartPending(false)
            })
    }


    const removeFromCart = () => {
        // setInCart(!inCart)
        setInCartPending(true)
        const cartitem = cartItems.items.find(item => item.product.id == product.id)
        axios.get(`${process.env.REACT_APP_DOMAIN}/api/checkout/cart/remove-item/${cartitem.id}`, {
            withCredentials: true
        }).then(response => {
            console.log(response)
            setInCartPending(false)
            if (response.data.data == null) {
                setCartItems({})
            } else {
                setCartItems(response.data.data)
            }

            toast('Item removed', 'error')
        })
        .catch(error=>{
            setInCartPending(false)
        })
    }

    useEffect(() => {

        if (Object.entries(cartItems).length > 0 && typeof product == 'object') {

            if (cartItems.items.some(item => item.product.id == product.id)) {

                setInCart(true)
            } else {
                setInCart(false)
            }
        }else{
            setInCart(false)
        }

    },[cartItems,product])


    return [inCart,inCartPending,addToCart,removeFromCart,setCartItemProduct];
}
