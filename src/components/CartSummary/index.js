import React from 'react'
import {useCart} from '../../context/CartContext'
import PaymentPopup from '../PaymentPopup'
import './index.css'

const CartSummary = () => {
  const {cartList, totalItems} = useCart()

  const totalPrice = cartList.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0,
  )

  return (
    <div className="cart-summary">
      <h1 className="cart-summary-heading">Order Total</h1>
      <h1>Rs {totalPrice}/-</h1>
      <p>
        <span>{totalItems}</span> Items in cart
      </p>
      <PaymentPopup totalItems={totalItems} totalPrice={totalPrice} />
    </div>
  )
}

export default CartSummary
