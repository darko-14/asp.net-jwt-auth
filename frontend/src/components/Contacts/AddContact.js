import React, { Component } from 'react'
import '../../static/form.css'
import { Paper, Button, Grid, Typography, Link, TextField } from '@mui/material'
import { createContact } from '../../service/contacts.service';
import { withRouter } from 'react-router-dom'

class AddContact extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            profession: '',
        }
        
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        createContact(this.props.match.params.userId, this.state)
        window.location.href = '/'
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
                                        <TextField type="text" fullWidth label="Name"  name="name" value={this.state.name} placeholder='Name'
                                        onChange={this.handleChange} variant="outlined" required autoFocus />
                                    </Grid>
                                    <Grid item>
                                        <TextField type="text" fullWidth label="Profession"  name="profession" value={this.state.profession} placeholder='Profession'
                                        onChange={this.handleChange} variant="outlined" required autoFocus />
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={this.handleSubmit} className="button-block" variant="contained">Add</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button className="button-block" onClick={() => {window.location.href = '/'}} variant="contained">Cancel</Button>
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

export default withRouter(AddContact)