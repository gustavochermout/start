import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import EmptyFieldAlert from './EmptyFieldAlert';
import { makeStyles, Box, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  field: {
    marginTop: theme.spacing(1.5),
  }
}));

const TextFieldForm = (props: TextFieldProps) => {
  const classes = useStyles();

  return (
    <Box component="div" style={{ ...props.style }}>
      <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        size="small"
        className={classes.field}
        {...props}
        style={{}}
      />
      {props.error &&
        <EmptyFieldAlert>Campo necessário</EmptyFieldAlert>
      }
    </Box>
  )
}

export default TextFieldForm;