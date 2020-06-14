import React, { useState, useContext } from 'react'
import { Paper, IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import ProfileEdit from './ProfileEdit';
import PersonIcon from '@material-ui/icons/Person';
import { AppContext } from '../../App';


const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: '20px',
        border: 0
    },
    tag: {
        fontWeight: 'bold',
        marginRight: '20px',
        fontSize: '16px',
        flex: 1
    },
    name: {
        fontSize: '16px',
        flex: 4
    }
}))


export default function Profile() {

    const [editMode, setEditMode] = useState(false);

    const { user,setUser } = useContext(AppContext);

    const classes = useStyles();

    // console.log({user})
    return (
        <Paper variant='outlined' square className={classes.paper}>
            <div className="d-flex justify-content-between">
                <h5>Profile</h5>
                <IconButton aria-label="delete" onClick={() => setEditMode(!editMode)}>
                    {
                        editMode ?
                            <Tooltip title='Personal Information'>
                                <PersonIcon  />
                            </Tooltip>
                            :
                            <Tooltip title='Edit Information'>
                                <EditIcon />
                            </Tooltip>
                    }
                </IconButton>
            </div>

            <div className="" style={{ padding: '20px' }}>

                {
                    editMode ?

                        <ProfileEdit user={user} setUser={setUser} />
                        :
                        <PersonalInfo user={user} />
                }
            </div>


        </Paper>
    )
}


function PersonalInfo({ user }) {

    const classes = useStyles();
    console.log({user})

    return (
        <div>

            <div className="d-flex">
                <p className={classes.tag}>Name</p>
                <p className={classes.name}>{user.name}</p>
            </div>
            <div className="d-flex">
                <p className={classes.tag}>Gender</p>
                <p className={classes.name}>{user.gender != null && user.gender.toUpperCase()}</p>
                {/* <p className={classes.name}>{user.gender != null ? user.gender[0].toUpperCase() + user.gender.substring(1)}</p> */}
            </div>
            <div className="d-flex">
                <p className={classes.tag}>Mobile</p>
                <p className={classes.name}>{user.phone}</p>
            </div>
            <div className="d-flex">
                <p className={classes.tag}>Email</p>
                <p className={classes.name}>{user.email}</p>
            </div>
            <div className="d-flex">
                <p className={classes.tag}>Date Of Birth</p>
                <p className={classes.name}>{user.date_of_birth}</p>
            </div>


        </div>
    )
}