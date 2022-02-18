import React, { Component } from 'react'
import ContactGrid from '../components/Contacts/ContactGrid'
import { authUser } from '../service/auth.service'
import { getContacts } from '../service/contacts.service'
import { Link, Button } from '@mui/material'
import '../static/home.css'
import DataGridTable from '../components/DataGridTable'

export default class HomePage extends Component {

    logout = () => {
        localStorage.removeItem('Token');
        localStorage.removeItem('User');
        window.location.reload()
    }

    render() {
        return (

        <div>
            <h1>Wellcome {this.props.user}</h1>
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
            {/* <ContactGrid /> */}
            <DataGridTable/> 
        </div>
        )
    }
}
