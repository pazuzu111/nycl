import React, { Component } from 'react'

export default class AdminDashboard extends Component {
    constructor() {
        super()

        this.state = {
            dataloaded1:false,
            data1: null
        }
    }

    //fetch users on mount
    componentDidMount() {
        this.fetchUsers()
    }

    //fetch users, setState, & catch any errors
    fetchUsers = () => {
        fetch('/api/users')
        .then(res => res.json())
        .then(res => {
            this.setState({
                dataloaded1: true,
                data1: res.data.users
            })
            console.log(this.state.data1)
        }).catch(err => console.log(err))
    }

    //delete user, fetch users to update dom, & catch any errors
    deleteUser = (id) => {
        fetch(`/api/users/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.fetchUsers()
        }).catch(err => console.log(err))
    }

    //block user access, fetch to update dom, & catch any errors
    blockUser = (e, id) => {
        e.preventDefault()

        fetch(`/api/users/${id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(res => res.json())
        .then(res => {
          console.log(res)
          this.fetchUsers()
        }).catch(err => console.log(err))
    }

    render() {

        //filter out admin and then map through users data
        const users = this.state.dataloaded1 ?
            this.state.data1.filter(x => x.username !== "admin").map(x => {
                return (
                    <div key={x.id}>
                        <h1>{x.username}</h1>
                        <button onClick={() => this.deleteUser(x.id)}>delete</button>
                        <button onClick={(e) => this.blockUser(e, x.id)}>block</button>
                    </div>
                )
            })
            :
            <h1>loading...</h1>

        return (<div>{users}</div>)
    }
}
