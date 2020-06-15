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
import useLoadingBar from '../Common/useLoadingBar';

export default function Body() {

    const { categories,loadingBarProgress, dispatchLoadingBarProgress } = useContext(AppContext)
    const [addLoadingBar, loadingBarJsx] = useLoadingBar();
    return (

        <div >
            {loadingBarJsx}
            <Hero addLoadingBar={addLoadingBar}/>
            <Elementor addLoadingBar={addLoadingBar}/>
            <CategoryBars addLoadingBar={addLoadingBar}/>
            <OffersBar addLoadingBar={addLoadingBar}/>
            <IndexTabs addLoadingBar={addLoadingBar}/>

            {
                    categories.state.filter(item => item.show_ == 1).map((category, index) => (
                        <ProductSection key={index} category={category} addLoadingBar={addLoadingBar} />
                    ))
            }

            <OffersBar banner={2} addLoadingBar={addLoadingBar}/>

            <JustForYou addLoadingBar={addLoadingBar}/>
            <NewsLetter addLoadingBar={addLoadingBar}/>
        </div>
    )
}
