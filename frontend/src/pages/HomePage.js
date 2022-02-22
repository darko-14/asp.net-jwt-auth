import React, { Component } from 'react'
import { Button } from '@mui/material'
import '../static/home.css'
import DataGridTable from '../components/DataGridTable'
import { withRouter } from 'react-router-dom'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

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
                <Button variant="contained" startIcon={<AddBoxOutlinedIcon />} href='/add-contact'>Add New Contact</Button>
                <Button variant="contained" color='error' endIcon={<LogoutOutlinedIcon />} onClick={this.logout} href='/login'>Logout</Button>
            </div>
            <DataGridTable/> 
        </div>
        )
    }
}

export default withRouter(HomePage)