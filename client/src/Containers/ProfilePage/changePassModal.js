import React, { useState, useEffect } from 'react'
import { Dialog, DialogActions, DialogContent, Typography, TextField, Button, DialogTitle, Grid, Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MuiAlert from '@material-ui/lab/Alert'
import { set } from 'mongoose'
const useStyles = makeStyles({
    gridItem: {
        padding: 10,
        maxWidth: 'inherit'
    }
})
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}
const ChangePassModal = (props) => {
    const classes = useStyles()
    const { state, handleClose, ChangePass, auth, profile, ClearMsg } = props
    const [modalState, setModalState] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [openSnack, setOpenSnack] = useState(false)
    const [msg, setMsg] = useState('')
    const [severity, setSeverity] = useState('')
    const [error, setError] = useState('')
    const [disableSubmitBtn, setDisableSubmitBtn] = useState(false)
    useEffect(() => {
        setModalState(state)
        if (profile.msg !== 'change password success!' && profile.msg !== '') {
            setOpenSnack(true)
            setMsg(profile.msg)
            setSeverity('error')
            setError(true)
            setDisableSubmitBtn(false)
            ClearMsg()
        }
        if (profile.msg && profile.msg.msg === 'change password success!' && profile.msg !== '') {
            setOpenSnack(true)
            setMsg(profile.msg.msg)
            setSeverity('success')
            setError(false)

            setTimeout(() => {
                handleCloseModal()
                ClearMsg()
                setDisableSubmitBtn(false)
            }, 1000)

        }
    }, [props])

    const handleCloseModal = () => {
        handleClose(!modalState)
        ClearMsg()
    }
    const handleSubmit = () => {
        const data = {
            userId: auth.user && auth.user._id,
            currentPassword,
            newPassword,
            confirmNewPassword
        }
        ChangePass(data)
        setDisableSubmitBtn(true)
    }
    const handleCloseSnack = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    }
    const handleOnFocus = () => {

        setError(false)
    }
    return (
        <Dialog open={modalState} onClose={handleCloseModal}>
            <Snackbar open={openSnack} autoHideDuration={1000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={severity}>
                    {msg}
                </Alert>
            </Snackbar>
            <DialogTitle>
                <Typography variant="h5" style={{ textAlign: 'center' }}>
                    Change Password
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Grid spacing={1} container justify="center">
                    <Grid item xs={12}>
                        <TextField error={error} onFocus={handleOnFocus} type="password" autoFocus fullWidth label="Current Password" placeholder="Enter current password" onChange={(e) => setCurrentPassword(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField error={error} onFocus={handleOnFocus} type="password" fullWidth label="New Password" placeholder="Enter new password" onChange={(e) => setNewPassword(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField error={error} onFocus={handleOnFocus} type="password" fullWidth label="Confirm Password" placeholder="Re-type new password" onChange={(e) => setConfirmNewPassword(e.target.value)} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button disable={disableSubmitBtn} onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
                <Button onClick={handleCloseModal} variant="contained" color="default">Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ChangePassModal