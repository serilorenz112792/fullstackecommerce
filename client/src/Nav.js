import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { bindActionCreators } from 'redux'
import { logoutAction } from './Containers/Authentication/LoginPage/action'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

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
        backgroundColor: 'orange',
        color: 'white',
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: 'red'
        }

    },
    profile: {
        backgroundColor: 'pink',
        color: 'white',
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: 'violet'
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
    }
}));

const Nav = (props) => {
    const [pathName, setPathName] = useState('')
    const classes = useStyles();
    const { Logout, auth } = props
    useEffect(() => {
        setPathName(document.location.pathname)
    }, [pathName, window.location.pathname, document.location.pathname])

    const handleLogout = () => {
        localStorage.removeItem('cartProducts')
        Logout()
    }
    const customers = auth.user && auth.user.role === 'Customer' ?
        <div>
            <NavLink style={{ textDecoration: 'none' }} to="/profile"><Button variant="contained" className={classes.profile}>Profile <AccountCircleIcon /></Button></NavLink>
            <NavLink style={{ textDecoration: 'none', paddingRight: 20, paddingLeft: 20 }} to="/cart"><Button variant="contained" className={classes.cart}>Cart <ShoppingCartIcon /></Button></NavLink>
            <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/"><Button onClick={handleLogout} color="inherit">Logout</Button></NavLink>
        </div> :
        <div>
            <NavLink style={{ textDecoration: 'none', paddingRight: 20, paddingLeft: 20 }} to="/admin"><Button variant="contained" className={classes.admin}>Admin</Button></NavLink>
            <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/"><Button onClick={handleLogout} color="inherit">Logout</Button></NavLink>
        </div >

    return (
        <div className={classes.root}>
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
        </div>
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