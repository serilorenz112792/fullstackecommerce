import React, { useState, useEffect } from 'react'
import {
    Dialog, DialogTitle, DialogActions,
    DialogContent, Typography, Button
} from '@material-ui/core'

const ConfirmationModal = (props) => {
    const { state, handleClose, data, RemoveItem } = props
    const [modalState, setModalState] = useState(false)
    useEffect(() => {
        setModalState(state)
    }, [props])
    const handleCloseModal = () => {
        handleClose(!modalState)
    }
    const handleRemoveItem = () => {
        RemoveItem()
        handleCloseModal()
    }
    return (
        <Dialog open={modalState} onClose={handleCloseModal}>
            <DialogTitle>
                <Typography variant="h5">Delete <span style={{ color: 'red', fontStyle: 'italic', fontWeight: 'bold' }}>{data && data.productName}</span> on your list?</Typography>
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleRemoveItem} variant="contained" color="secondary">Confirm</Button>
                <Button onClick={handleCloseModal} variant="contained" color="default">Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationModal