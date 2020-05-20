import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProductsAction } from './action'
import PropTypes from 'prop-types'
import {
    Grid, Container, InputLabel, FormControl, Select, MenuItem, TextField,
    Paper,
    Typography
} from '@material-ui/core'
import CardComponent from './cardComponent'
import ProductModal from './itemModal'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles({
    root: {
        display: 'flex',
        '& > *': {
            //margin: theme.spacing(1),
        },
    },
    paper: {
        padding: 20,
        width: 'inherit',
        height: 479
    },
    btnActive: {
        backgroundColor: 'red', cursor: 'pointer', listStyle: 'none', marginRight: 10, width: 20, textAlign: 'center',
        color: 'white', border: '1px solid gray', borderRadius: '10px'
    },
    btnInactive: {
        backgroundColor: 'orange', cursor: 'pointer', listStyle: 'none', marginRight: 10, width: 20, textAlign: 'center',
        color: 'white', border: '1px solid gray', borderRadius: '10px', "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: 'pink'
        }
    },
    gridPaginationBtn: {
        paddingTop: 30
    },
    noProducts: {
        textAlign: 'center',
        color: 'red',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontFamily: 'fantasy'
    }
})
const HomePage = (props) => {

    const classes = useStyles()
    const { home, GetProducts, auth } = props

    const [getCategory, setGetCategory] = useState('all')
    const [openItemModal, setOpenItemModal] = useState(false)
    const [productData, setProductData] = useState([])
    const [index, setIndex] = useState(0)

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(6)

    const [searchText, setSearchText] = useState('')
    const [searchData, setSearchData] = useState([])
    useEffect(() => {

        GetProducts()
    }, [getCategory, GetProducts, searchText, searchData, auth])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    let currentItem = []
    const pageNumbers = []
    if (getCategory === 'all') {
        if (searchText) {
            currentItem = searchData.slice(indexOfFirstItem, indexOfLastItem)
            for (let i = 1; i <= Math.ceil(searchData.length / itemsPerPage); i++) {

                pageNumbers.push(i)

            }
        }
        else {
            currentItem = home && home.products.slice(indexOfFirstItem, indexOfLastItem)
            for (let i = 1; i <= Math.ceil(home && home.products.length / itemsPerPage); i++) {
                pageNumbers.push(i)
            }
        }

    }
    else {
        if (searchText) {
            const filteredItem = searchData.filter(obj => obj.category === getCategory)
            currentItem = filteredItem.slice(indexOfFirstItem, indexOfLastItem)
            for (let i = 1; i <= Math.ceil(filteredItem.length / itemsPerPage); i++) {
                pageNumbers.push(i)
            }
        }
        else {
            const filteredItem = home && home.products.filter(obj => obj.category === getCategory)
            currentItem = filteredItem.slice(indexOfFirstItem, indexOfLastItem)
            for (let i = 1; i <= Math.ceil(filteredItem.length / itemsPerPage); i++) {
                pageNumbers.push(i)
            }
        }
    }

    const filterValue = [{ label: 'Mouse', value: 'mouse' },
    { label: 'Keyboard', value: 'keyboard' }, { label: 'Laptop', value: 'laptop' }, { label: 'All', value: 'all' }]

    const handleGetCategory = (e) => {
        setGetCategory(e.target.value)
        setCurrentPage(1)
    }
    const handleSelectProduct = (data, ind) => {
        setOpenItemModal(!openItemModal)
        let tempArr = []

        if (getCategory === 'all') {
            if (searchText) {
                tempArr = searchData
            }
            else {
                tempArr = home.products
            }

        }
        else {
            if (searchText) {
                tempArr = searchData.filter(obj => obj.category === getCategory)
            }
            else {
                tempArr = home.products.filter(obj => obj.category === getCategory)
            }

        }
        setProductData(tempArr)
        setIndex(ind)
    }
    const handleCloseModal = (state, ind) => {
        setOpenItemModal(state)
        setIndex(ind)
    }
    const handlePageNumber = (event) => {
        setCurrentPage(Number(event.target.id))
    }
    const handleSearch = (e) => {
        setSearchText(e.target.value.toLowerCase())
        if (searchText !== '') {
            setCurrentPage(1)
            setSearchData(home && home.products.filter(obj => obj.productName.toLowerCase().includes(searchText)))
        }
    }
    //console.log("filtered Items", filteredItems)
    // console.log("category", openItemModal) 

    //console.log("search Text", searchText) 
    // console.log("PROD DATA", productData) 

    return (
        <Container>
            <ProductModal role={auth.user && auth.user.role} handleClose={handleCloseModal} page={currentPage} data={currentItem} index={index} state={openItemModal} />
            <Grid style={{ paddingTop: 30 }} container spacing={3}>
                <Grid container justify="center" item xs={5}>
                    <FormControl>
                        <InputLabel htmlFor="category">Category</InputLabel>
                        <Select
                            style={{ width: 250 }}
                            labelId="category"
                            onChange={handleGetCategory}
                            defaultValue={filterValue[3].value}
                        >
                            {filterValue.map((obj, ind) => <MenuItem key={ind} value={obj.value}>
                                {obj.label}
                            </MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container item xs={7}>
                    <TextField onChange={handleSearch} fullWidth variant="outlined" placeholder="Search an item"></TextField>
                </Grid>
            </Grid>
            <Grid style={{ paddingTop: 30 }} container>
                <Paper className={classes.paper}>
                    <Grid item xs={12}>
                        {currentItem.length >= 1 ?
                            <Grid container justify="center" spacing={3}>
                                {
                                    currentItem.map((obj, ind) =>
                                        <Grid onClick={() => handleSelectProduct(obj, ind)} item xs={4} key={obj._id}>
                                            <CardComponent data={obj} />
                                        </Grid>

                                    )
                                }
                            </Grid>
                            :
                            <Grid>
                                <Typography className={classes.noProducts} variant="h3" >No product(s) available</Typography>
                            </Grid>
                        }

                        <Grid style={{ paddingTop: 20 }} container justify="center">
                            <div className={classes.root}>
                                {pageNumbers.length > 1 ? pageNumbers.map((number, ind) => (

                                    <li
                                        className={currentPage === number ? classes.btnActive : classes.btnInactive}
                                        onClick={handlePageNumber} key={number} id={number} >
                                        {number}
                                    </li>)) : null}
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Container>
    )
}
HomePage.propTypes = {
    home: PropTypes.any,
    GetProducts: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    home: state.home,
    auth: state.auth
})
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        GetProducts: getProductsAction
    }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)