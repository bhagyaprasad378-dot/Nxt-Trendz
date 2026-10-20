import React from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import {useCart} from '../../context/CartContext'
import './index.css'

const CartItem = ({cartItem}) => {
  const {id, title, brand, price, quantity} = cartItem
  const imageUrl = cartItem.imageUrl || cartItem.image_url

  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useCart()

  return (
    <li>
      <img src={imageUrl} alt={title} />

      <div>
        <p>{title}</p>
        <p>{brand}</p>

        <div>
          <button
            type="button"
            data-testid="minus"
            onClick={() => decrementCartItemQuantity(id)}
          >
            <BsDashSquare />
          </button>

          <p>{quantity}</p>

          <button
            type="button"
            data-testid="plus"
            onClick={() => incrementCartItemQuantity(id)}
          >
            <BsPlusSquare />
          </button>
        </div>

        <p>Rs {Number(price) * Number(quantity)}/-</p>
      </div>

      <button
        type="button"
        data-testid="remove"
        onClick={() => removeCartItem(id)}
      >
        <AiFillCloseCircle />
      </button>
    </li>
  )
}

export default CartItem
