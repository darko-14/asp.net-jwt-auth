import React, { Component } from 'react'
import { Button, Typography, Paper, Link, Grid, TextField } from '@mui/material'
import '../static/form.css'
import LoginIcon from '@mui/icons-material/Login';


export default class Login extends Component {

    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        }
    }



    render() {
        return (
            <div>
                <Grid container spacing={1} justify="center" direction="row" className="form">
                    <Grid item>
                        <Grid container direction="column" justify="center" spacing={4} className="form">
                            <Paper variant="elevation" elevation={2} className="form-background">
                               <Grid container spacing={3} direction='column'>
                                    <Typography component="h1" variant="h4">
                                        Login
                                    </Typography>
                                    <Grid item>
                                        <TextField type="email" placeholder="Username" fullWidth  name="username" variant="outlined" required autoFocus />
                                    </Grid>
                                    <Grid item>
                                        <TextField type="password" placeholder="Password" fullWidth name="password" variant="outlined" required />
                                    </Grid>
                                    <Grid item>
                                        <Button className="button-block" startIcon={<LoginIcon />} variant="contained">Login</Button>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/register" variant="body2">
                                            Don't have an account? Register here.
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
