import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPurchasesAction, removeItemAction, changePasswordAction, clearMessageAction } from './action'
import PropTypes from 'prop-types'
import {
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelActions, ExpansionPanelDetails,
    Grid, Typography, Container, Button
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardComponent from './cardPurchases'
import ConfirmationModal from './confirmationModal'
import ChangePassModal from './changePassModal'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles({
    expansionPanel: {
        width: 'inherit'
    },
    expansionGrid: {
        paddingTop: 30
    },
    name: {
        fontFamily: 'san serif',
        fontStyle: 'italic',
        color: 'red',
        paddingTop: 30
    },
    changePassBtn: {
        paddingTop: 30,

    }
})
const ProfilePage = (props) => {
    const classes = useStyles()
    const { profile, Purchases, auth, RemoveItem, ChangePass, ClearMsg } = props
    const [modalState, setModalState] = useState(false)
    const [changePassModalState, setChangePassModalState] = useState(false)
    const [index, setIndex] = useState(0)
    const [details, setDetails] = useState({})
    useEffect(() => {
        Purchases(auth.user && auth.user._id)
        ClearMsg()
    }, [Purchases, ClearMsg, auth.user])
    const handleRemoveItem = () => {
        const data = {
            userId: auth.user && auth.user._id,
            purchasedId: profile.purchases.item && profile.purchases.item[index].purchasedId
        }
        RemoveItem(data)
    }
    const handleCloseModal = (state) => {
        setModalState(state)
        setChangePassModalState(state)
        ClearMsg()
    }
    const handleConfirmationModal = (details, indx) => {
        setDetails(details)
        setIndex(indx)
        setModalState(!modalState)
    }
    const handleChangePassModal = () => {
        setChangePassModalState(!modalState)
    }
    return (
        <Container>
            <ChangePassModal ClearMsg={ClearMsg} profile={profile} auth={auth} ChangePass={ChangePass} state={changePassModalState} handleClose={handleCloseModal} />
            <ConfirmationModal data={details} RemoveItem={handleRemoveItem} state={modalState} handleClose={handleCloseModal} />
            <Grid container>
                <Grid item lg={9} md={9} xs={12}>
                    <Typography className={classes.name} variant="h4">{`Welcome ${auth.user && auth.user.name ? auth.user && auth.user.name : ''}`}</Typography>
                </Grid>
                <Grid className={classes.changePassBtn} item lg={3} md={3} xs={12}>
                    <Button variant="contained" color="primary" onClick={handleChangePassModal}>Change Password</Button>
                </Grid>
            </Grid>
            <Grid className={classes.expansionGrid} container item xs={12}>
                <ExpansionPanel className={classes.expansionPanel}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography variant="h5" color="primary">My purchases</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {profile.purchases.item && profile.purchases.item.length >= 1 ?
                            <Grid item xs={12}>
                                <Grid container justify="center" spacing={3}>
                                    {
                                        profile.purchases.item && profile.purchases.item.map((obj, ind) =>
                                            <Grid item lg={4} md={6} xs={12} key={ind}>
                                                <CardComponent index={ind} handleModal={() => handleConfirmationModal(obj, ind)} RemoveItem={handleRemoveItem} data={obj} />
                                            </Grid>).reverse()

                                    }
                                </Grid>
                            </Grid> :
                            <Grid item xs={12}>
                                <h1 style={{ color: 'red', fontStyle: 'italic' }}>No Item(s)</h1>
                            </Grid>
                        }

                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Grid>
        </Container>
    )
}
ProfilePage.propTypes = {
    profile: PropTypes.any,
    Purchases: PropTypes.func.isRequired,
    RemoveItem: PropTypes.func.isRequired,
    ChangePass: PropTypes.func.isRequired,
    ClearMsg: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        Purchases: getPurchasesAction,
        RemoveItem: removeItemAction,
        ChangePass: changePasswordAction,
        ClearMsg: clearMessageAction
    }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)