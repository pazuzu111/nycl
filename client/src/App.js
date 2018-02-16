import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

//components
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import './App.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            auth: false,
            authAdmin: false,
            user: [],
            data: null,
            blockUser: false
        }
    }

    componentDidMount() {
        fetch('/api/auth/verify', {
          credentials: 'include'
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                auth: res.auth,
                authAdmin: res.authAdmin,
                user: res.data.user,
                data: res.data.users,
                blockUser: res.blockUser
            })
        }).catch(err => console.log(err))
    }

    handleLoginSubmit = (e, data) => {
        e.preventDefault()

        fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                auth: res.auth,
                authAdmin: res.authAdmin,
                user: res.data.user,
                blockUser: res.blockUser
            })
              console.log('after db check',res.user)
        }).catch(err => console.log(err))
    }

    handleRegisterSubmit = (e, data) => {
        e.preventDefault()

        fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.setState({
                auth: res.auth,
                authAdmin: res.authAdmin,
                user: res.data.user,
                data: res.data.users
            })
        }).catch(err => console.log(err))
    }

    logout = () => {

        fetch('/api/auth/logout', {
          credentials: 'include'
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                auth: res.auth,
                authAdmin: res.authAdmin
            })
          }).catch(err => console.log(err))
    }

  render() {
    let login = <Route exact path='/login' render={() => (
                  this.state.auth
                    ?
                    (this.state.auth ?
                            <Redirect to='/dashboard' />
                            :
                            <Login handleLoginSubmit={this.handleLoginSubmit} />)
                    :
                    (this.state.authAdmin ?
                            <Redirect to='/admindashboard' />
                            :
                            <Login handleLoginSubmit={this.handleLoginSubmit} />)
                )} />

    let register = <Route exact path='/register' render={() => (
                        (this.state.auth || this.state.authAdmin)?
                                <Redirect to='/dashboard' />
                                :
                                <Register handleRegisterSubmit={this.handleRegisterSubmit} />
                    )} />
    return (
      <div className="App">
        {login}
        {register}

      </div>
    );
  }
}

export default App;
