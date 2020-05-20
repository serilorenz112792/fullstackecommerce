import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    Divider
}
    from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles({
    registerBtn: {
        color: 'orange',
        "&:hover": {
            color: 'red'
        }
    }
})
const Modal = (props) => {
    const classes = useStyles()
    const { state, handleClose, history } = props

    const [modalState, setModalState] = useState(false)
    useEffect(() => {
        setModalState(state)
    }, [props])
    const handleRegister = () => {
        history.push('/register')
    }
    return (
        <Dialog disableBackdropClick open={modalState} onClose={() => handleClose(!modalState)}>
            <DialogTitle>
                <Typography variant="h4" style={{ textAlign: 'center' }}>Steps to use app</Typography>

            </DialogTitle>
            <DialogContent>
                <div style={{ maxHeight: 450, height: 'inherit' }}>
                    <Typography variant="body1">
                        <b>*Step 1*</b>
                        <br />
                        Login as "Admin" using this credentials
                        <br />
                        -username:<span style={{ fontStyle: 'italic', fontFamily: 'bold' }}>admin@yahoo.com</span>
                        <br />
                        -password: <span style={{ fontStyle: 'italic', fontFamily: 'bold' }}>admin </span>
                        <br />
                        so you can use <span style={{ fontWeight: 'bold' }}>CRUD (Create, Edit/Update, Delete)</span> functionality on the products
                        <br />
                        <span style={{ fontStyle: 'italic' }}>*you can create another ADMIN user just include the word "admin" on
                        the email for example "renzadminserilo@gmail.com" , "adminrenz@yahoo.com" and so on
                        </span>
                        <Divider />
                        <b>*Step 2*</b>
                        <br />
                        Register to create a customer account using your real email and desired password for
                        example <span style={{ fontStyle: 'italic' }}>"username: serilorenz112792@gmail.com, password: testpassword"</span> so you can receive emails of your purchased items
                        <br />
                        <br />
                        your desired product to "purchase" will go to your shopping cart first before you
                        can finally purchase it
                        <Divider />
                        <b>*Step 3*</b>
                        <br />
                        <span style={{ fontStyle: 'italic', fontSize: 30 }}>Enjoy :)</span>
                    </Typography>
                </div>
            </DialogContent>
            <DialogActions>
                <Button className={classes.registerBtn} variant="contained" color="primary" onClick={handleRegister}>Register</Button>
                <Button variant="contained" color="default" onClick={() => handleClose(!modalState)}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Modal