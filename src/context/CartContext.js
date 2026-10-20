import React, {createContext, useContext, useState} from 'react'

const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cartList, setCartList] = useState([])

  const cartCount = cartList.length

  const totalItems = cartList.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0,
  )

  const addCartItem = (product, quantity = 1) => {
    const id = product.id || product._id
    const imageUrl = product.image_url || product.imageUrl

    setCartList(previousList => {
      const existing = previousList.find(item => String(item.id) === String(id))

      if (existing) {
        return previousList.map(item =>
          String(item.id) === String(id)
            ? {...item, quantity: Number(item.quantity) + Number(quantity)}
            : item,
        )
      }

      return [
        ...previousList,
        {
          ...product,
          id,
          imageUrl,
          image_url: imageUrl,
          quantity: Number(quantity),
        },
      ]
    })
  }

  const removeCartItem = id => {
    setCartList(previousList =>
      previousList.filter(item => String(item.id) !== String(id)),
    )
  }

  const removeAllCartItems = () => setCartList([])

  const incrementCartItemQuantity = id => {
    setCartList(previousList =>
      previousList.map(item =>
        String(item.id) === String(id)
          ? {...item, quantity: Number(item.quantity) + 1}
          : item,
      ),
    )
  }

  const decrementCartItemQuantity = id => {
    setCartList(previousList =>
      previousList
        .map(item =>
          String(item.id) === String(id)
            ? {...item, quantity: Number(item.quantity) - 1}
            : item,
        )
        .filter(item => Number(item.quantity) > 0),
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        cartCount,
        totalItems,
        addCartItem,
        removeCartItem,
        removeAllCartItems,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
