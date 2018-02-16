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

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
