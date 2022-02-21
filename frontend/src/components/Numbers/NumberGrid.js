import React, {Component} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button} from '@mui/material';
import { Link } from 'react-router-dom'
import '../../static/home.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { withRouter } from 'react-router-dom'
import { getNumbers } from '../../service/numbers.service';
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';
import {deleteNumber} from '../../service/numbers.service';

const columns = [
  { 
    field: '*', 
    headerName: '*', 
    width: 50,
    renderCell:(params) => {
      return <input type='checkbox' />
    }
  },
  {
    field: 'Description',
    headerName: 'Description',
    width: 200,
  },
  {
    field: 'Number',
    headerName: 'Number',
    width: 320,
  },
  {
    field: 'Update',
    headerName: 'Update',
    width: 100,
    renderCell: (params) => {
      // return <Link to={{pathname: `/update-number/${params.row.id}`, state: params.row}} ><ModeEditOutlineSharpIcon /></Link>;
      // Button><Link to={`add-number/${this.state.contactID}`}>Add</Link></Button>
      return <Link to={{pathname: `update-number/${params.row.id}`, state: params.row}} ><ModeEditOutlineSharpIcon /></Link>
    }
  },
  {
    field: 'Delete',
    headerName: 'Delete',
    width: 100,
    renderCell: (params) => {
      return <Button onClick={() => {
        deleteNumber(params.row.id);
        window.location.reload()
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
        contact_id: c.ContactID,
        Description: c.Description,
        Number: c.Number1,
      }) 
    })
    this.setState({ contacts: list })
    console.log(data);
    console.log(this.state.contacts);
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
        <div className='table' style={{ height: 500, width: '40%', marginTop: 20}}>
          <Box display='flex' justifyContent='space-between'>
              <Button><Link to={`add-number/${this.state.contactID}`}>Add</Link></Button>
              <Button variant="outlined">
                  <Link underline='none' to="/" variant="body2">   
                      Back
                  </Link>
              </Button>
          </Box>
          <div style={{ height: '100%', width: 'auto' }}>
            <DataGrid rows={this.state.contacts} columns={columns} />
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(NumberGrid)
