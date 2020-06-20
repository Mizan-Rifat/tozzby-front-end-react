import React, { useState, createContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Profile from './Profile';
import Orders from './Orders';
import OrderView from './OrderView/OrderView';
import Wishlist from './Wishlist';

export const OrderContext = createContext();
export default function UserBody() {

    const [orders, setOrders] = useState({
        orders:[],
        loading:true
    })
    
    return (
        <div>

            <OrderContext.Provider value={{ orders, setOrders }}>

                <Switch>

                    <Route
                        path='/account/profile' component={Profile}
                    />
                    <Route
                        path='/account/orders' component={Orders}
                    />
                    <Route
                        path='/account/order/view/:id' component={OrderView}
                    />
                    <Route
                        path='/account/wishlist' component={Wishlist}
                    />

                    <Redirect from='/account' to='/account/profile' />



                </Switch>
            </OrderContext.Provider>
        </div>
    )
}
