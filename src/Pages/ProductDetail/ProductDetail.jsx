import React, { useState, useEffect } from 'react';
import LayOut from '../../Components/Layout/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoint';
import ProductCard from '../../Components/product/ProductCard';
import Loader from '../../Components/Loader/Loader';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${productUrl}/products/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details.');
        setLoading(false);
      }
    };
console.log("prodcutidd")
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <LayOut>
        <div><Loader/></div>
      </LayOut>
    );
  }

  if (error) {
    return (
      <LayOut>
        <div>{error}</div>
      </LayOut>
    );
  }

  return (
    <LayOut>
      <ProductCard product={product} flex={true} renderDesc={true}/>
      
    </LayOut>
  );
}

export default ProductDetail;
