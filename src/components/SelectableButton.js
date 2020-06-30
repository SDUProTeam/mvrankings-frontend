import React from "react";
import {
  Card,
  makeStyles,
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 100,
    maxWidth: 220,
  },
  rootSelected: {
    backgroundColor: theme.palette.primary.main,
    height: 100,
    maxWidth: 220,
  },
  rootMedia: {
    height: 240,
    maxWidth: 220,
    [theme.breakpoints.down('xs')]: {
        maxWidth: '100%'
    }
  },
  rootMediaSelected: {
    backgroundColor: theme.palette.primary.main,
    height: 240,
    maxWidth: 220,
    [theme.breakpoints.down('xs')]: {
        maxWidth: '100%'
    }
  },
  content: {
    textAlign: "center",
    fontSize: 16,
    zIndex: 1
  },
  contentSelected: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    zIndex: 1
  },
  button: {
      display: 'flex',
      width: '100%'
  },
  media: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    filter: 'brightness(0.5)',
    width: '100%'
  },
  mediaSelected: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    filter: 'brightness(0.5) opacity(0.3)',
    width: '100%'
  }
}));

export default function SelectableButton(props) {
  const classes = useStyles();

  if (props.background) {
    return (
      <Card
        onClick={props.onClick}
        className={
            props.checked
            ? classes.rootMediaSelected
            : classes.rootMedia
        }
      >
        <CardActionArea className={classes.button} style={{ height: "100%" }}>
          <div className={props.checked ? classes.mediaSelected : classes.media}>
              <img style={{ width: '100%' }} src={props.background}></img>
          </div>
          <CardContent
            className={classes.contentSelected}
          >
            <Typography variant="h6" style={{ fontWeight: 600 }}>{props.text}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  } else {
    return (
      <Card
        onClick={props.onClick}
        className={
            props.checked
            ? classes.rootSelected
            : classes.root
        }
      >
        <CardActionArea style={{ height: "100%" }}>
          <CardContent
            className={props.checked ? classes.contentSelected : classes.content}
          >
            <Typography variant="h6">{props.text}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

}
