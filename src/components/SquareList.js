import React from 'react'
import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton'
import CardMedia from '@material-ui/core/CardMedia'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    cover: {
        width: 160,
        height: 220,
        margin: 'auto'
    },
    mobileCover: {
        width: 180,
        height: 'auto',
        backgroundPositionY: 0,
        [theme.breakpoints.down('xs')]: {
            width: 120,
        }
    },
    hoverCover: {
        textDecoration: 'none',
        width: '100%',
        height: 140,
        backgroundPositionY: 0
    },
    hoverCard: {
        width: 240
    },
    mobileCard: {

    },
    name: {
        textAlign: "center",
        width: 160,
        marginTop: 8,
        textDecoration: 'none',
        color: 'rgba(0, 0, 0, 0.87)',
        margin: 'auto'
    },
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
    hoverRate: {
        textAlign: "center",
        width: 160,
        color: 'orange',
        fontStyle: 'italic',
        textDecoration: 'none',
        margin: 'auto'
    },
    int: {
        fontSize: '24px'
    },
    frac: {
        fontSize: '20px'
    },
    desktop: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    mobile: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
    }
}));

function MovieRate(props) {
    const classes = useStyles()

    if (props.rate === '') {
        return (<></>)
    }

    let intv = props.rate.split('.')[0]
    let frac = props.rate.split('.')[1] ?? 0

    return (
        <div className={(props.mobile ?? false) ? classes.mobileRate : classes.rate}>
            <span className={classes.int}>{intv}</span>
            <span className={classes.frac}>.{frac}</span>
        </div>
    )
}

const movieSource = {
    'mtime': '时光网',
    'maoyan': '猫眼',
    'douban': '豆瓣'
}

class MoveHandler {
    components = {}

    constructor() {
        this.cancelAll = this.cancelAll.bind(this)
    }

    requestEnter(key) {
        Object.keys(this.components).forEach(k => {
            if (key !== k) {
                this.requestQuit(k)
            }
        })
        if (this.components[key]) {
            this.components[key].setState({ hover: true })
        }
    }

    requestQuit(key) {
        if (this.components[key]) {
            this.components[key].setState({ hover: false })
        }
    }

    regComponent(card, key) {
        this.components[key] = card
    }

    cancelAll() {
        Object.keys(this.components ?? {}).forEach(k => {
            this.requestQuit(k)
        })
    }
}

class CardItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hover: false
        }

        this.requestEnter = this.requestEnter.bind(this)
        this.requestQuit = this.requestQuit.bind(this)

        props.handler.regComponent(this, props.item.sourceId)
    }

    shouldComponentUpdate(newProps, newState) {
        return newState.hover !== this.state.hover
    }

    requestEnter() {
        this.props.handler.requestEnter(this.props.item.sourceId)
    }

    requestQuit() {
        this.props.handler.requestQuit(this.props.item.sourceId)
    }

    render() {
        const classes = this.props.classes
        let item = this.props.item

        const float = this.state.hover ? (
            <div style={{ zIndex: 1300, position: 'absolute', transform: 'translateX(-40px)' }} 
                onMouseLeave={this.requestQuit} onMouseEnter={() => {}}>
                <Link className={classes.hoverCover} to={'/detail/' + item.sourceId}>
                    <Card className={classes.hoverCard}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.hoverCover}
                                image={item.cover}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" noWrap>
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="div" noWrap>
                                    类型：<span style={{fontWeight: 'bold'}}>{(item.types ?? []).join('/')}</span>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="div" noWrap>
                                    导演：<span style={{fontWeight: 'bold'}}>{(item.directors ?? []).join('/')}</span>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="div" noWrap>
                                    主演：<span style={{fontWeight: 'bold'}}>{(item.stars ?? []).join('/')}</span>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="div" noWrap>
                                    上映时间：<span style={{fontWeight: 'bold'}}>{(item.releaseDate ?? []).join(',')}</span>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="div" noWrap>
                                    来源：<span style={{fontWeight: 'bold'}}>{movieSource[item.source] ?? ''}</span>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>
            </div>
        ) : (<></>)
        
        return (
            <Grid item>
                {float}
                <div>
                    <Link className={classes.hoverCover} to={'/detail/' + item.sourceId}>
                        <CardMedia
                            component="img"
                            image={item.cover}
                            title={item.name}
                            className={classes.cover}
                            onMouseEnter={this.requestEnter}
                        />
                    </Link>
                    <Typography className={classes.name} noWrap>{item.name}</Typography>
                    <MovieRate className={classes.rate} rate={item.rating ?? ''} />
                </div>
            </Grid>
        )
    }
}

