import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Grid, TextField, Button, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { loginAction, clearMsgAction } from './action'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    textField: {
        maxWidth: 500
    },
    btn: {
        maxWidth: 500,
    },
    btnRegister: {
        color: '#1c6beb',
        maxWidth: 500
    },
    btnLoginGrid: {
        paddingTop: 50
    },
    btnRegisterGrid: {
        paddingTop: 70
    }

})
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const LoginPage = (props) => {
    const classes = useStyles()
    const { Login, ClearMsg, auth, history } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const [severity, setSeverity] = useState('')
    const [errorText, setErrorText] = useState(false)
    const [openSnack, setOpenSnack] = useState(false);
    const handleLogin = (e) => {
        e.preventDefault()
        const userInfo = {
            email,
            password
        }
        Login(userInfo)
        localStorage.removeItem('cartProducts')
    }
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };
    const handleRegister = () => {
        history.push('/register')
    }
    useEffect(() => {
        if (auth.msg.id === 'LOGIN_FAILED') {
            setSeverity('error')
            setErrorText(true)
            setMsg(auth.msg.content.msg)
            setOpenSnack(true)
            ClearMsg()
        }

        if (auth.isAuthenticated) {
            history.push('/home')
        }
    }, [auth, msg])
    const handleFocus = (e) => {

        setErrorText(false)
    }
    return (
        <Grid>
            <Grid style={{ paddingTop: 50 }} container justify="center" item xs={12}>
                <TextField onFocus={handleFocus} error={errorText} onChange={(e) => setEmail(e.target.value)} fullWidth className={classes.textField} autoFocus placeholder="Email" label="Email" id="email" type="email" />
            </Grid>
            <Grid container justify="center" item xs={12}>
                <TextField onFocus={handleFocus} error={errorText} onChange={(e) => setPassword(e.target.value)} fullWidth className={classes.textField} placeholder="Password" label="Password" id="password" type="password" />
            </Grid>
            <Grid className={classes.btnLoginGrid} container justify="center" item xs={12}>

                <Button onClick={handleLogin} variant="contained" color="primary" fullWidth className={classes.btn}>Login</Button>

            </Grid>
            <Grid className={classes.btnRegisterGrid} container justify="center" item xs={12}>
                <Button onClick={handleRegister} variant="text" color="default" fullWidth className={classes.btnRegister}>Register</Button>
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={severity}>
                    {msg}
                </Alert>
            </Snackbar>
        </Grid>
    )
}
LoginPage.propTypes = {
    Login: PropTypes.func.isRequired,
    ClearMsg: PropTypes.func.isRequired,
    auth: PropTypes.any,
    history: PropTypes.any
}
const mapStateToProps = state => ({
    auth: state.auth
})
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        Login: loginAction,
        ClearMsg: clearMsgAction
    }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
