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
import { Button, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Container, Grid, Avatar, Card, CardHeader, CardMedia, CardContent, Typography, CardActions } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/DeleteForever'

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
                                        <TableCell>{row.fname}</TableCell>
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
                        {/* <DialogTitle id="alert-dialog-title">{this.state.memberItem.fname + " " + this.state.memberItem.lname}</DialogTitle> */}
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Card variant="outlined">
                                    <CardMedia
                                        component="img"
                                        alt="Member Image"
                                        // style={{ minHeight: "300px" }}
                                        height="300"
                                        image="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" align="center">
                                            {this.state.memberItem.fname + " " + this.state.memberItem.lname}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" align="center">
                                            Address - {this.state.memberItem.address}<br></br>
                                            Email - {this.state.memberItem.email}<br></br>
                                            Date of birth - {moment(this.state.memberItem.dob).format("YYYY-MM-DD")}<br></br>
                                            Registered date - {moment(this.state.memberItem.memberSince).format("YYYY-MM-DD")}<br></br>
                                            <Button size="small" variant="outlined" color="primary"
                                                style={{ marginTop: "10px", marginRight: "5px" }}
                                                startIcon={<EditIcon></EditIcon>}
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
                                                        {this.state.adminMembers.map((row) => (
                                                            <TableRow key={row.id} onClick={() => this.handleClickOpen(row)}>
                                                                <TableCell >NVL0004 </TableCell>
                                                                <TableCell >කලියුගය</TableCell>
                                                                <TableCell >2020-04-05</TableCell>
                                                                <TableCell >2020-04-07</TableCell>
                                                                <TableCell >100 </TableCell>
                                                            </TableRow>
                                                        ))}
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