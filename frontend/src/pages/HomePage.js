import React, { Component } from 'react'
import ContactGrid from '../components/Contacts/ContactGrid'
import { authUser } from '../service/auth.service'
import { getContacts } from '../service/contacts.service'
import { Button, Box } from '@mui/material'
import {Link} from 'react-router-dom'
import '../static/home.css'
import DataGridTable from '../components/DataGridTable'
import { withRouter } from 'react-router-dom'

class HomePage extends Component {

    logout = () => {
        localStorage.removeItem('Token');
        localStorage.removeItem('User');
        window.location.reload()
    }

    render() {
        return (
        <div>
            <h1>Wellcome {this.props.user}</h1>
           <div className='buttons'>
                <Button variant="contained" href='/add-contact'>Add New Contact</Button>
                <Button variant="contained" color='error' onClick={this.logout} href='/login'>Logout</Button>
            </div>
            {/* <ContactGrid /> */}
            <DataGridTable/> 
        </div>
        )
    }
}

export default withRouter(HomePage)