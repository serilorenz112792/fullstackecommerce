import React, { useState } from 'react'
import { Grid, Typography, Container, Paper, Avatar, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import bgi from '../../images/background-image2.png'
import me from '../../images/renz.jpg'
import Modal from './instructionsModal'
const useStyles = makeStyles({
    gridContainer: {
        maxWidth: 1000,
        width: 1000,
    },
    gridDetails: {
        paddingTop: 50,
        paddingBottom: 20
    },
    root: {
        paddingTop: 30
    },
    hello: {
        textAlign: 'center',
        fontFamily: 'san serif',
        fontStyle: 'italic',
        color: 'black'
    },
    bgi: {
        width: '100%',
        height: 200
    },
    avatar: {
        width: 200,
        height: 200
    },
    mongo: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'red'
    },
    express: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'orange'
    },
    react: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'green'
    },
    nodeJs: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'violet'
    },
    text: {
        textAlign: 'center',
        fontFamily: 'san serif',
        fontSize: 20
    },
    instructionsBtn: {
        color: 'orange',
        fontFamily: 'san serif',
        '&:hover': {
            color: 'red'
        }
    },
    instructionsBtnGrid: {
        paddingTop: 30
    }
})
const WelcomePage = (props) => {
    const classes = useStyles()
    const [modalState, setModalState] = useState(false)
    const handleOpenModal = () => {
        setModalState(!modalState)
    }
    const handleClose = state => {
        setModalState(state)
    }
    return (
        <div >
            <Modal history={props.history} state={modalState} handleClose={handleClose} />
            <Grid container item xs={12}>
                <div className={classes.bgi}>
                    <img style={{ width: '100%', height: '100%', objectFit: 'none' }} src={bgi} alt="background image" />
                </div>
            </Grid>
            <Container className={classes.root}>
                <Grid>
                    <Grid container justify="center" item xs={12}>
                        <Paper>
                            <Grid className={classes.gridContainer} container justify="center">
                                <Grid item xs={12}>
                                    <Typography className={classes.hello} variant="h4">HELLO & WELCOME</Typography>
                                </Grid>
                                <Grid className={classes.gridDetails} justify="center" container>
                                    <Grid justify="center" container item xs={4}>
                                        <Avatar className={classes.avatar} alt="Renz Serilo" src={me} />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography className={classes.text} variant="body1">
                                                    A simple e-commerce web application using <span className={classes.mongo}>MongoDB</span>, <span className={classes.express}>Express</span>,
                                            <span className={classes.react}> React</span> and <span className={classes.nodeJs}>Node Js</span>.

                                                </Typography>
                                            </Grid>
                                            <Grid className={classes.instructionsBtnGrid} item xs={12}>
                                                <Grid container justify="center">
                                                    <Button onClick={handleOpenModal} color="primary" className={classes.instructionsBtn} variant="contained">
                                                        Read Instructions
                                                    </Button>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container >
        </div>
    )
}

export default WelcomePage