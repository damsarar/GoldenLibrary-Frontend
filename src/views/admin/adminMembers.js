import React from 'react'
import axios from 'axios'
import moment from 'moment'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Container, Grid, Avatar, Card, CardHeader, CardMedia, CardContent, Typography, CardActions, TextField } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/DeleteForever'

class adminMembers extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            adminMembers: [],
            openView: false,
            openEdit: false,
            name: 'Name',
            memberItem: [],
            memberDocId: ''
        }

        this.handleClickOpenView = this.handleClickOpenView.bind(this)
        this.handleCloseView = this.handleCloseView.bind(this)

        this.handleClickOpenEdit = this.handleClickOpenEdit.bind(this)
        this.handleCloseEdit = this.handleCloseEdit.bind(this)

        this.editMember = this.editMember.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    handleClickOpenView(item) {

        this.setState({
            memberItem: item,
            memberDocId: item.id,
            openView: true,
        })
        console.log(this.state.memberItem)
    };

    handleCloseView() {
        this.setState({
            openView: false
        })
    };

    handleClickOpenEdit() {

        this.setState({
            openEdit: true,
        })
        console.log(this.state.memberItem)
    };

    handleCloseEdit() {
        this.setState({
            openEdit: false
        })
    };

    onChange(e) {
        const state = this.state.memberItem
        state[e.target.name] = e.target.value
        this.setState({
            memberItem: state
        })
    }

    editMember(e) {
        e.preventDefault();

        const address = this.state.memberItem.address
        const contactNo = this.state.memberItem.contactNo

        axios.put('http://localhost:8080/members/' + this.state.memberDocId, { "address": address, "contactNo": contactNo })
            .then((result) => {
                console.log(result)
                this.handleCloseEdit()
            }).catch(e => {
                console.log(e)
            })
    }

    componentDidMount() {
        axios.get('http://localhost:8080/members').then(res => {
            this.setState({
                adminMembers: res.data
            })

            console.log(this.state.adminMembers)
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Registered Members</h2>
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        style={{ marginBottom: '10px', backgroundColor: '#8bc34a' }}
                        startIcon={<AddIcon></AddIcon>}
                    >
                        Add New Member
                </Button>

                    <TableContainer component={Paper}>
                        <Table >
                            <TableHead style={{ backgroundColor: '#424242' }}>
                                <TableRow >
                                    <TableCell style={{ color: 'white' }}>First Name</TableCell>
                                    <TableCell style={{ color: 'white' }}>Last Name</TableCell>
                                    <TableCell style={{ color: 'white' }}>Email</TableCell>
                                    <TableCell style={{ color: 'white' }}>Date of birth</TableCell>
                                    <TableCell style={{ color: 'white' }}>Address</TableCell>
                                    <TableCell style={{ color: 'white' }}>Contact No</TableCell>
                                    <TableCell style={{ color: 'white' }}>Registered Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.adminMembers.map((row) => (
                                    <TableRow key={row.id} onClick={() => this.handleClickOpenView(row)}>
                                        <TableCell>{row.fname}</TableCell>
                                        <TableCell >{row.lname}</TableCell>
                                        <TableCell >{row.email}</TableCell>
                                        <TableCell >
                                            {moment(row.dob).format("YYYY-MM-DD")}
                                            <div style={{ fontSize: '11px', color: "grey" }}>{moment(row.dob).fromNow(true)}</div>
                                        </TableCell>
                                        <TableCell >{row.address}</TableCell>
                                        <TableCell >{row.contactNo}</TableCell>
                                        <TableCell >
                                            {moment(row.memberSince).format("YYYY-MM-DD")}
                                            <div style={{ fontSize: '11px', color: "grey" }}>{moment(row.memberSince).fromNow(true)}</div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div>
                    {/* View dialog */}
                    <Dialog
                        open={this.state.openView}
                        onClose={this.handleCloseView}
                        fullWidth
                    >
                        {/* <DialogTitle id="alert-dialog-title">{this.state.memberItem.fname + " " + this.state.memberItem.lname}</DialogTitle> */}
                        <DialogContent>
                            <DialogContentText >
                                <Card variant="outlined">
                                    <CardContent >
                                        <Avatar
                                            style={{ width: "120px", height: "120px", display: "block", marginLeft: "auto", marginRight: "auto" }}
                                            alt="Member"
                                            src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png" />
                                        <Typography gutterBottom variant="h5" component="h2" align="center">

                                            {this.state.memberItem.fname + " " + this.state.memberItem.lname}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" align="center">
                                            Address - {this.state.memberItem.address}<br></br>
                                            Contact No - {this.state.memberItem.contactNo}<br></br>
                                            Email - {this.state.memberItem.email}<br></br>
                                            Date of birth - {moment(this.state.memberItem.dob).format("YYYY-MM-DD")}<br></br>
                                            Registered date - {moment(this.state.memberItem.memberSince).format("YYYY-MM-DD")}<br></br>
                                            <Button size="small" variant="outlined" color="primary"
                                                style={{ marginTop: "10px", marginRight: "5px" }}
                                                startIcon={<EditIcon></EditIcon>}
                                                onClick={this.handleClickOpenEdit}
                                            >
                                                Edit Details
                                            </Button>
                                            <Button size="small" variant="outlined" color="secondary"
                                                style={{ marginTop: "10px" }}
                                                startIcon={<DeleteIcon></DeleteIcon>}
                                            >
                                                Delete
                                            </Button>
                                            <h3>Borrowing History</h3>
                                            <TableContainer component={Paper}>
                                                <Table aria-label="simple table">
                                                    <TableHead style={{ backgroundColor: '#424242' }}>
                                                        <TableRow >
                                                            <TableCell style={{ color: 'white' }}>Book ID</TableCell>
                                                            <TableCell style={{ color: 'white' }}>Book Name</TableCell>
                                                            <TableCell style={{ color: 'white' }}>Borrowed Date</TableCell>
                                                            <TableCell style={{ color: 'white' }}>Returned Date</TableCell>
                                                            <TableCell style={{ color: 'white' }}>Fine</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell >NVL0004 </TableCell>
                                                            <TableCell >කලියුගය</TableCell>
                                                            <TableCell >2020-04-05</TableCell>
                                                            <TableCell >2020-04-07</TableCell>
                                                            <TableCell >100 </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Typography>

                                    </CardContent>
                                    <CardActions disableSpacing>

                                    </CardActions>
                                </Card>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseView} color="secondary" autoFocus>
                                Close
                             </Button>
                        </DialogActions>
                    </Dialog>

                    {/* Edit dialog */}
                    <Dialog open={this.state.openEdit} onClose={this.handleCloseEdit} >
                        <DialogTitle >{"Edit details of " + this.state.memberItem.fname}</DialogTitle>
                        <DialogContent>
                            <TextField
                                name="address"
                                margin="dense"
                                id="address"
                                label="Address"
                                type="text"
                                variant="outlined"
                                fullWidth
                                value={this.state.memberItem.address}
                                onChange={this.onChange}
                            />

                            <TextField
                                name="contactNo"
                                margin="dense"
                                id="contactNo"
                                label="Contact No"
                                type="text"
                                variant="outlined"
                                value={this.state.memberItem.contactNo}
                                onChange={this.onChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" onClick={this.handleCloseEdit}>
                                Cancel
                            </Button>
                            <Button color="primary" onClick={this.editMember}>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>

                </div>

            </div>
        )
    }
}

export default adminMembers