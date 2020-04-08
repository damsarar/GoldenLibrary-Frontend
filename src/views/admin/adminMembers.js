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
import { Button, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Container, Grid, Avatar } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add'

class adminMembers extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            adminMembers: [],
            open: false,
            name: 'Name',
            memberItem: []
        }

        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)

    }

    handleClickOpen(item) {

        this.setState({
            name: 'Damsara',
            memberItem: item,
            open: true,
        })
        console.log(this.state.memberItem)
    };

    handleClose() {
        this.setState({
            open: false
        })
    };

    componentDidMount() {
        // fetch('http://localhost:8080/users')
        //     .then(res => res.json())
        //     .then(result => {
        //         this.setState({
        //             adminMembers: result
        //         })

        //         console.log(this.state.adminMembers)
        //     })

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
                        <Table aria-label="simple table">
                            <TableHead style={{ backgroundColor: '#424242' }}>
                                <TableRow >
                                    <TableCell style={{ color: 'white' }}>First Name</TableCell>
                                    <TableCell style={{ color: 'white' }}>Last Name</TableCell>
                                    <TableCell style={{ color: 'white' }}>Email</TableCell>
                                    <TableCell style={{ color: 'white' }}>Date of birth</TableCell>
                                    <TableCell style={{ color: 'white' }}>Address</TableCell>
                                    <TableCell style={{ color: 'white' }}>Registered Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.adminMembers.map((row) => (
                                    <TableRow key={row.id} onClick={() => this.handleClickOpen(row)}>
                                        <TableCell component="th" scope="row" >
                                            {row.fname}
                                        </TableCell>
                                        <TableCell >{row.lname}</TableCell>
                                        <TableCell >{row.email}</TableCell>
                                        <TableCell >
                                            {moment(row.dob).format("YYYY-MM-DD")}
                                            <div style={{ fontSize: '11px', color: "grey" }}>{moment(row.dob).fromNow(true)}</div>
                                        </TableCell>
                                        <TableCell >{row.address}</TableCell>
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
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth
                    >
                        <DialogTitle id="alert-dialog-title">{this.state.memberItem.fname + " " + this.state.memberItem.lname}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Grid container spacing={2}>
                                    <Grid item md={6} xs={12}>
                                        Address - {this.state.memberItem.address}<br></br>
                                        Email - {this.state.memberItem.email}<br></br>
                                        Date of birth - {moment(this.state.memberItem.dob).format("YYYY-MM-DD")}<br></br>
                                        Registered date - {moment(this.state.memberItem.memberSince).format("YYYY-MM-DD")}<br></br>
                                        <div style={{ fontSize: '11px', color: "#757575" }}>{moment(this.state.memberItem.memberSince).fromNow(true)}</div>
                                        <Button size="small" variant="outlined" color="primary"
                                            style={{ marginTop: "10px", marginRight: "5px" }}>
                                            Edit Details
                                        </Button>
                                        <Button size="small" variant="outlined" color="secondary"
                                            style={{ marginTop: "10px" }}>
                                            Delete
                                        </Button>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Avatar alt="Remy Sharp"
                                            src='https://github.com/damsarar/GoldenLibrary-Frontend/blob/master/public/avatar.png'
                                            style={{ width: '150px', height: '150px' }}
                                        />
                                    </Grid>
                                    <Grid>
                                        <h4>Borrowing History</h4>
                                    </Grid>
                                </Grid>


                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="secondary" autoFocus>
                                Close
                             </Button>
                        </DialogActions>
                    </Dialog>

                </div>

            </div>
        )
    }
}

export default adminMembers