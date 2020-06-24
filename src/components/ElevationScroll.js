import React from 'react';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles, AppBar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    appBar: {
        width: '100%',
        backgroundColor: '#3f51b5',
        transition: '500ms'
    },
    transAppBar: {
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        transition: '500ms'
    }
}))

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 300,
    target: window ? window() : undefined,
  });

  const classes = useStyles()

  return React.cloneElement(children, { className: trigger ? classes.appBar : classes.transAppBar });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function ElevationScrollAppBar(props) {

    return (
        <ElevationScroll {...props}>
            <AppBar>
                {props.children}
            </AppBar>
        </ElevationScroll>
    )
}