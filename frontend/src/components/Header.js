import React, { Component } from 'react'
import { AppBar, Toolbar, Grid, Typography} from '@mui/material'

export default class Header extends Component {
  render() {
    return (
      <div>
          <AppBar position="static" alignitems="center" color="primary">
            <Toolbar>
                <Grid container justify="center" wrap="wrap">
                    <Grid item>
                        <Typography variant="h6">Contacts App</Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
      </div>
    )
  }
}
