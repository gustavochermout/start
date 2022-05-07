import Alert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  outlinedAlert: {
    marginTop: theme.spacing(1.5),
    fontSize: 13,
    height: 45,
    alignItems: 'center',
  },
}));

const StyledAlert = (props: AlertProps) => {
  const classes = useStyles();

  return (
    <Alert 
      className={classes.outlinedAlert} 
      variant="outlined" 
      {...props}
    >
      {props.children}
    </Alert>
  )
}

export default StyledAlert;