import React, { useContext } from 'react'
import { Grid, Hidden } from '@material-ui/core';
import CategoryBars from '../Bars/CategoryBars';
import ProductSection from '../Sections/ProductSection';
import CategoryList from '../Sidebars/CategoryList'
import Hero from '../Hero/Hero';
import { AppContext } from '../../App';
import IndexTabs from './IndexTabs'
import JustForYou from './JustForYou';
import OffersBar from './OffersBar';
import Elementor from './Elementor';
import NewsLetter from './NewsLetter';

export default function Body() {

    const { categories } = useContext(AppContext)
    return (

        <div >
            <Hero />
            <Elementor />
            <CategoryBars />
            <OffersBar />
            <IndexTabs />

            {
                    categories.state.filter(item => item.show_ == 1).map((category, index) => (
                        <ProductSection key={index} category={category} />
                    ))
            }

            <OffersBar banner={2} />

            <JustForYou />
            <NewsLetter />
        </div>
    )
}
