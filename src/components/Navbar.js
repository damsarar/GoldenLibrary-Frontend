import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <AppBar position="static" style={{ backgroundColor: "black", color: "gold" }}>
                    <Toolbar variant="regular">

                        <Typography variant="h6" color="inherit">
                            Golden Library
                        </Typography>

                        <Button color="inherit" size="small" variant="text" component={Link} >
                            Home
                        </Button>
                        <Button color="inherit" size="small" variant="text" component={Link} >
                            Books
                        </Button>
                        <Button color="inherit" size="small" variant="text" component={Link} >
                            Authors
                        </Button>
                        <Button color="inherit" size="small" variant="text" component={Link} >
                            About Us
                        </Button>
                        <Button color="inherit" size="small" variant="text" component={Link} >
                            Contact Us
                        </Button>
                        <Button color="inherit" size="small" variant="text" component={Link} >
                            Register
                        </Button>


                        <Button color="inherit" size="small" variant="outlined" component={Link} to="/login" >
                            Login
                        </Button>

                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Navbar