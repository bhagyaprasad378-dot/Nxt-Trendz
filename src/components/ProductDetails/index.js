import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {Link, useParams} from 'react-router-dom'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import {useCart} from '../../context/CartContext'
import './index.css'

const ProductDetails = () => {
  const {id} = useParams()
  const [product, setProduct] = useState(null)
  const [similarProducts, setSimilarProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [errorType, setErrorType] = useState('')

  const {addCartItem} = useCart()

  useEffect(() => {
    let isMounted = true

    const getProductDetails = async () => {
      setIsLoading(true)
      setErrorType('')
      setProduct(null)
      setSimilarProducts([])
      setQuantity(1)

      try {
        const response = await fetch(
          `https://apis.ccbp.in/products/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${Cookies.get('jwt_token')}`,
            },
          },
        )

        if (response.status === 404) {
          if (isMounted) {
            setErrorType('not-found')
          }
          return
        }

        if (response.ok === false) {
          if (isMounted) {
            setErrorType('failure')
          }
          return
        }

        const data = await response.json()

        if (isMounted) {
          if (!data.product_details) {
            setErrorType('not-found')
          } else {
            setProduct(data.product_details)
            setSimilarProducts(data.similar_products || [])
          }
        }
      } catch (error) {
        if (isMounted) {
          setErrorType('failure')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    getProductDetails()

    return () => {
      isMounted = false
    }
  }, [id])

  const onClickAddToCart = () => {
    if (product) {
      addCartItem(
        {
          ...product,
          id: product.id || product._id,
          imageUrl: product.image_url,
        },
        quantity,
      )
    }
  }

  if (isLoading) {
    return (
      <div className="product-item-details-route">
        <Header />
        <div data-testid="loader" className="loader-container">
          <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
        </div>
      </div>
    )
  }

  if (errorType === 'not-found') {
    return (
      <div className="product-item-details-route">
        <Header />
        <div className="product-not-found">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
            alt="error view"
          />
          <h1>Product Not Found</h1>
          <Link to="/products">
            <button type="button">Continue Shopping</button>
          </Link>
        </div>
      </div>
    )
  }

  if (errorType === 'failure' || !product) {
    return (
      <div className="product-item-details-route">
        <Header />
        <div className="product-not-found">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
            alt="error view"
          />
          <h1>Something Went Wrong</h1>
          <button type="button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="product-item-details-route">
      <Header />

      <div className="product-details-container">
        <img
          src={product.image_url}
          alt="product"
          className="product-details-image"
        />

        <div className="product-info">
          <h1>{product.title}</h1>
          <p>{product.price}</p>
          <p>{product.rating}</p>
          <p>{product.total_reviews}</p>
          <p>{product.description}</p>
          <p>{product.availability}</p>
          <p>{product.brand}</p>

          <div className="quantity-container">
            <button
              type="button"
              data-testid="minus"
              onClick={() =>
                setQuantity(previous => Math.max(1, previous - 1))
              }
            >
              <BsDashSquare />
            </button>

            <p>{quantity}</p>

            <button
              type="button"
              data-testid="plus"
              onClick={() => setQuantity(previous => previous + 1)}
            >
              <BsPlusSquare />
            </button>
          </div>

          <button type="button" onClick={onClickAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>

      <div className="similar-products-container">
        <h1>Similar Products</h1>
        <ul className="similar-products-list">
          {similarProducts.map(eachProduct => (
            <li key={eachProduct.id}>
              <img
                src={eachProduct.image_url}
                alt={`similar product ${eachProduct.title}`}
              />
              <p>{eachProduct.title}</p>
              <p>{eachProduct.brand}</p>
              <p>{eachProduct.rating}</p>
              <p>{eachProduct.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProductDetails
