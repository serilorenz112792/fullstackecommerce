import React, { useState, useEffect } from 'react'

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    Snackbar
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles({
    dialogTitle: {
        fontFamily: 'fantasy',
        fontWeight: 'bold'
    },
    productName: {
        fontFamily: 'fantasy',
        fontWeight: 'bold',
        color: 'blue'
    }

})
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}
const ConfirmationModal = (props) => {
    const classes = useStyles()
    const { state, handleClose, data, index,
        RemoveItem, Purchase, type, userId, email,
        cart, Clear
    } = props
    const [modalState, setModalState] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [msg, setMsg] = useState('')
    const [severity, setSeverity] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    useEffect(() => {
        setModalState(state)
        if (cart.msg && cart.msg.msg === `Successfully purchased ${data.productName}`) {
            setOpenSnack(true)
            setSeverity('success')
            RemoveItem(index)
            setMsg('Successfully purchased!')
            Clear()
            setTimeout(() => {

                handleCloseModal(!modalState)
            }, 600)
        }
        if ((cart.msg && cart.msg.msg === 'Failed to purchase') || (cart.msg && cart.msg === 'Failed to purchase')) {
            setOpenSnack(true)
            setSeverity('error')
            setBtnDisabled(false)
            setMsg('Failed to purchase item!')
            Clear()
        }

    }, [state, cart])
    const handleCloseSnack = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    }
    const handleSubmit = () => {
        if (type === 'DELETE') {
            RemoveItem(index)
            setOpenSnack(true)
            setMsg('Successfully Removed!')
            setSeverity('success')
            setTimeout(() => { handleCloseModal(!modalState) }, 600)
        }
        else {
            const time = new Date().getTime()
            const randomNum = Math.random()
            const productData = {
                productName: data.productName,
                category: data.category,
                price: data.price,
                quantity: data.quantity,
                productId: data.productId,
                userId: userId && userId,
                email,
                purchasedId: `${time}${randomNum}`
            }
            Purchase(productData)
            setBtnDisabled(true)
            //if (cart.msg && cart.msg.msg.includes('Successfully purchased')) {
            // RemoveItem(index)
            // setOpenSnack(true)
            // setSeverity('success')
            // setMsg('Successfully purchased!')
            // setTimeout(() => {

            //     handleCloseModal(!modalState)
            // }, 2000)
            //}

        }

    }
    const handleCloseModal = () => {
        setOpenSnack(false)
        setMsg('')
        setBtnDisabled(false)
        handleClose(!modalState, type)
    }
    return (
        <Dialog open={modalState} onClose={handleCloseModal}>
            <DialogTitle>
                <Typography className={classes.dialogTitle} variant="h5">{type === 'DELETE' ? 'Remove Item' : 'Purchase Item'}</Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1">{type === 'DELETE' ?
                    `Are you sure you want to remove ${data.productName}?`
                    : `Are you sure you want to purchase ${data.productName}?`
                }</Typography>
            </DialogContent>
            <DialogActions>

                <Button disabled={btnDisabled} onClick={handleSubmit} variant="contained" color={type === 'DELETE' ? 'secondary' : 'primary'}>Yes</Button>
                <Button disabled={btnDisabled} onClick={handleCloseModal} variant="contained" color="default">No</Button>
                <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
                    <Alert onClose={handleCloseSnack} severity={severity}>
                        {msg}
                    </Alert>
                </Snackbar>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationModal