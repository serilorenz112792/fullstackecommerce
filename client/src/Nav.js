import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid'
import { bindActionCreators } from 'redux'
import { logoutAction } from './Containers/Authentication/LoginPage/action'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingBottom: 60,
        opacity: .8
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: 'orange'
    },
    cart: {
        width: 100,
        backgroundColor: 'orange',
        color: 'white',
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: 'red'
        }

    },
    profile: {
        width: 100,
        backgroundColor: 'pink',
        color: 'white',
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: 'violet'
        }
    },
    logout: {
        width: 100,
        backgroundColor: 'gray',
        color: 'white',
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: 'lightgray'
        }
    },
    home: {
        textDecoration: 'none', color: 'orange', fontStyle: 'italic',
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            color: 'red'
        }
    },
    welcomeAbout: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontFamily: 'Times, "Times New Roman", serif',
        fontSize: 30,
        textDecoration: 'none',
        color: 'orange',
        "&:hover": {
            color: 'red'
        }
    },
    admin: {
        backgroundColor: 'orange',
        color: 'white',
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: 'red'
        }
    },
    menuVisibility: {
        [theme.breakpoints.only('xs')]: {
            visibility: 'visible',
        },
    },
    noMenu: {
        [theme.breakpoints.only('xs')]: {
            visibility: 'hidden',
        },
    }
}));

const Nav = (props) => {
    const matches = useMediaQuery('(width: 400px)')
    const [pathName, setPathName] = useState('')
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { Logout, auth } = props
    useEffect(() => {
        setPathName(document.location.pathname)
    }, [pathName, window.location.pathname, document.location.pathname])

    const handleLogout = () => {
        localStorage.removeItem('cartProducts')
        Logout()
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const customers = auth.user && auth.user.role === 'Customer' ?
        <div>


            <Button variant="contained" className={classes.admin} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MenuIcon />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >

                <MenuItem onClick={handleClose}><NavLink style={{ textDecoration: 'none' }} to="/profile"><Button fullWidth variant="contained" className={classes.profile}>Profile <AccountCircleIcon /></Button></NavLink></MenuItem>
                <MenuItem onClick={handleClose}><NavLink style={{ textDecoration: 'none' }} to="/cart"><Button fullWidth variant="contained" className={classes.cart}>Cart <ShoppingCartIcon /></Button></NavLink></MenuItem>
                <MenuItem onClick={handleClose}><NavLink style={{ textDecoration: 'none', color: 'white' }} to="/"><Button fullWidth onClick={handleLogout} className={classes.logout}>Logout</Button></NavLink></MenuItem>



            </Menu>

        </div> :
        <div>
            <NavLink style={{ textDecoration: 'none', paddingRight: 20, paddingLeft: 20 }} to="/admin"><Button variant="contained" className={classes.admin}>Admin</Button></NavLink>
            <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/"><Button onClick={handleLogout} color="inherit">Logout</Button></NavLink>
        </div >

    return (
        <Grid container className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>

                    {auth && auth.isAuthenticated ? <Typography variant="h4" className={classes.title}>
                        <NavLink className={classes.home} to="/home">Products</NavLink>
                    </Typography> : <Typography variant="h4" className={classes.title}>
                            <NavLink className={classes.welcomeAbout} to="/">Welcome / About</NavLink>
                        </Typography>}

                    {auth && auth.isAuthenticated ?
                        customers
                        :
                        <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/login"><Button color="inherit">Login</Button></NavLink>}

                </Toolbar>
            </AppBar>
        </Grid>
    );
}
Nav.propTypes = {
    auth: PropTypes.any,
    Logout: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        Logout: logoutAction
    }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Nav)