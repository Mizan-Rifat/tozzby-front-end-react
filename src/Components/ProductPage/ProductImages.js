import React,{useState,useContext} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MySLider from '../Common/MySLider';
import {ProductContext} from './Product';

const useStyles = makeStyles(theme => ({
    picContainer: {
        textAlign: 'center',
        transition:'.3s ease-in'
    },
    mainImage: {
        width: '80%',
        height: '500px'
    },
    thumbnail: {
        flex: '0 0 auto',
        margin: '5px',
        height: '100px',
        width: '100px',
        border: '1px solid black',
        '&:hover': {
            border: '1px solid red',
        },
        
    },
    cont:{
        '&:focus':{
            outline:'none'
        }
    },
    thumbnailImage:{
        height:'90px',
        backgroundSize:'contain',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat'
    }
}))

export default function ProductImages() {
    const classes = useStyles();

    const {product} = useContext(ProductContext)

    const [selectedImage, setselectedImage] = useState(0)

    return (
        <>
            <div className={classes.picContainer}>
                <img src={product.images[selectedImage].original_image_url} className={classes.mainImage} />
                
            </div>
            <div>
                <MySLider>

                    {
                        product.images.map((item, index) => (
                            <div onClick={()=>setselectedImage(index)} className={classes.cont}>
                                <div key={index} className={classes.thumbnail}>
                                    <div className={classes.thumbnailImage} 
                                    style={{ backgroundImage: `url(${item.small_image_url})`, }}/>
                                </div>
                            </div>
                        ))
                    }


                </MySLider>

            </div>
        </>
    )
}
