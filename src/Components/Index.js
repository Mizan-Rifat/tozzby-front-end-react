import React from 'react';
import Appbar from './Appbar';
import Hero from './Hero/Hero';
import CategoryBars from './Bars/CategoryBars'
import { Container } from '@material-ui/core';
import Body from './Body';


export default function Index() {
    return (
        <Container>

            <Hero />
            <Body />

        </Container>
    )
}
