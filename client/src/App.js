import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

//components
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import AdminDashboard from './components/AdminDashboard'

//styles
import './App.css';

export default class App extends Component {
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

    //after mount verify user
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

    //send request to server to be verified & setState with response
    handleLoginSubmit = (e, data) => {
        e.preventDefault()//prevent usual redirect behavior

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

    //send request to server to be verified & setState with response
    handleRegisterSubmit = (e, data) => {
        e.preventDefault()//prevent usual redirect behavior

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

    //send logoout reuest to server & setState with response
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

    //route checks*****************************
    let login = <Route exact path='/login' render={() => (
                    //if user auth is present
                    this.state.auth
                    ?
                    //if user is present enter this test otherwise it is a admin
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

    let dashboard = <Route exact path='/dashboard' render={() => (
                        //if not authenticated redirect otherwise render Dashboard
                        !this.state.auth ?
                                <Redirect to='/login' />
                                :
                                <Dashboard user={this.state.user} />
                    )} />

    let adminDashboard = <Route exact path='/adminDashboard' render={() => (
                            //if not authenticated redirect otherwise render AdminDashboard
                            !this.state.authAdmin ?
                                    <Redirect to='/login' />
                                    :
                                    <AdminDashboard data={this.state.data} />
                         )} />

    let register = <Route exact path='/register' render={() => (
                        //if either user or admin is present redirect to their dashboard else render register form
                        (this.state.auth || this.state.authAdmin)?
                                <Redirect to='/dashboard' />
                                :
                                <Register handleRegisterSubmit={this.handleRegisterSubmit} />
                    )} />
    //end of route checks*****************************

    return (
      <Router>
        <div className='App'>
            <Header logout={this.logout} />
            <div className='container'>
                {login}
                {dashboard}
                {adminDashboard}
                {register}
            </div>
        </div>
      </Router>
    );
  }
}
