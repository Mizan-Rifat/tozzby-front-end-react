import React,{useEffect} from 'react'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import useLoadingBar from '../Common/useLoadingBar';

const useStyles = makeStyles(theme => ({
    imgStyle: {
        width: '385px',
        transition: '.3s ease-in',
        '&:hover': {
            transform: 'scale(1.1)',
            cursor: 'pointer'
        }
    },
    imgStyle2: {
        width: '100%',
        transition: '.3s ease-in',
        '&:hover': {
            transform: 'scale(1.05)',
            cursor: 'pointer'
        }
    },
    paperRoot: {
        marginTop: '2rem',
        padding: '15px 0',
    }
}))
export default function OffersBar({ banner,addLoadingBar }) {
    const classes = useStyles();
    useEffect(() => {
        addLoadingBar(10)
    }, [])
    return (
        <>
            {
                banner == 2 ?

                    <Paper elevation={0} className={classes.paperRoot}>
                        <div className='d-flex justify-content-around' >
                            <div className='text-center col-6' >

                                <img src={require('../images/b1.jpg')} className={classes.imgStyle2} />

                            </div>
                            <div className='text-center col-6' >

                                <img src={require('../images/b2.jpg')} className={classes.imgStyle2} />

                            </div>

                        </div>
                    </Paper>
                    :
                    <Paper elevation={0} className={classes.paperRoot}>
                        <div className='d-flex justify-content-around' >
                            <div className='text-center col-4' >

                                <img src={require('../images/bn.jpg')} className={classes.imgStyle2} />

                            </div>
                            <div className='text-center col-4' >

                                <img src={require('../images/bn1.jpg')} className={classes.imgStyle2} />

                            </div>
                            <div className='text-center col-4' >

                                <img src={require('../images/bn2.jpg')} className={classes.imgStyle2} />

                            </div>
                        </div>
                    </Paper>
            }

        </>
    )
}
