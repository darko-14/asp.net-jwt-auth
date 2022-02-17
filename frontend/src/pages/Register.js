import React, { Component } from 'react'
import { Button, Typography, Paper, Link, Grid, TextField } from '@mui/material'
import '../static/form.css'

export default class Register extends Component {

  constructor(){
      super();
      this.state = {

      }
  }

  render() {
    return (
      <div>
          <Grid container spacing={1} justify="center" direction='row' className='form'>
            <Grid item>
                <Grid container spacing={2} direction='column' justify="center" className='form'>
                    <Paper elevation={2} className='form-background'>
                        <Grid container spacing={3} direction='column'>
                            <Typography component="h1" variant="h4">
                                Register
                            </Typography>
                            <Grid item>
                                <TextField type="text" placeholder="Username" fullWidth  name="username" variant="outlined" required autoFocus/>
                            </Grid>
                            <Grid item>
                                <TextField type="email" placeholder="Email" fullWidth  name="email" variant="outlined" required autoFocus/>
                            </Grid>
                            <Grid item>
                                <TextField type="password" placeholder="Password" fullWidth  name="password" variant="outlined" required autoFocus/>
                            </Grid>
                            <Grid item>
                                <Button className="button-block" variant="contained">Register</Button>
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
