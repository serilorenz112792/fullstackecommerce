import React, { useState } from 'react'
import {
    Card, CardMedia, CardContent, CardActionArea, Typography, Collapse
    , Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { currency } from '../../util/currency'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
const useStyles = makeStyles({
    card: {
        position: 'relative'
    },
    typography: {
        textAlign: 'center',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        "&:hover": {
            whiteSpace: 'normal',
            overflow: 'visible'
        }
    },
    details: {
        textAlign: 'center'
    },
    showDetailsToggle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
        textDecoration: 'underline',
        color: 'blue',
        cursor: 'pointer'
    },
    deleteBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: 'pink'
        }
    },
    cardMedia: {
        paddingTop: 20
    },
    detailsPrice: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#3f51b5',
    }

})

const CardComponent = (props) => {
    const classes = useStyles()
    const { data, handleModal } = props
    const [collapse, setCollapse] = useState(false)
    const imgPath = `http://localhost:3999/${data && data.imgPath}`
    const handleCollapse = () => {
        setCollapse(!collapse)
    }
    return (
        <Card className={classes.card}>
            <CardContent>
                <CardMedia
                    className={classes.cardMedia}
                    component="img"
                    alt="item img"
                    height="150"
                    width="150"
                    image={imgPath}
                    title={data.productName} />

                <Typography className={classes.typography}>{data.productName}</Typography>
                <Typography onClick={handleCollapse} className={classes.showDetailsToggle}>{!collapse ? 'details' : 'hide details'}</Typography>
                <Collapse in={collapse} timeout="auto" unmountOnExit>
                    <Typography className={classes.details}>Category: {data.category}</Typography>
                    <Typography className={classes.details}>Qty: {data.quantity}</Typography>
                    <Typography className={classes.details}>Price: <span className={classes.detailsPrice}>{currency(data.price)}</span></Typography>
                </Collapse>
                <Button onClick={handleModal} className={classes.deleteBtn} variant="text" color="default"><DeleteForeverIcon style={{ color: 'red' }} /></Button>
            </CardContent>
        </Card>
    )
}

export default CardComponent