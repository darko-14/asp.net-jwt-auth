import React, { Component } from 'react'
import ContactGrid from '../components/Contacts/ContactGrid'
import { authUser } from '../service/auth.service'
import { Link, Button } from '@mui/material'
import '../static/home.css'


export default class HomePage extends Component {

    componentDidMount(){
        const user = {
            username: 'Darko',
            password: 'targetgroup123'
        }
        authUser(user);
    }

    logout = () => {
        localStorage.removeItem('Token');
    }

    render() {
        return (

        <div>
            <h1>Wellcome -user-</h1>
            <div className='home'>
                <Button variant="outlined">
                    <Link underline='none' href="/add-contact" variant="body2">   
                        Add New Contact 
                    </Link>
                </Button>
                <Button variant="outlined" onClick={this.logout}>
                    <Link underline='none' href="/login" variant="body2">   
                    Logout
                    </Link>
                </Button>
            </div>
            <ContactGrid />
        </div>
        )
    }
}
