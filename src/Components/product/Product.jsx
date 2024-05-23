import React, { useState, useEffect } from 'react'
import axios from "axios"
import ProductCard from './ProductCard'
import classes from "./product.module.css"

function Product() {
    const[products, setproducts] = useState()

    useEffect(() => {
      axios.get('https://fakestoreapi.com/products')
      .then((res)=>{
        setproducts(res.data)
           
      }).catch((err)=>{
        console.log(err)
      })
    
      
    }, [])
    console.log(products)
    
  return (
  <section className={classes.product_container}>
    {

    products?.map((singleproduct)=>
       <ProductCard product = {singleproduct} key={singleproduct.id}/>)
    }
  </section>
  )
}

export default Product