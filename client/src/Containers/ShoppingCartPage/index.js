import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getItemAction, removeItemAction, buyItemAction, clearMessage } from './action'
import PropTypes from 'prop-types'
import {
    Grid, Typography, Container, Card, CardMedia,
    CardContent, CardActionArea, Paper, Button
} from '@material-ui/core'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import { makeStyles } from '@material-ui/core/styles'
import ConfirmationModal from './confirmationModal'
import { currency } from '../../util/currency'
import EmptyCart from '../../images/Empty_Shopping_Cart.jpg'
import ShopIcon from '@material-ui/icons/Shop'
const useStyles = makeStyles({
    typography: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    details: {
        fontWeight: 'bold',
        paddingLeft: 10,
        fontFamily: 'fantasy'
    },
    price: {
        fontWeight: 'bold',
        color: '#3f51b5',
        paddingLeft: 10,
        fontStyle: 'italic',
        fontFamily: 'fantasy'
    },
    cardMedia: {
        maxWidth: 500,
        border: 'solid 1px gray',
        borderRadius: '8px',
        padding: 5,
        backgroundColor: 'white'
    },
    paper: {
        padding: 20
    },
    gridContainer: {
        paddingTop: 20,
        width: 700,
        maxWidth: 700
    },
    card: {
        backgroundColor: 'gray'
    },
    actionGrid: {
        position: 'absolute'
    },
    actionBtns: {
        position: 'relative',
        top: 90
    },
    purchaseBtn: {
        color: 'orange'
    },
    image: {
        objectFit: 'fill',

    },
    cardImgEven: {
        backgroundColor: 'white'
    },
    cardImgOdd: {
        backgroundColor: 'lightgray'
    },
    buyProductBtn: {
        backgroundColor: 'orange',
        color: 'white',

        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: 'red'
        }
    }
})
const ShoppingCartPage = (props) => {
    const classes = useStyles()
    const { uid, cart, GetItem, RemoveItem, Purchase, ClearMsg, history } = props
    const [modalState, setModalState] = useState(false)
    const [dataDetails, setDataDetails] = useState('')
    const [index, setIndex] = useState(0)
    const [actionType, setActionType] = useState('')
    const [userId, setUserId] = useState('')

    useEffect(() => {
        GetItem()
        setUserId(uid && uid._id)
        ClearMsg()
    }, [uid, userId])
    //const imgPath = `http://localhost:3999/${cart && cart.cartItems.imgPath}`
    //console.log("cart", cart)

    const handleConfirmationModal = (obj, ind) => {
        setModalState(!modalState)
        setDataDetails(obj)
        setIndex(ind)
        setActionType('DELETE')
    }
    const handlePurchaseModal = (obj, ind) => {
        setModalState(!modalState)
        setDataDetails(obj)
        setIndex(ind)
        setActionType('PURCHASE')
    }
    const handleCloseModal = (state, type) => {
        setModalState(state)
        setActionType(type)
    }
    const handleBuyProduct = () => {
        history.push('/home')
    }
    return (
        <Container>
            <ConfirmationModal Clear={ClearMsg} cart={cart} email={uid && uid.email} userId={userId} type={actionType} Purchase={Purchase} RemoveItem={RemoveItem} data={dataDetails} index={index} state={modalState} handleClose={handleCloseModal} />
            <Paper className={classes.paper}>
                {cart.cartItems.length >= 1 ? <Grid container justify="center">
                    {cart && cart.cartItems.map((obj, ind) =>
                        <Grid className={classes.gridContainer} key={ind}>
                            <Card className={ind % 2 === 0 ? classes.cardImgOdd : classes.cardImgEven}>
                                <Grid container>
                                    <Grid item xs={8}>
                                        <CardContent>

                                            <Grid container justify="center">
                                                <div className={classes.cardMedia}>
                                                    <CardMedia
                                                        className={classes.image}
                                                        component="img"
                                                        alt="item img"
                                                        height="250"
                                                        width="250"
                                                        image={`http://localhost:3999/${obj.imgPath}`}
                                                        title={obj.productName} />
                                                </div>
                                            </Grid>
                                            <Grid container item xs={12}>
                                                <Grid item xs={6}>
                                                    <Typography align="right" variant="h6">Item Name:</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography className={classes.details} align="left" variant="h6">{obj.productName}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container item xs={12}>
                                                <Grid item xs={6}>
                                                    <Typography align="right" variant="h6">Category:</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography className={classes.details} align="left" variant="h6">{obj.category}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container item xs={12}>
                                                <Grid item xs={6}>
                                                    <Typography align="right" variant="h6">Qty:</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography className={classes.details} align="left" variant="h6">{obj.quantity}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container item xs={12}>
                                                <Grid item xs={6}>
                                                    <Typography align="right" variant="h6">Price:</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography className={classes.price} align="left" variant="h6">{currency(obj.price)}</Typography>
                                                </Grid>
                                            </Grid>

                                        </CardContent>

                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.actionBtns}>
                                            <Grid style={{ paddingBottom: 10 }} container justify="center">
                                                <Button onClick={() => handlePurchaseModal(obj, ind)} variant="contained" color="primary" className={classes.purchaseBtn}>Purchase<ShoppingBasketIcon /></Button>
                                            </Grid>
                                            <Grid container justify="center">
                                                <Button onClick={() => handleConfirmationModal(obj, ind)} variant="contained" color="secondary">Remove<RemoveCircleOutlineIcon /></Button>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    )}
                </Grid> :
                    <Grid >
                        <Grid item xs={12}>
                            <div style={{ textAlign: 'center' }}>
                                <img src={EmptyCart} alt="Empty Cart" />
                            </div>
                        </Grid>
                        <Grid style={{ paddingTop: 100 }} container justify="center" item xs={12}>
                            <Button onClick={handleBuyProduct} className={classes.buyProductBtn} variant="contained">Buy Products<ShopIcon></ShopIcon></Button>
                        </Grid>
                    </Grid>
                }

            </Paper>
        </Container>
    )
}

ShoppingCartPage.propTypes = {
    uid: PropTypes.any,
    cart: PropTypes.any,
    GetItem: PropTypes.func.isRequired,
    RemoveItem: PropTypes.func.isRequired,
    Purchase: PropTypes.func.isRequired,
    ClearMsg: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    uid: state.auth.user,
    cart: state.cart
})
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        GetItem: getItemAction,
        RemoveItem: removeItemAction,
        ClearMsg: clearMessage,
        Purchase: buyItemAction
    }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartPage)