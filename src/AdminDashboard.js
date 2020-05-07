import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { IconButton, Button } from '@material-ui/core';

// icons

import MenuIcon from '@material-ui/icons/Menu';

import AdminIcon from '@material-ui/icons/Person';
import MemberIcon from '@material-ui/icons/People';
import CustomerIcon from '@material-ui/icons/EmojiPeople';

import LibraryBookIcon from '@material-ui/icons/LibraryBooks'
import BookIcon from '@material-ui/icons/Book';

import OrderIcon from '@material-ui/icons/ShoppingCart';
import PaymentIcon from '@material-ui/icons/Payment';

// Router

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Views

import AdminAdministrators from './views/admin/adminAdministrators'
import AdminMembers from './views/admin/adminMembers'

import LoginPage from './views/Login'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            zIndex: theme.zIndex.drawer + 1,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function AdminDashboard(props) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const drawer = (

        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem
                    button
                    component={Link}
                    to="/admin/administrators"
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemIcon>
                        <AdminIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Administrators
                    </ListItemText>
                </ListItem>
                <ListItem
                    button
                    component={Link}
                    to="/admin/members"
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}>
                    <ListItemIcon>
                        <MemberIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Members
                    </ListItemText>
                </ListItem>
                <ListItem
                    button
                    component={Link}
                    to="/admin/library-books"
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}>
                    <ListItemIcon>
                        <LibraryBookIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Books
                    </ListItemText>
                </ListItem>
                <ListItem
                    button
                    component={Link}
                    to="/admin/payments"
                    selected={selectedIndex === 6}
                    onClick={(event) => handleListItemClick(event, 6)}>
                    <ListItemIcon>
                        <PaymentIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Payments
                    </ListItemText>
                </ListItem>

            </List>

        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} style={{ backgroundColor: "gold", color: "black" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Golden Library
                     </Typography>
                    <Button component={Link} to="/login">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer

                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>

                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route path="/admin/administrators">
                        <AdminAdministrators></AdminAdministrators>
                    </Route>
                    <Route path="/admin/members">
                        <AdminMembers></AdminMembers>
                    </Route>
                    <Route path="/login">
                        <LoginPage></LoginPage>
                    </Route>

                </Switch>
            </main>
        </div >
    );
}


export default AdminDashboard;