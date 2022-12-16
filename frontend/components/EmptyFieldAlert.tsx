import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme: Theme) => ({
  alert: {
    margin: theme.spacing(-0.5, 0, 0),
    padding: theme.spacing(0, 0, 0),
    height: 24,
    alignItems: 'center',
    color: theme.palette.error.main,
    fontSize: 10.5,
    whiteSpace: 'nowrap',
  },
}));

const EmptyFieldAlert = ({ children }) => {
  const classes = useStyles();

  return (
    <Alert
      className={classes.alert}
      severity="error"
      icon={<ErrorOutlineIcon fontSize="small" />}
    >
      {children}
    </Alert>
  )
}

export default EmptyFieldAlert;