import React, { useState, useEffect } from 'react'
import NavigateBeforeSharpIcon from '@material-ui/icons/NavigateBeforeSharp';
import NavigateNextSharpIcon from '@material-ui/icons/NavigateNextSharp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import CloseIcon from '@material-ui/icons/Close'
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Typography,
    CardMedia, Grid, Button, Paper, Collapse, TextField, Snackbar
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { currency } from '../../util/currency'
const useStyles = makeStyles({
    typography: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 40
    },
    typographyVal: {
        fontWeight: 'bold'
    },
    price: {
        width: 30,
        maxWidth: 30,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#3f51b5'
    },
    totalPrice: {
        width: 120,
        maxWidth: 120,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#3f51b5',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        "&:hover": {
            whiteSpace: 'normal',
            overflow: 'visible',
        }
    },
    navigateNext: {
        cursor: 'pointer',
        position: 'absolute',
        right: 0,
        bottom: 250,
    },
    navigatePrev: {
        cursor: 'pointer',
        position: 'absolute',
        left: 0,
        bottom: 250,

    },
    closeBtn: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        right: 0
    },
    container: {
        position: 'relative'
    },
    imgPaper: {
        padding: 10
    },
    dialogContent: {
        maxHeight: 400
    }

})
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const ProductModal = (props) => {
    const classes = useStyles()
    const { data, state, handleClose, index, role } = props
    const [modalState, setModalState] = useState(false)
    const [collapse, setCollapse] = useState(false)
    const [ind, setInd] = useState(index)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQty, setTotalQty] = useState(0)
    const [openSnack, setOpenSnack] = useState(false)
    const [severity, setSeverity] = useState('')
    const [btnStatus, setBtnStatus] = useState(true)

    const [error, setError] = useState(false)

    const [msg, setMsg] = useState('')
    useEffect(() => {
        setModalState(state)
        setInd(index)


    }, [modalState, state, role])
    const imgPath = `http://localhost:3999/${data[ind] && data[ind].imgPath}`
    const handleNext = () => {
        let lastIndex = data.length - 1
        setInd(ind + 1)
        if (lastIndex === ind) {
            setInd(0)
        }
        setCollapse(false)
    }
    const handlePrev = () => {
        let lastIndex = data.length - 1
        setInd(ind - 1)
        if (ind === 0) {
            setInd(lastIndex)
        }
        setCollapse(false)
    }
    const handleCloseModal = () => {
        handleClose(!state, ind)
        setTotalPrice(0)
        setTotalQty(0)
        setError(false)
        setBtnStatus(true)
        setOpenSnack(false)
        setCollapse(false)
        //setInd(ind)
    }
    const handleCollapse = () => {
        setCollapse(!collapse)
        setTotalPrice(0)
        setTotalQty(0)
        setError(false)
        setBtnStatus(true)
        setOpenSnack(false)
    }
    // console.log("modalState", data[ind])
    // console.log("index", ind)
    // console.log("DATA", data)
    // console.log("currentPage", page)
    const handleTotalQty = (e) => {
        const pattern = new RegExp("^[0-9]*$")

        if (e.target.value === '' || !pattern.test(e.target.value)) {
            setBtnStatus(true)
            setTotalPrice(0)
        }
        else {
            setTotalQty(e.target.value)
            setTotalPrice(data[ind] && data[ind].price * e.target.value)
            setBtnStatus(false)

        }

    }
    const handleCloseSnack = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    }
    const handleAddToCart = () => {
        const itemInfo = {
            productId: data[ind]._id,
            productName: data[ind].productName,
            price: totalPrice,
            category: data[ind].category,
            quantity: totalQty,
            imgPath: data[ind].imgPath
        }
        if (data[ind].quantity < totalQty) {
            setOpenSnack(true)
            setError(true)
            setSeverity('error')
            setMsg('Not enough stock')
        }
        else {
            setOpenSnack(true)
            setSeverity('success')
            setError(false)
            setMsg('Added to shopping cart!')

            let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || []
            cartProducts.push(itemInfo)
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
            setTimeout(() => {
                handleCloseModal()
            }, 600)
        }
    }
    const handleFocus = () => {
        setError(false)
    }
    return (
        <Dialog disableBackdropClick className={classes.container} open={modalState} onClose={handleCloseModal}>
            <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={severity}>
                    {msg}
                </Alert>
            </Snackbar>
            <DialogTitle>
                <Typography className={classes.typography}>{data[ind] && data[ind].productName}</Typography>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Paper className={classes.imgPaper}>
                    <Grid container justify="center">
                        <div style={{ width: '90%', textAlign: 'center' }}>
                            <CardMedia
                                component="img"
                                alt={data[ind] && data[ind].productName}
                                height="250"
                                width="250"
                                image={imgPath}
                                title={data[ind] && data[ind].productName}
                            />
                        </div>
                    </Grid>
                </Paper>
                <Grid container justify="center">
                    <Grid container item xs={12}>
                        <Grid item xs={6}>
                            <Typography align="right" variant="h6">Category:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography className={classes.typographyVal} align="left" variant="h6">{data[ind] && data[ind].category}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={6}>
                            <Typography align="right" variant="h6">Qty:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography className={classes.typographyVal} align="left" variant="h6">{data[ind] && data[ind].quantity === 0 ? <span style={{ color: 'red' }}>Out of stock *</span> : data[ind] && data[ind].quantity}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={6}>
                            <Typography align="right" variant="h6">Price:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography className={classes.price} align="left" variant="h6">{currency(data[ind] && data[ind].price)}</Typography>
                        </Grid>
                    </Grid>

                    <Collapse in={collapse} timeout="auto" unmountOnExit>
                        <Grid container item xs={12}>
                            <Grid>
                                <TextField onFocus={handleFocus} error={error} onChange={handleTotalQty} autoFocus align="left" variant="outlined" name="qty" placeholder="Enter quantity" label="Qty" />
                            </Grid>
                        </Grid>
                        <Grid container justify="center" item xs={12}>
                            <Grid item xs={6}>
                                <Typography align="right" variant="h6">Total Price:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.totalPrice} align="left" variant="h6">{currency(totalPrice)}</Typography>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Grid>
            </DialogContent>
            <DialogActions>
                <NavigateBeforeSharpIcon fontSize="large" color="secondary" className={classes.navigatePrev} onClick={handlePrev}>Previous</NavigateBeforeSharpIcon>
                <NavigateNextSharpIcon fontSize="large" color="primary" className={classes.navigateNext} onClick={handleNext}>Next</NavigateNextSharpIcon>
                <Button onClick={handleCloseModal} variant="text" color="default" size="small" className={classes.closeBtn}><CloseIcon ></CloseIcon></Button>
                {role === 'Customer' ? <Grid container justify="center" item xs={12}>
                    {!collapse ? <Button disabled={data[ind] && data[ind].quantity === 0 ? true : false} onClick={handleCollapse} variant="contained" color="primary"><ShoppingCartIcon></ShoppingCartIcon></Button>
                        :
                        <Grid container justify="center" item xs={12} spacing={2}>
                            <Grid item><Button disabled={btnStatus} onClick={handleAddToCart} variant="contained" color="primary" style={{ color: 'orange', paddingRight: 10 }}>
                                Add To Cart
                            <ShoppingCartIcon></ShoppingCartIcon>
                            </Button>

                            </Grid>
                            <Grid item>
                                <Button onClick={handleCollapse} variant="contained" color="default">Cancel</Button>
                            </Grid>
                        </Grid>
                    }

                </Grid>
                    : null
                }


            </DialogActions>
        </Dialog>
    )
}

export default ProductModal