import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import '../../static/table.css'
import { getContacts } from '../../service/contacts.service';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteContact } from '../../service/contacts.service';
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import { withRouter } from 'react-router-dom'

const columns = [
  { 
    field: 'id', 
    headerName: '#', 
    width: 50 
  },
  {
    field: 'ID',
    headerName: 'ID',
    width: 80,
  },
  {
    field: 'Name',
    headerName: 'Name',
    width: 200,
  },
  {
    field: 'Profession',
    headerName: 'Profession',
    width: 200,
  },
  {
    field: 'View',
    headerName: 'View',
    width: 100,
    renderCell: (params) => {
      return <Link to={{pathname: `/numbers`, state: params.row}} style={{color: '#1976d2'}}><RemoveRedEyeSharpIcon /></Link>;
    }
  },
  {
    field: 'Update',
    headerName: 'Update',
    width: 100,
    renderCell: (params) => {
      return <Link to={{pathname: `/update-contact/${params.row.ID}`, state: params.row}} style={{color: '#1976d2'}}><ModeEditOutlineSharpIcon /></Link>;
    }
  },
  {
    field: 'Delete',
    headerName: 'Delete',
    width: 100,
    renderCell: (params) => {
      return <Button onClick={() => {
        if(window.confirm('Are you sure?')){
          deleteContact(params.row.ID);
          window.location.reload()
        }
      }}><DeleteIcon /></Button>;
    }
  },
];

class DataGridTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      contacts: []
    }
  }
  setTheState = (data) => {
    var list = [];
    data.map((c, i) => {
      list.push({
        id: i+1,
        ID: c.ID,
        Profession: c.Profession,
        Phone: c.Phone,
        Name: c.Name
      }) 
      return 0
    })
    console.log(data);
    this.setState({ contacts: list })
  }   

  componentDidMount(){
    getContacts(this.setTheState)
  }

  render() {
    return (
      <div className='table' style={{ height: 600, width: '39%' }}>
        <div style={{ height: '100%', width: 'auto' }}>
          <DataGrid rows={this.state.contacts} columns={columns} />
        </div>
      </div>
    )
  }

}
    



export default withRouter(DataGridTable)
