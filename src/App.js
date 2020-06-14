import React, { useState, useEffect, createContext,useReducer } from 'react';
import Appbar from './Components/Appbar/Appbar'
import Index from './Components/Index/Index';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Test from './Components/Test/Test';
import Product from './Components/ProductPage/Product';
import Cart from './Components/Cart/Cart';
import Checkout from './Components/Checkout/Checkout';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Auth from './Components/Auth/Auth';
import User from './Components/User/User';
import Category from './Components/Category/Category';
import Body from './Components/Index/Body';
import Footer from './Components/Common/Footer';
import userReducer from './Components/Reducers/UserReducer'
import UserReducer from './Components/Reducers/UserReducer';

const useStyles = makeStyles((theme) => ({
  topClass: {
    top: '60px'
  },
}));


export const AppContext = createContext();


function App() {

  const styleClasses = useStyles();

  const [user, userDispatch] = useReducer(UserReducer,{
    user:{},
    loading:true,
    error:{
      message:''
    }
  })

  const [cartItems, setCartItems] = useState({})
  const [cartItemsLoading, setCartItemsLoading] = useState(true)
  const [wishListItems, setWishListItems] = useState([])
  const [wishListItemsLoading, setWishListItemsLoading] = useState(true)
  const [authOpen, setAuthOpen] = useState({
    state: false,
    comp: 1
  })
  
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState({
    state: [],
    loading: true,
   
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_DOMAIN}/api/categoriestree`)
      .then(response => {
        setCategories({
          state: response.data,
          loading: false
        })
      }).catch(error => {
        setCategories({
          ...categories,
          loading: false
        })
      })
  }, [])

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_DOMAIN}/api/customer/get?token=true`,
      { withCredentials: true }
    )
      .then(response => {

        userDispatch({
          type:'LOGIN',
          payload:response.data.data
        })

      }).catch(error => {
        console.log(error.response)
        userDispatch({
          type:'ERROR',
          payload:error.response.data.error
        })
      })

  }, [])

  useEffect(() => {

    if (Object.entries(user).length > 0) {

      axios.get(`${process.env.REACT_APP_DOMAIN}/api/wishlist?customer_id=${user.user.id}&token=true`,
        { 
          withCredentials: true 
        }
      )
        .then(response => {
          if (response.data.data != null) {
            setWishListItems(response.data.data)
            
          }
          setWishListItemsLoading(false)
        }).catch(error=>{
          console.log(error)
          setWishListItemsLoading(false)
        })

    }

    axios.get(`${process.env.REACT_APP_DOMAIN}/api/checkout/cart`, { withCredentials: true })
      .then(response => {
        if (response.data.data != null) {
          setCartItems(response.data.data)
          
        }
        setCartItemsLoading(false)
      }).catch(error=>{
        console.log(error)
        setCartItemsLoading(false)
      })

  }, [user.user])



  return (
    <BrowserRouter>

      {
        !user.loading ?
        // true &&

        <AppContext.Provider value={{ user, userDispatch, cartItems, setCartItems, authOpen, setAuthOpen, categories,wishListItems, setWishListItems }}>

          <Appbar />
          <SnackbarProvider
            classes={{
              anchorOriginTopRight: styleClasses.topClass
            }}

          >
            <div className="topMargin">
              <Switch>
                <Route path='/' exact component={Body} />
                <Route path='/product/:id' component={Product} />
                <Route path='/category/:slug' component={Category} />
                <Route path='/test' component={Test} />
                <Route path='/cart' component={Cart} />
                <Route path='/checkout' component={Checkout} />
                <Route path='/account' component={User} />
              </Switch>
            </div>
          </SnackbarProvider>
          <Auth />
          <Footer />
        </AppContext.Provider>
        : ''
      }
    </BrowserRouter>
  );
}

export default App;
