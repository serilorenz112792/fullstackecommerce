import React, { useState, useEffect } from 'react'
import {
    Dialog, DialogTitle, DialogActions, DialogContent,
    TextField, Typography, Grid, Button, Snackbar, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import { makeStyles } from '@material-ui/core/styles'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import IconButton from '@material-ui/core/IconButton'
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({

    textField: {
        maxWidth: 500
    },
    title: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    actionTitle: {
        color: 'red'
    },
    saveBtn: {
        color: 'orange',
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            color: 'red'
        }
    },
    input: {
        display: 'none',
    },
    deleteWarning: {
        color: 'red',
        fontWeight: 'bold',
        font: 25
    }

})
const ActionModal = props => {
    const classes = useStyles()
    const { state, handleClose, type, data, Edit, Delete, Add, adminState, ClearMsg } = props
    const [modalState, setModalState] = useState(false)
    const [productName, setProductName] = useState('')
    const [category, setCategory] = useState('mouse')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [imgData, setImgData] = useState({})
    const [imgUrl, setImgUrl] = useState('')
    const [msg, setMsg] = useState('')
    const [severity, setSeverity] = useState('')
    const [openSnack, setOpenSnackBar] = useState(false)

    useEffect(() => {
        setModalState(state)

        if (type === 'EDIT') {
            setProductName(data.productName)
            setPrice(data.price)
            setQuantity(data.quantity)
        }

        if (adminState.msg.msg === 'Item updated') {
            setOpenSnackBar(true)
            setMsg(adminState.msg.msg)
            setSeverity('success')
            ClearMsg()
            setTimeout(() => {
                handleCloseModal()
            }, 1000)
        }
        if (adminState.msg.msg === 'Failed to update item') {
            setOpenSnackBar(true)
            setMsg(adminState.msg.msg)
            setSeverity('error')
            ClearMsg()
        }


        if (adminState.msg.msg === 'Item Deleted!') {
            setOpenSnackBar(true)
            setMsg(adminState.msg.msg)
            setSeverity('success')
            ClearMsg()
            setTimeout(() => {
                handleCloseModal()
            }, 1000)
        }
        if (adminState.msg.msg === 'Failed to delete an item') {
            setOpenSnackBar(true)
            setMsg(adminState.msg.msg)
            setSeverity('error')
            ClearMsg()
        }
        if (adminState.msg.msg === 'Item Created') {
            setOpenSnackBar(true)
            setMsg(adminState.msg.msg)
            setSeverity('success')
            ClearMsg()
            setTimeout(() => {
                handleCloseModal()
            }, 1000)
        }
        if (adminState.msg.msg === 'Failed to create item') {
            setOpenSnackBar(true)
            setMsg(adminState.msg.msg)
            setSeverity('error')
            ClearMsg()
        }
    }, [props])

    const handleChange = (event) => {
        //setData(event.target.files)
        const file = event.target.files[0]
        const reader = new FileReader();
        setImgData(file)
        reader.onloadend = () => {
            setImgUrl(reader.result)
        }
        if (file) {
            reader.readAsDataURL(file);
            setImgUrl(reader.result);
        }
        else {
            setImgUrl("");
        }
    }
    const handleSave = () => {
        const edittedProduct = {
            productId: data._id,
            productName,
            price,
            quantity,
            imgData
        }
        if (type === 'EDIT') {
            Edit(edittedProduct)
        }
        if (type === 'DELETE') {
            const deletedProduct = {
                productId: data._id
            }
            Delete(deletedProduct)
        }
        if (type === 'ADD') {
            const newProduct = {
                productName,
                category,
                price,
                quantity,
                imgData
            }
            Add(newProduct)
        }
    }
    const handleCloseSnack = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    }
    function handleCloseModal() {
        setProductName('')
        setPrice(0)
        setQuantity(0)
        setImgData({})
        setImgUrl('')
        handleClose(!modalState)
        handleCloseSnack()
    }
    const title = type === 'DELETE' ? <Typography className={classes.title} variant="h5">{`Delete ${data.productName}?`}</Typography> : <Typography className={classes.title} variant="h5">{type === 'EDIT' ? `Edit ${data.productName}?` : 'Add Item'}</Typography>

    const filterValue = [{ label: 'Mouse', value: 'mouse' },
    { label: 'Keyboard', value: 'keyboard' }, { label: 'Laptop', value: 'laptop' }]

    const handleGetCategory = (e) => {
        setCategory(e.target.value)
    }
    return (
        <Dialog open={modalState} onClose={handleCloseModal}>
            <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={severity}>
                    {msg}
                </Alert>
            </Snackbar>
            <DialogTitle>
                {title}
            </DialogTitle>
            {type === 'DELETE' ?
                <DialogContent>
                    <Typography variant="body2" className={classes.deleteWarning}>Are you sure you want to delete this item?</Typography>
                </DialogContent>
                :
                <DialogContent>
                    {type === 'EDIT' ?
                        <div>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    label="Product Name"
                                    className={classes.textField}
                                    placeholder="Enter product name"
                                    fullWidth
                                    defaultValue={data.productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Price"
                                    className={classes.textField}
                                    placeholder="Enter price"
                                    fullWidth
                                    defaultValue={data.price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Qty"
                                    className={classes.textField}
                                    placeholder="Enter quantity"
                                    fullWidth
                                    defaultValue={data.quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input onChange={handleChange} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                                {imgUrl ? <img style={{ width: 230, height: 230 }} src={imgUrl} /> : null}
                            </Grid>
                        </div>
                        :
                        <div>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    label="Product Name"
                                    className={classes.textField}
                                    placeholder="Enter product name"
                                    fullWidth
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <InputLabel htmlFor="category">Category</InputLabel>
                                    <Select
                                        style={{ width: 250 }}
                                        labelId="category"
                                        onChange={handleGetCategory}
                                        defaultValue={filterValue[0].value}
                                    >
                                        {filterValue.map((obj, ind) => <MenuItem key={ind} value={obj.value}>
                                            {obj.label}
                                        </MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Price"
                                    className={classes.textField}
                                    placeholder="Enter price"
                                    fullWidth
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Qty"
                                    className={classes.textField}
                                    placeholder="Enter quantity"
                                    fullWidth
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input onChange={handleChange} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                                {imgUrl ? <img style={{ width: 230, height: 230 }} src={imgUrl} /> : null}
                            </Grid>
                        </div>}

                </DialogContent>
            }
            <DialogActions>

                <Button onClick={handleSave} variant="contained" color="primary" className={classes.saveBtn}>Save<SaveIcon /></Button>
                <Button onClick={handleCloseModal} variant="contained" color="default">Cancel</Button>
            </DialogActions>
        </Dialog >
    )
}

export default ActionModal