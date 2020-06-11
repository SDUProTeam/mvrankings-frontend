import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    rate: {
        textAlign: "center",
        width: 160,
        color: 'orange',
        fontStyle: 'italic',
        textDecoration: 'none',
        margin: 'auto'
    },
    mobileRate: {
        textAlign: "center",
        color: 'orange',
        fontStyle: 'italic',
        textDecoration: 'none',
        margin: 0
    },
    int: {
        fontSize: '24px'
    },
    frac: {
        fontSize: '20px'
    },
}));


export default function MovieRate(props) {
    const classes = useStyles()

    if (props.rate === '' || props.rate === undefined) {
        return (<></>)
    }

    let intv = (props.rate + '').split('.')[0]
    let frac = (props.rate + '').split('.')[1] ?? 0

    return (
        <div className={(props.mobile ?? false) ? classes.mobileRate : classes.rate}>
            <span className={classes.int}>{intv}</span>
            <span className={classes.frac}>.{frac}</span>
        </div>
    )
}