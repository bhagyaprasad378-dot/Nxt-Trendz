import React, {useState} from 'react'
import Popup from 'reactjs-popup'
import './index.css'

const PaymentPopup = ({totalItems, totalPrice}) => {
  const [selectedPayment, setSelectedPayment] = useState('')
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const onConfirmOrder = () => {
    if (selectedPayment === 'cash') {
      setIsOrderPlaced(true)
    }
  }

  const onClosePopup = close => {
    close()
    setSelectedPayment('')
    setIsOrderPlaced(false)
  }

  return (
    <Popup
      modal
      trigger={
        <button type='button' className='checkout-button'>
          Checkout
        </button>
      }
      onClose={() => {
        setSelectedPayment('')
        setIsOrderPlaced(false)
      }}
    >
      {close => (
        <div className='payment-popup-container'>
          {isOrderPlaced ? (
            <div>
              <h1>Your order has been placed successfully</h1>
              <button type='button' onClick={() => onClosePopup(close)}>
                Close
              </button>
            </div>
          ) : (
            <div>
              <h1>Payment</h1>
              <h2>Payment Methods</h2>

              <div>
                <label>
                  <input type='radio' name='payment' disabled />
                  Card
                </label>
              </div>

              <div>
                <label>
                  <input type='radio' name='payment' disabled />
                  Net Banking
                </label>
              </div>

              <div>
                <label>
                  <input type='radio' name='payment' disabled />
                  UPI
                </label>
              </div>

              <div>
                <label>
                  <input type='radio' name='payment' disabled />
                  Wallet
                </label>
              </div>

              <div>
                <label>
                  <input
                    type='radio'
                    name='payment'
                    value='cash'
                    checked={selectedPayment === 'cash'}
                    onChange={event => setSelectedPayment(event.target.value)}
                  />
                  Cash on Delivery
                </label>
              </div>

              <h2>Order Summary</h2>
              <p>Number of Items: {totalItems}</p>
              <p>Total Price: Rs {totalPrice}/-</p>

              <button
                type='button'
                disabled={selectedPayment !== 'cash'}
                onClick={onConfirmOrder}
              >
                Confirm Order
              </button>

              <button type='button' onClick={() => onClosePopup(close)}>
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </Popup>
  )
}

export default PaymentPopup