function MobileCardItem(props) {
    const classes = props.classes
    let item = props.item
    
    return (
        <Grid item xs={12} sm={12}>
            <Link style={{ textDecoration: 'none' }} to={'/detail/' + item.sourceId}>
                <Card className={classes.mobileCard}>
                    <CardActionArea>
                        <div style={{ display: 'flex' }}>
                            <CardMedia
                                className={classes.mobileCover}
                                image={item.cover}
                            />
                            <CardContent style={{ flex: 1, width: 0 }}>
                                <div style={{ display: 'flex' }}>
                                    <Typography gutterBottom variant="h5" component="span" style={{ flex: 1 }} noWrap>
                                        {item.name}
                                    </Typography>
                                    <MovieRate rate={item.rating} mobile={true} />
                                </div>
                                <Typography variant="body2" color="textSecondary" component="div" noWrap>
                                    <span>类型：</span><span style={{fontWeight: 'bold'}}>{(item.types ?? []).join('/')}</span>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="div" noWrap>
                                    <span>导演：</span><span style={{fontWeight: 'bold'}}>{(item.directors ?? []).join('/')}</span>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="div" noWrap>
                                    <span>主演：</span><span style={{fontWeight: 'bold'}}>{(item.stars ?? []).join('/')}</span>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="div" noWrap>
                                    <span>上映时间：</span><span style={{fontWeight: 'bold'}}>{(item.releaseDate ?? []).join(',')}</span>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="div" noWrap>
                                    <span>来源：</span><span style={{fontWeight: 'bold'}}>{movieSource[item.source] ?? ''}</span>
                                </Typography>
                            </CardContent>
                        </div>
                    </CardActionArea>
                </Card>
            </Link>
        </Grid>
    )
}

export default function SquareList(props) {
    const classes = useStyles()

    const getLoadingItems = () => {
        let i = 0
        return (
            <>
                {[...Array(20)].map( () => (
                    <Grid item key={'fake-' + i++}>
                        <Skeleton variant="rect" width={160} height={220} animation="wave" />
                        <Skeleton variant="text" animation="wave" width={160} />
                        <Skeleton variant="text" animation="wave" width={160} />
                    </Grid>
                ) )}
            </>
        )
    }

    const getMobileLoadingItems = () => {
        let i = 0
        return (
            <>
                {[...Array(20)].map( () => (
                    <Grid item key={'fake-mb-' + i++} xs={12} sm={12}>
                        <div style={{ display: 'flex' }}>
                            <Skeleton variant="rect" width={150} height={180} animation="wave" />
                            <div style={{ flex: 1, marginLeft: 24 }}>
                                <Skeleton variant="text" animation="wave" width='100%' style={{ marginBottom: 24 }} />
                                <Skeleton variant="text" animation="wave" width='100%' />
                                <Skeleton variant="text" animation="wave" width='100%' />
                                <Skeleton variant="text" animation="wave" width='100%' />
                                <Skeleton variant="text" animation="wave" width='100%' />
                                <Skeleton variant="text" animation="wave" width='100%' />
                            </div>
                        </div>
                    </Grid>
                ) )}
            </>
        )
    }

    const moveHandler = new MoveHandler()

    const getItems = () => {
        return (
            <>
                {props.data.data.map( (item) => {
                    return (<CardItem item={item} classes={classes} key={item.sourceId} handler={moveHandler} />)
                })}
            </>
        )
    }

    const getMobileItems = () => {
        return (
            <>
                {props.data.data.map( (item) => {
                    return (<MobileCardItem item={item} classes={classes} key={'mod-' + item.sourceId} />)
                })}
            </>
        )
    }

    return (
        <>
            <Grid className={classes.desktop} container justify="space-evenly" spacing={6} style={{flexGrow: 1}} onMouseEnter={moveHandler.cancelAll}>
                {props.loading || props.data.data === undefined ? getLoadingItems() : getItems() }
            </Grid>
            <Grid className={classes.mobile} container justify="space-evenly" spacing={3} style={{flexGrow: 1}}>
                {props.loading || props.data.data === undefined ? getMobileLoadingItems() : getMobileItems() }
            </Grid>
        </>
    )

}