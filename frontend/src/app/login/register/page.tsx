'use client';

import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  Container,
  Typography,
  TextField,
  Button,
  CssBaseline,
  Grid,
  Alert,
  AlertColor,
} from '@mui/material';

import { useRouter } from 'next/navigation';

const registerMutation = gql`
mutation reg(
  $name: String!
  $lastname: String!
  $email: String!
  $password: String!
  $birthday: Date!
) {
  register(
    input: {
      name: $name
      lastName: $lastname
      email: $email
      password: $password
      birthDay: $birthday
    }
  ) {
    user {
      id
    }
  }
}
`;

function Register() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertState, setAlertState] = useState({ show: false, msg: 'Success.', state: 'success' as AlertColor });
  const [doRegister] = useMutation(registerMutation);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data } = await doRegister({
        variables: {
          name,
          lastname: lastName,
          email,
          password,
          birthday: '1999-01-01',
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (data.register.user.id) { setAlertState({ show: true, msg: 'Se ha registrado existosamente.', state: 'success' }); } else { throw new Error('Error'); }
      setTimeout(() => router.push('/login'), 2500);
    } catch (error) {
      setAlertState({ show: true, msg: 'Error en el registro.', state: 'error' });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography variant="h5">Registro</Typography>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Apellido"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Registrarse
          </Button>
          {alertState.show ? (
            <Alert severity={alertState.state}>
              {alertState.msg}
            </Alert>
          ) : null }
        </form>
      </div>
    </Container>
  );
}

export default Register;
