import React, { Component } from 'react'

export default class AdminDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dataloaded1:false,
            data1: null
        }
    }

    componentDidMount() {
        this.fetchUsers()
    }

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


    render() {

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
