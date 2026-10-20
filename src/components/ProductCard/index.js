import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const ProductCard = props => {
  const product = props.product || props.productData

  if (!product) {
    return null
  }

  const {id, title, brand, price, rating, image_url} = product

  return (
    <li className="product-item">
      <Link to={`/products/${id}`} className="link-item">
        <img src={image_url} alt={title} className="thumbnail" />
        <h1 className="title">{title}</h1>
        <p className="brand">{brand}</p>
        <div className="product-details-bottom">
          <p className="price">Rs {price}/-</p>
          <p className="rating">
            {rating}
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
            />
          </p>
        </div>
      </Link>
    </li>
  )
}

export default ProductCard
