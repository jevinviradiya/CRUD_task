import React, { Component, useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/ContextData';
import './tablelist.css'

class ListTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      openConfirmDialog: false,
    };
  }

  fields = ['Id', 'Name', 'Email', 'Age', 'Phone', 'Department', 'Action'];
  createData(id, name, calories, fat, carbs, protein) {
    return { id, name, calories, fat, carbs, protein };
  }

  handleEdit = (id) => {
    this.props.navigate(`/list/edit/${id}`);
  }
  handleDelete = (id) => {
    this.setState({
      selectedId: id,
      openConfirmDialog: true,
    });
  }

  createNewData = () => {
    this.props.navigate(`/list/create`)
  }

  rows = this.props.context.data.map(el => this.createData(el.id, el.name, el.email, el.age, el.phone, el.department));

  updateRows = (data) => {
    this.rows = data.map((el) => this.createData(el.id, el.name, el.email, el.age, el.phone, el.department));
  };

  handleConfirmDelete = () => {
    const updatedData = this.props.context.data.filter(item => item.id !== this.state.selectedId);
    this.props.context.setData(updatedData);
    this.updateRows(updatedData);

    this.setState({
      openConfirmDialog: false,
    });
  };

  handleCancelDelete = () => {
    this.setState({
      selectedId: null,
      openConfirmDialog: false,
    });
  };

  render() {
    return (
      <>
        <div className='mainList'>
          <div className='heading-List'><h2>Data List</h2></div>
          <div className='list_add_btn'><Button onClick={this.createNewData}>+ Add New</Button></div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {this.fields.map((el) => (
                    <TableCell key={el} className='list_tbl_cell'>
                      {el}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.rows.map((row) => (
                  <>
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.calories}</TableCell>
                    <TableCell align="left">{row.fat}</TableCell>
                    <TableCell align="left">{row.carbs}</TableCell>
                    <TableCell align="left">{row.protein}</TableCell>
                    <TableCell>
                      <Button onClick={() => this.handleEdit(row.id)}>Edit</Button>
                      <Button onClick={() => this.handleDelete(row.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <Dialog open={this.state.openConfirmDialog} onClose={this.handleCancelDelete}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this row?
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancelDelete}>Cancel</Button>
            <Button onClick={this.handleConfirmDelete}>Delete</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const ListTable = () => {
  const navigate = useNavigate();
  const context = useContext(DataContext);
  return <ListTableComponent navigate={navigate} context={context} />
}

export default ListTable;