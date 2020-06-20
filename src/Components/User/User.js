import React, { useEffect, useContext } from 'react'
import { Container, Grid, Hidden } from '@material-ui/core';
import UserSidebar from './UserSidebar';
import UserBody from './UserBody';
import Profile from './Profile'
import { AppContext } from '../../App';
import AuthCheck from '../Common/AuthCheck';
import BackDrop from '../Common/BackDrop';


export default function User() {

    const [authenticated, userLoading] = AuthCheck();

    // useEffect(() => {
    //     if (Object.entries(user).length == 0) {
    //         setAuthOpen({ comp: 1, state: true })
    //     }

    // }, [user])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);



    return (
        <>
            {

                userLoading ?

                    <BackDrop />

                    :

                    !authenticated ?

                        <div className="text-center">
                            <h5 style={{ marginTop: '100px' }}>You need to be logged in to view this page.</h5>
                        </div>
                        :

                        <Container >

                            <Grid container spacing={3}>

                                <Grid item md={3}>
                                    <UserSidebar />
                                </Grid>

                                <Grid item xs={12} md={9}>
                                    <UserBody />
                                    {/* <Profile /> */}
                                </Grid>
                            </Grid>


                        </Container>
            }
        </>
    )
}
