import React, {Component} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button} from '@mui/material';
import { Link } from 'react-router-dom'
import '../../static/home.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { withRouter } from 'react-router-dom'
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';
import {deleteNumber} from '../../service/numbers.service';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const columns = [
  { 
    field: 'index', 
    headerName: '#', 
    width: 50,
  },
  {
    field: 'Description',
    headerName: 'Description',
    width: 250,
  },
  {
    field: 'Number',
    headerName: 'Number',
    width: 250,
  },
  {
    field: 'Update',
    headerName: 'Update',
    width: 100,
    renderCell: (params) => {
      return <Link to={{pathname: `update-number/${params.row.id}`, state: params.row}} style={{color: '#1976d2'}}><ModeEditOutlineSharpIcon /></Link>
    }
  },
  {
    field: 'Delete',
    headerName: 'Delete',
    width: 100,
    renderCell: (params) => {
      return <Button onClick={() => {
        if(window.confirm('Are you sure?')){
          deleteNumber(params.row.id);
          window.location.reload()
        }
      }}><DeleteIcon /></Button>;
    }
  },
];

class NumberGrid extends Component {

  constructor(props){
    super(props);
    this.state = {
      numbers: [],
      contactID: this.props.location.state.ID,
    }
  }

  setTheState = (data) => {
    var list = [];
    data.map((c, i) => {
      list.push({
        id: c.ID,
        index: i+1,
        contact_id: c.ContactID,
        Description: c.Description,
        Number: c.Number1,
      })
      return 0 
    })
    this.setState({ numbers: list })
    console.log(data);
    console.log('state',  this.state);
  }

  componentDidMount(){
    var id = this.props.location.state.ID;
    console.log(this.state.contactID);
    fetch(`api/Numbers?contactId=${id}`)
    .then(res => res.json())
    .then(this.setTheState)
  }

  render() {
    return (
      <div>
        <h1>{this.props.location.state.Name}'s Number List</h1>
        <div className='table' style={{ height: 500, width: '37%', marginTop: 20}}>
          <Box display='flex' justifyContent='space-between'>
              <Button variant='contained' startIcon={<AddBoxOutlinedIcon />} href={`add-number/${this.state.contactID}`}>Add New Number</Button>
              <Button variant="contained" startIcon={<ArrowBackOutlinedIcon />} color='warning' href='/'>Go Back</Button>
          </Box>
          <div style={{ height: '100%', width: 'auto', marginTop: 10}}>
            <DataGrid rows={this.state.numbers} columns={columns} />
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(NumberGrid)
