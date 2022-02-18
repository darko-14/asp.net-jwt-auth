import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import '../../static/table.css'
import { getContacts } from '../../service/contacts.service';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteContact } from '../../service/contacts.service';
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';

const columns = [
  { 
    field: '*', 
    headerName: 'check', 
    width: 50,
    renderCell:(params) => {
      return <input type='checkbox' />
    }
  },
  { 
    field: 'id', 
    headerName: '#', 
    width: 50 
  },
  {
    field: 'ID',
    headerName: 'ID',
    width: 50,
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
    width: 200,
    renderCell: (params) => {
      return <Link to={{pathname: `/numbers`, state: params.row}} >View</Link>;
    }
  },
  {
    field: 'Update',
    headerName: 'Update',
    width: 100,
    renderCell: (params) => {
      return <Link to={{pathname: `/update-contact/${params.row.ID}`, state: params.row}} ><ModeEditOutlineSharpIcon /></Link>;
    }
  },
  {
    field: 'Delete',
    headerName: 'Delete',
    width: 100,
    renderCell: (params) => {
      return <Button onClick={() => {
        deleteContact(params.row.ID);
        window.location.reload()
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
    })
    console.log(data);
    this.setState({ contacts: list })
  }   

  componentDidMount(){
    getContacts(this.setTheState)
  }

  render() {
    return (
      <div className='table' style={{ height: 500, width: '50%' }}>
        <div style={{ height: '100%', width: 'auto' }}>
          <DataGrid rows={this.state.contacts} columns={columns} />
        </div>
      </div>
    )
  }

}
    



export default DataGridTable
