import React from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import {useCart} from '../../context/CartContext'
import CartItem from '../CartItem'
import CartSummary from '../CartSummary'
import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useCart()

  return (
    <div className='cart-container'>
      <Header />

      {cartList.length === 0 ? (
        <div className='empty-cart-container'>
          <img
            src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-empty-img.png'
            alt='cart empty'
          />
          <h1>Your Cart Is Empty</h1>
          <Link to='/products'>
            <button type='button'>Shop Now</button>
          </Link>
        </div>
      ) : (
        <div className='cart-content'>
          <h1 className='cart-heading'>My Cart</h1>

          <button
            type='button'
            className='remove-all-button'
            onClick={removeAllCartItems}
          >
            Remove All
          </button>

          <ul className='cart-list'>
            {cartList.map(item => (
              <CartItem key={item.id} cartItem={item} />
            ))}
          </ul>

          <CartSummary />
        </div>
      )}
    </div>
  )
}

export default Cart
