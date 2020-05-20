import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPurchasesAction, removeItemAction } from './action'
import PropTypes from 'prop-types'
import {
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelActions, ExpansionPanelDetails,
    Grid, Typography, Container
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardComponent from './cardPurchases'
import ConfirmationModal from './confirmationModal'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles({
    expansionPanel: {
        width: 'inherit'
    },
    expansionGrid: {
        paddingTop: 30
    }
})
const ProfilePage = (props) => {
    const classes = useStyles()
    const { profile, Purchases, auth, RemoveItem } = props
    const [modalState, setModalState] = useState(false)
    const [index, setIndex] = useState(0)
    const [details, setDetails] = useState({})
    useEffect(() => {
        Purchases(auth.user && auth.user._id)
    }, [Purchases, auth.user])
    const handleRemoveItem = () => {
        const data = {
            userId: auth.user && auth.user._id,
            purchasedId: profile.purchases.item && profile.purchases.item[index].purchasedId
        }
        RemoveItem(data)
    }
    const handleCloseModal = (state) => {
        setModalState(state)
    }
    const handleConfirmationModal = (details, indx) => {
        setDetails(details)
        setIndex(indx)
        setModalState(!modalState)
    }
    return (
        <Container>
            <ConfirmationModal data={details} RemoveItem={handleRemoveItem} state={modalState} handleClose={handleCloseModal} />
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
                                            <Grid item xs={4} key={ind}>
                                                <CardComponent index={ind} handleModal={() => handleConfirmationModal(obj, ind)} RemoveItem={handleRemoveItem} data={obj} />
                                            </Grid>)

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
    RemoveItem: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        Purchases: getPurchasesAction,
        RemoveItem: removeItemAction
    }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)