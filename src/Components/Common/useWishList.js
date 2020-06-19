import React,{useState,useEffect,useContext} from 'react';
import {AppContext} from '../../App';
import axios from 'axios';
import NotiToast from '../Common/NotiToast';

export default function useWishList() {

    const [product,setWishListProduct] = useState('');

    const {wishListItems, setWishListItems} = useContext(AppContext);

    const [inWishList,setInWishList] = useState(false);
    const [inWishListPending, setInWishListPending] = useState(false);
    const toast = NotiToast();

    useEffect(() => {
console.log(typeof product == 'object')
        if (Object.entries(wishListItems).length > 0 && typeof product == 'object') {
            if (wishListItems.some(item => item.product.id == product.id)) {

                setInWishList(true)
            } else {
                setInWishList(false)
            }
        } 

    },[wishListItems,product])

    const toWishList = () => {
        setInWishListPending(true)
        axios.get(`${process.env.REACT_APP_DOMAIN}/api/wishlist/add/${product.id}?token=true`,
            { withCredentials: true }
        )
            .then(response => {
                if (response.data.data != null) {
                    setWishListItems([...wishListItems, response.data.data])
                } else {
                    setWishListItems(wishListItems.filter(item => item.product.id != product.id))
                }

                setInWishListPending(false)
                setInWishList(!inWishList)
                toast(response.data.message, 'success')
            }).catch(error=>{
                setInWishListPending(false)
            })
    }



    return [inWishList,inWishListPending,toWishList,setWishListProduct];
}
