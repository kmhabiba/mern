import React from 'react'
import Hero from '../../components/website/Hero/Hero'
import Popular from '../../components/website/Popular/Popular'
import Offers from '../../components/website/Offers/Offers'
import NewCollections from '../../components/website/NewCollections/NewCollections'
import NewsLetter from '../../components/website/NewsLetter/NewsLetter'

const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <NewCollections/>
      <NewsLetter/>
    </div>
  )
}

export default Shop
