'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  CssBaseline,
  Alert,
} from '@mui/material';
import Link from 'next/link';
import { gql, useMutation } from '@apollo/client';
// import {  } from "@apollo/experimental-nextjs-app-support/ssr";

const loginMutation = gql`
mutation auth($email: String!, $password: String!) {
  authenticate(input: { email: $email, password: $password }) {
    jwtToken
  }
}
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertState, setAlertState] = useState({ show: false, msg: '' });

  const [doLogin] = useMutation(loginMutation);
  // const apolloCli = useQuery(loginMutation);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await doLogin({
        variables: {
          email,
          password,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const token = data.authenticate?.jwtToken as string;

      if (token) {
        setAlertState({
          show: false,
          msg: '',
        });
        localStorage.setItem('tokenMichis', `${token}`);
      } else {
        // console.log('token nulo');
        setAlertState({
          show: true,
          msg: 'Credenciales incorrectas.',
        });
      }
      // Redirige al usuario a la página de inicio o a otra página
    } catch (error) {
      setAlertState({
        show: true,
        msg: `Error: ${error}`,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography variant="h5">Iniciar Sesión</Typography>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Correo Electrónico"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Iniciar Sesión
          </Button>
        </form>

        {alertState.show ? (
          <Alert severity="error">
            {alertState.msg}
          </Alert>
        ) : null }

        <Link href="/login/recoverPassword"> Recuperar contraseña </Link>
      </div>
    </Container>
  );
}

export default Login;
