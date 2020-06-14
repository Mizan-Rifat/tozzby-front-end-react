import React from 'react'
import { Route, Switch,Redirect } from 'react-router-dom';
import Profile from './Profile';
import Orders from './Orders';
import OrderView from './OrderView/OrderView';
import Wishlist from './Wishlist';


export default function UserBody() {
    return (
        <div>
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
        </div>
    )
}
