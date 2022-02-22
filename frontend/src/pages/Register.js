import React, { Component } from 'react'
import { Button, Typography, Paper, Link, Grid, TextField } from '@mui/material'
import '../static/form.css'
import { register } from '../service/users.service';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import LoginIcon from '@mui/icons-material/Login';


export default class Register extends Component {

constructor(){
    super();
    this.state = {
    username: '',
    email: '',
    password: ''
    }
}

handleChange = (e) => {
this.setState({[e.target.name]: e.target.value});
}

handleSubmit = () => {
    register(this.state)
    window.location.href = '/login'
}

  render() {
    return (
      <div>
          <Grid container spacing={1} justify="center" direction='row' className='form'>
            <Grid item>
                <Grid container spacing={2} direction='column' justify="center" className='form'>
                    <Paper elevation={2} className='form-background'>
                        <Grid container spacing={3} direction='column' >
                            <Typography component="h1" variant="h3">
                                <PersonAddAltRoundedIcon fontSize='large'/> Register
                            </Typography>
                            <Grid item>
                                <TextField type="text" placeholder="Username" fullWidth  name="username" label="Username"
                                onChange={this.handleChange} variant="outlined" required autoFocus/>
                            </Grid>
                            <Grid item>
                                <TextField type="email" placeholder="Email" fullWidth  name="email" label="Email"
                                onChange={this.handleChange} variant="outlined" required autoFocus/>
                            </Grid>
                            <Grid item>
                                <TextField type="password" placeholder="Password" fullWidth  name="password" label="Password"
                                onChange={this.handleChange} variant="outlined" required autoFocus/>
                            </Grid>
                            <Grid item>
                                <Button className="button-block" startIcon={<LoginIcon />}  onClick={this.handleSubmit} variant="contained">Register</Button>
                            </Grid>
                            <Grid item>
                            <Link href='/login' variant='body2'>
                                    Already have an account? Login here.
                            </Link>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
          </Grid>
      </div>
    )
  }
}
