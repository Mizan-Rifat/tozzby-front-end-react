import React, { useState, useEffect, createContext, useReducer } from 'react';
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
import loadingBarReducer from './Components/Reducers/loadingBarReducer';
import LoadingBar from 'react-top-loading-bar';

const useStyles = makeStyles((theme) => ({
  topClass: {
    top: '60px'
  },
}));


export const AppContext = createContext();


function App() {

  const styleClasses = useStyles();

  const [loadingBarProgress, dispatchLoadingBarProgress] = useReducer(loadingBarReducer, {
    value: 0
  })



  const [cartItems, setCartItems] = useState({})
  const [cartItemsLoading, setCartItemsLoading] = useState(true)
  const [wishListItems, setWishListItems] = useState([])
  const [wishListItemsLoading, setWishListItemsLoading] = useState(true)
  const [authOpen, setAuthOpen] = useState({
    state: false,
    comp: 1
  })
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState({
    state: [],
    loading: true
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

        setUser(response.data.data)
        setLoading(false)

      }).catch(error => {
        // console.log(error.response.status)
        setLoading(false)
      })

  }, [])

  useEffect(() => {

    if (Object.entries(user).length > 0) {

      axios.get(`${process.env.REACT_APP_DOMAIN}/api/wishlist?customer_id=${user.id}&token=true`,
        {
          withCredentials: true
        }
      )
        .then(response => {
          if (response.data.data != null) {
            setWishListItems(response.data.data)

          }
          setWishListItemsLoading(false)
        }).catch(error => {
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
      }).catch(error => {
        console.log(error)
        setCartItemsLoading(false)
      })

  }, [user])



  return (
    <BrowserRouter>

      {
        !loading ?
          // true &&

          <AppContext.Provider value={{ user, setUser, cartItems, setCartItems, cartItemsLoading, authOpen, setAuthOpen, categories, wishListItems, setWishListItems, loadingBarProgress, dispatchLoadingBarProgress }}>

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
