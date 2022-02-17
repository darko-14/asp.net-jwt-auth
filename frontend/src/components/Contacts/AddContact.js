import React, { Component } from 'react'
import '../../static/form.css'
import { Paper, Button, Grid, Typography, Link, TextField } from '@mui/material'

export default class AddContact extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
        }
        
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div>
                <Grid container spacing={1} justify="center" direction="row" className="form">
                    <Grid item>
                        <Grid container direction="column" justify="center" spacing={4} className="form">
                            <Paper variant="elevation" elevation={1} className="form-background">
                            <Grid container spacing={3} direction='column'>
                                    <Typography component="h1" variant="h5">
                                        Add New Contact
                                    </Typography>
                                    <Grid item>
                                        <TextField type="text" placeholder="Contact Name" fullWidth  name="name" 
                                        onChange={this.handleChange} variant="outlined" required autoFocus />
                                    </Grid>
                                    <Grid item>
                                        <Button className="button-block" variant="contained">Add</Button>
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
