import React, { useState, useEffect } from 'react'
import {
    Card, CardMedia, CardContent, CardActionArea, Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import dotenv from 'dotenv'
dotenv.config()
const useStyles = makeStyles({
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
        textAlign: 'center',
    },
    cardImage: {
        objectFit: 'fill',
    }
})

const CardComponent = (props) => {
    const classes = useStyles()
    const { data } = props
    const [imgPath, setImgPath] = useState('')
    //let imgPath = ''
    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            setImgPath(`https://thawing-savannah-18279.herokuapp.com/${data && data.imgPath}`)
        }
        else {
            setImgPath(`http://localhost:3999/${data && data.imgPath}`)
        }
    }, [imgPath, data])
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <CardMedia
                        className={classes.cardImage}
                        component="img"
                        alt="item img"
                        height="150"
                        width="150"
                        image={imgPath}
                        title={data.productName} />
                    <Typography className={classes.typography}>{data.productName}</Typography>
                </CardContent>

            </CardActionArea>
        </Card>
    )
}

export default CardComponent