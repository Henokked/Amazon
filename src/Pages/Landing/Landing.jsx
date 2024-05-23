import React from 'react'
import LayOut from '../../Components/Layout/LayOut'
import CarouselEffect from '../../Components/Carousel/Carousel'
import Category from '../../Components/category/Category'
import Product from '../../Components/product/Product'

function Landing() {
  return (
   <LayOut>
         <CarouselEffect/>
        <Category/>
        <Product/>
   </LayOut>
  )
}

export default Landing