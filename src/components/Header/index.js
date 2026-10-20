import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useCart} from '../../context/CartContext'
import './index.css'

const Header = () => {
  const history = useHistory()
  const {cartCount} = useCart()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <header>
      <Link to="/" aria-label="Home">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
        />
      </Link>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/cart">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="cart"
              />
              <span>{cartCount}</span>
            </Link>
          </li>
        </ul>
        <button type="button" onClick={onClickLogout}>
          Logout
        </button>
      </nav>
    </header>
  )
}

export default Header
