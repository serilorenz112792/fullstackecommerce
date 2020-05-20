import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProductsAction } from '../HomePage/action'
import { editProductAction, clearMessageAction, deleteItemAction, addProductAction } from './action'
import PropTypes from 'prop-types'
import {
    Container, Grid, Button, Paper
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ActionModal from './modal'
import Cards from './card'
const useStyles = makeStyles({

    root: {
        padding: 10
    },
    addBtn: {
        backgroundColor: 'orange',
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: 'red'
        },
        color: 'white',
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    gridCnt: {
        padding: 10
    }


})
const AdminPage = (props) => {
    const classes = useStyles()
    const { home, admin, Products, Edit, Delete, Add, ClearMsg } = props

    const [type, setType] = useState('')
    const [modalState, setModalState] = useState(false)
    const [dataForEdit, setDataForEdit] = useState({})
    useEffect(() => {
        Products()
        ClearMsg()
    }, [Products, ClearMsg])


    const handleCloseModal = (state) => {
        setModalState(state)

    }

    const handleEditModal = (item) => {
        setModalState(!modalState)
        setType('EDIT')
        setDataForEdit(item)
    }
    const handleDeleteModal = (item) => {
        setModalState(!modalState)
        setType('DELETE')

        setDataForEdit(item)
    }
    const handleAddModal = () => {
        setModalState(!modalState)
        setType('ADD')
    }
    return (
        <Container className={classes.root}>
            <ActionModal Add={Add} Delete={Delete} ClearMsg={ClearMsg} adminState={admin} Edit={Edit} data={dataForEdit} type={type} handleClose={handleCloseModal} state={modalState} />
            <Grid>
                <Grid container justify="center" item xs={12}>
                    <Button onClick={handleAddModal} variant="contained" className={classes.addBtn}>Add Product</Button>
                </Grid>
            </Grid>
            <Grid container>
                <Grid container item xs={12}>
                    {home.products && home.products.map((item, index) =>

                        <Grid className={classes.gridCnt} item xs={4} key={index}>
                            <Paper>
                                <Cards backgroundColor={index % 2 === 0 ? 'white' : 'lightblue'} handleDeleteModal={() => handleDeleteModal(item)} handleEditModal={() => handleEditModal(item)} item={item} />
                            </Paper>
                        </Grid>

                    )}
                </Grid>
            </Grid>
        </Container>
    )
}

AdminPage.propTypes = {
    home: PropTypes.any,
    admin: PropTypes.any,
    Products: PropTypes.func.isRequired,
    Edit: PropTypes.func.isRequired,
    Add: PropTypes.func.isRequired,
    Delete: PropTypes.func.isRequired,
    ClearMsg: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    home: state.home,
    admin: state.admin
})
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        Products: getProductsAction,
        Edit: editProductAction,
        Delete: deleteItemAction,
        Add: addProductAction,
        ClearMsg: clearMessageAction
    }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)