import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Chip } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import './section.css'
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
    root: {
        width: '150px',
        margin: '20px',
        flex: '0 0 auto',
        background: '#F7F7E5'
        // '&:hover': {
        //     transform: 'scale(1.1)',
        //     transition: '.3s ease-in'
        // }
    },

    media: {
        height: 150,
    },
    name: {
        padding: '0 !important',
        margin: '0 !important',
        fontSize: '16px',
        fontWeight: 700
    },
    pricetag: {
        fontWeight: 700,
        fontSize: '14px',
        color: '#FF5C00'
    },
    options: {
        background: 'white',
        padding: '0 7px',
        transform: 'translateY(-60px)',
        transition: '.2s ease-out',
        opacity: '1 !important'

    },
    // options: {
    //     background:'white',
    //     padding: '0 7px',
    //     opacity:0,
    //     '&:hover': {
    //         transform: 'translateY(-60px)',
    //         opacity:1,
    //         transition: '.1s ease-in'
    //     }

    // },
    chip: {
        background: '#FF7426',
        color: '#fff'
    },
    fIcon: {
        border: '1px solid #FF7426',
        borderRadius: '50%',
        padding: '4px',
        color: '#FF7426',
        '&:hover': {
            color: 'white',
            background: '#ff7426'

        }
    }
});

export default function SingleProduct({ product }) {
    const classes = useStyles();

    const [showOptions, setShowOptions] = useState(false)

    const addTocart = () => {

    }

    return (
        <Card className={`${classes.root} productWrapper`} onMouseEnter={() => setShowOptions(true)} onMouseLeave={() => setShowOptions(false)}>

            <CardActionArea>

                <CardMedia
                    className={classes.media}
                    image={require(`../images/${product.image}`)}
                    title={product.name}
                />

                <CardContent className='text-center p-0 mt-2 position-relative'>
                    <h5 className={classes.name}>{product.name}</h5>
                    <p className={classes.pricetag}>${product.price}</p>

                    <div className={`${showOptions ? classes.options : ''} d-flex justify-content-between`} style={{ opacity: 0 }}>

                        <Chip size="small" label="Add To Cart" onClick={addTocart} className={classes.chip} />
                        <Tooltip title="Add To Wishlist">
                            <FavoriteBorderIcon className={classes.fIcon} title='dds' />
                        </Tooltip>
                        <Tooltip title="Compare">
                            <CompareArrowsIcon className={classes.fIcon} />
                        </Tooltip>

                    </div>
                </CardContent>

            </CardActionArea>


        </Card>
    );
}
