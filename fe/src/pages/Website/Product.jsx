import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext';
import {useParams} from 'react-router-dom';
import Breadcrum from '../../components/website/Breadcrums/Breadcrum';
import ProductDisplay from '../../components/website/ProductDispaly';
import DescriptionBox from '../../components/website/DescriptionBox';
import RelatedProducts from '../../components/website/RelatedProducts';
const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=>e.id === Number(productId))
  return (
    <div>
        <Breadcrum product={product}/>
        <ProductDisplay product={product}/>
        <DescriptionBox/>
        <RelatedProducts/>
    </div>
  )
}

export default Product
