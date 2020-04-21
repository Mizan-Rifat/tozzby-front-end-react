import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  
    icon:{
        color:'red'
    }
 
})


export default function Test() {
    const classes = useStyles();
    const list = [
        { name: 'item1' },
        { name: 'item2' },
        { name: 'item3' },
        { name: 'item4' },
        { name: 'item5' },
        { name: 'item6' },
        { name: 'item7' },
        { name: 'item8' },
        { name: 'item9' },
        { name: 'item1' },
        { name: 'item2' },
        { name: 'item3' },
        { name: 'item4' },
        { name: 'item5' },
        { name: 'item6' },
        { name: 'item7' },
        { name: 'item8' },
        { name: 'item9' },
    ];

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NavigateNextIcon color='primary' />,
    };

    const itemStyle = {
        height: '100px',
        width: '100px',
        background: 'red',
        margin: '10px'
    }


    return (
        <div style={{width:'600px'}}>
            <Slider {...settings}>
                <div className='items'>div1</div>
                <div className='items'>div1</div>
                <div className='items'>div1</div>
                <div className='items'>div1</div>
                <div className='items'>div1</div>
                <div className='items'>div1</div>
                <div className='items'>div1</div>
                <div className='items'>div1</div>
                <div className='items'>div1</div>
                <div className='items'>div1</div>
                <div className='items'>div1</div>
                <div className='items'>div1</div>
            </Slider>
        </div>
    )
}
