import { Container, makeStyles, Typography, Avatar, Box, Button, Theme } from "@material-ui/core";
import Head from "next/head";
import PersonIcon from '@material-ui/icons/Person';
import TextFieldForm from "../components/TextFieldForm";
import { Link as LinkUi, CircularProgress } from '@material-ui/core';
import Link from 'next/link';
import { useState } from "react";
import StyledAlert from "../components/StyledAlert";
import api from "../core/services/api";
import { login } from "../core/services/auth";
import { setAuth } from "../redux/auth/actions";
import { useDispatch } from "react-redux";

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
    margin: theme.spacing(1.5, 0, 2),
    height: 36,
  },
  terms: {
    marginLeft: -theme.spacing(1.5),
    marginTop: theme.spacing(0.5),
  }
}));

const CreateAccount = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const isValidForm = () => {
    if (!email || !password || !confirmationPassword)
      return false;

    if (password.length < 4) {
      setError('A senha deve conter no mínimo 4 dígitos');
      return false;
    }

    if (password !== confirmationPassword) {
      setError('A senha de confirmação não corresponde a senha informada');
      return false;
    }

    return true;
  }

  const createUser = async () => {
    const response = await api.post('/user', {
      email,
      password: password,
    });

    return response.data;
  }

  const save = async () => {
    try {
      setLoading(true);

      const user = await createUser();
      const { token } = user;
      const userId = user.user._id;

      dispatch(setAuth({ email, name: email }));
      login({ userId, token });
    } catch (err) {
      setLoading(false);
      const { error } = err.response.data;
      setError(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setTriedSubmit(true);
    if (!isValidForm()) return;

    save();
  }

  return (
    <Container component="main" maxWidth="xs">
      <Head>
        <title>Criar conta - Start</title>
      </Head>
      <Box component='div' className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Criar conta
        </Typography>
        <form className={classes.form} noValidate>
          <TextFieldForm
            label="E-mail"
            autoComplete="email"
            size="medium"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={triedSubmit && !email}
            disabled={loading}
          />
          <Box component='div' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextFieldForm
              label="Senha"
              type="password"
              autoComplete="current-password"
              style={{ marginRight: 8 }}
              size="medium"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={triedSubmit && !password}
              disabled={loading}
            />
            <TextFieldForm
              label="Confirmar senha"
              type="password"
              autoComplete="current-password"
              size="medium"
              margin="normal"
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
              error={triedSubmit && !confirmationPassword}
              disabled={loading}
              InputLabelProps={{
                style: { fontSize: '0.95rem', marginTop: 1 }
              }}
            />
          </Box>
          {error && <StyledAlert style={{ marginBottom: 12 }} severity="error">{error}</StyledAlert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            {!loading ? 'Criar' : <CircularProgress color={'inherit'} size={22} />}
          </Button>
          <Box component="span" display="flex">
            <Typography component="p" variant="body2" style={{ marginRight: 4 }}>
              Já tem uma conta?
            </Typography>
            <Link href='/login'>
              <LinkUi href="#" variant="body2">
                Fazer login
              </LinkUi>
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

export default CreateAccount;