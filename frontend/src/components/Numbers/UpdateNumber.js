import React, { Component } from 'react'
import '../../static/form.css'
import { Paper, Button, Grid, Typography, Link, TextField } from '@mui/material'
import { updateNumber } from '../../service/numbers.service';
import { withRouter } from 'react-router-dom'

class UpdateNumber extends Component {

    constructor(props){
        super(props);
        this.state = {
            description: props.location.state ? props.location.state.Description : 'desc',
            number1: props.location.state ? props.location.state.Number: '',
        }
        
    }

    componentDidMount() {
        console.log('state', this.props.location.state);
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleUpdate = () => {
        updateNumber(this.props.match.params.id, this.state)
        window.history.back()
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
                                        Update Number
                                    </Typography>
                                    <Grid item>
                                        <TextField type="text" placeholder="Description" fullWidth  name="description" value={this.state.description}
                                        onChange={this.handleChange} variant="outlined" required autoFocus />
                                    </Grid>
                                    <Grid item>
                                        <TextField type="text" placeholder="Contact Number" fullWidth  name="number1" value={this.state.number1}
                                        onChange={this.handleChange} variant="outlined" required autoFocus />
                                    </Grid>
                                    <Grid item>
                                        <Button className="button-block" onClick={this.handleUpdate} variant="contained">Update</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button className="button-block" onClick={() => window.history.back()} variant="contained">Cancel</Button>
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

export default withRouter(UpdateNumber)