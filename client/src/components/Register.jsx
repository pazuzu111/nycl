import React, { Component } from 'react'

export default class Register extends Component {
    constructor (props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            email: ''
        }
  }

    //pull input values & setState
    handleInputChange = (e) => {
        const name = e.target.name
        const val = e.target.value

        this.setState({
            [name]: val
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.props.handleRegisterSubmit(e, this.state)}>
                    <input
                        type='text'
                        name='username'
                        value={this.state.username}
                        placeholder='Username'
                        onChange={this.handleInputChange} />
                    <input
                        type='password'
                        name='password'
                        value={this.state.password}
                        placeholder='Password'
                        onChange={this.handleInputChange} />
                    <input
                        type='text'
                        name='email'
                        value={this.state.email}
                        placeholder='Email Address'
                        onChange={this.handleInputChange} />
                    <input type='submit' value='Register' />
                </form>
            </div>
        )
    }
}
