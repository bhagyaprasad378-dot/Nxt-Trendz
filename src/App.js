<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
=======
import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {CartProvider} from './context/CartContext'
import Login from './components/Login'
import Home from './components/Home'
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <CartProvider>
    <Switch>
      <Route exact path='/login' component={Login} />

      <ProtectedRoute exact path='/' component={Home} />

      <ProtectedRoute exact path='/products' component={Products} />

      <ProtectedRoute
        exact
        path='/product-details/:id'
        component={ProductDetails}
      />

      <ProtectedRoute exact path='/products/:id' component={ProductDetails} />

      <ProtectedRoute exact path='/cart' component={Cart} />

      <Route exact path='/not-found' component={NotFound} />

      <Redirect to='/not-found' />
    </Switch>
  </CartProvider>
)

export default App
>>>>>>> f51adee (Add Payment enhancement to Nxt Trendz)
