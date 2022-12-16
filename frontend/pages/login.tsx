import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link as LinkUi, CircularProgress, Box, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/auth/actions';
import EmptyFieldAlert from '../components/EmptyFieldAlert';
import StyledAlert from '../components/StyledAlert';
import api from '../core/services/api';
import { login } from '../core/services/auth';
import Head from 'next/head';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(5),
  },
  avatar: {
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: 36,
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTriedSubmit(true);

    if (!email || !password)
      return;

    try {
      setLoading(true);
      const response = await api.post("/user/auth", { email, password });
      const { token } = response.data;
      const userId = response.data.user._id;

      dispatch(setAuth({ email, name: email }));
      login({ userId, token });
    } catch (err) {
      setLoading(false);
      const { error } = err.response.data;
      setError(error);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Head>
        <title>Login - Start</title>
      </Head>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="E-mail"
            autoComplete="email"
            autoFocus
            error={triedSubmit && !email}
            onChange={e => setEmail(e.target.value)}
          />
          {triedSubmit && !email &&
            <EmptyFieldAlert>Digite um e-mail</EmptyFieldAlert>
          }
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Senha"
            type="password"
            autoComplete="current-password"
            error={triedSubmit && !password}
            onChange={e => setPassword(e.target.value)}
          />
          {triedSubmit && !password &&
            <EmptyFieldAlert>Digite uma senha</EmptyFieldAlert>
          }
          {error && <StyledAlert severity="error">{error}</StyledAlert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            {!loading ? 'Entrar' : <CircularProgress color={'inherit'} size={22} />}
          </Button>
          <Grid container>
            <Grid item>
              <Link href='/criar-conta'>
                <LinkUi href="#" variant="body2">
                  Criar conta
                </LinkUi>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
};

export default Login;