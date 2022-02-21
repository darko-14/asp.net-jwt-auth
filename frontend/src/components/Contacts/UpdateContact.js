import React, { Component } from 'react'
import '../../static/form.css'
import { Paper, Button, Grid, Typography, Link, TextField } from '@mui/material'
import { withRouter } from 'react-router-dom'
import { updateContact } from '../../service/contacts.service'

class UpdateContact extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: this.props.location.state ? this.props.location.state.Name : '',
            profession: this.props.location.state ? this.props.location.state.Profession : '',
        }
    }

    componentDidMount() {
        console.log('id', this.props.match.params.id);
        console.log('state', this.props.location.state);
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        var contact = {
            id: this.props.match.params.id,
            name: this.state.name,
            profession: this.state.profession
        }
        updateContact(contact);
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
                                        Update Contact
                                    </Typography>
                                    <Grid item>
                                        <TextField type="text" label="Name" fullWidth  name="name" value={this.state.name}
                                        onChange={this.handleChange} variant="outlined" required autoFocus />
                                    </Grid>
                                    <Grid item>
                                        <TextField type="text" label="Profession" fullWidth  name="profession" value={this.state.profession}
                                        onChange={this.handleChange} variant="outlined" required autoFocus />
                                    </Grid>
                                    <Grid item>
                                        <Button className="button-block" onClick={this.handleSubmit} variant="contained">Update</Button>
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

export default withRouter(UpdateContact)