import React, { useState } from 'react'
import {
    Card, CardMedia, CardContent, CardActionArea, Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
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
    const imgPath = `http://localhost:3999/${data && data.imgPath}`

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