import React from 'react'
import Banner from './Banner';
import TopSellers from './TopSellers';
import Recommended from './Recommended';
import News from './News';

function Home() {
  return (
    <div>
        <Banner/>
        <TopSellers/>
        <Recommended/>
        <News/>
    </div>
  )
}

export default Home;