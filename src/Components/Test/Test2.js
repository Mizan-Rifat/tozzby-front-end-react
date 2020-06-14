import React from 'react'
import { Paper, Grid,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import RedditIcon from '@material-ui/icons/Reddit';


const useStyles = makeStyles(theme => ({

    text: {
        margin: 0,
        fontWeight: 700,
        color: 'white',
        fontSize: '18px !important',
        marginTop:'7px'
        // '&:hover':{
        //     color:'#FF6108'
        // }

    },
    paperRoot: {
        background: '#FF6108',
        marginTop: '2rem',
        padding: '30px'
    },
    icon: {
        padding: '5px',
        cursor: 'pointer',
        background: 'rgba(0,0,0,.2)',
        margin: '3px',
        '&:hover': {
            background: 'rgba(0,0,0,.4)'
        }
    },
    input:{
        padding:'5px 10px',
        width:'300px'
    },
    btn:{
        background:'black',
        color:'wheat',
        borderRadius:0,
        marginBottom:'4px',
        height:'38px',
        '&:hover': {
            background: 'rgba(0,0,0,.9)'
        }
    }
}))

export default function NewsLetter() {

    const classes = useStyles();


    return (
        <div className="d-flex pdiv">
            <div className="sdiv">

            </div>
            <div className="sdiv">

            </div>
            <div className="sdiv">

            </div>
            <div className="sdiv">

            </div>

        </div>
    )
}
