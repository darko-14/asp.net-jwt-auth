import React, { Component } from 'react'
import '../../static/form.css'
import { Paper, Button, Grid, Typography, Link, TextField } from '@mui/material'

export default class AddNumber extends Component {

    constructor(props){
        super(props);
        this.state = {
            description: '',
            number: ''
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
                                        Add New Number
                                    </Typography>
                                    <Grid item>
                                        <TextField type="text" placeholder="Description" fullWidth  name="description" 
                                        onChange={this.handleChange} variant="outlined" label="Description" required autoFocus />
                                    </Grid>
                                    <Grid item>
                                        <TextField type="text" placeholder="Contact Number" fullWidth  name="number" 
                                        onChange={this.handleChange} variant="outlined" label="Contact Number" required autoFocus />
                                    </Grid>
                                    <Grid item>
                                        <Button className="button-block" variant="contained">Add</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button className="button-block" onClick={() => {window.location.href = '/numbers'}} variant="contained">Cancel</Button>
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
