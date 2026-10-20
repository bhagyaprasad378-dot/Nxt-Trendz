import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    try {
      const response = await fetch('https://apis.ccbp.in/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
      })

      const data = await response.json()

      if (data.jwt_token) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 30})
        this.props.history.replace('/')
      } else {
        this.setState({
          showSubmitError: true,
          errorMsg: data.error_msg || 'Invalid username or password',
        })
      }
    } catch (error) {
      this.setState({
        showSubmitError: true,
        errorMsg: 'Something went wrong',
      })
    }
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to='/' />
    }

    const {username, password, showSubmitError, errorMsg} = this.state

    return (
      <div>
        <img
          src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png'
          alt='website login'
        />
        <form onSubmit={this.submitForm}>
          <label htmlFor='username'>USERNAME</label>
          <input
            id='username'
            type='text'
            value={username}
            onChange={this.onChangeUsername}
          />

          <label htmlFor='password'>PASSWORD</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={this.onChangePassword}
          />

          <button type='submit'>Login</button>

          {showSubmitError && <p>{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
