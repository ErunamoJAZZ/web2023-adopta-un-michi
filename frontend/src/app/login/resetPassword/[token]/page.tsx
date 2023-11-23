'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  CssBaseline,
} from '@mui/material';

import { useRouter } from 'next/navigation';

const ResetPassword = ({params}: { params: { token: string }}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const url = "http://localhost:3001";

  const token = params.token;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      
      const res = await fetch(
        `${url}/reset/${token}`,
        {
          method: "POST",
          mode: "cors",
          credentials: "omit",
          cache: "no-cache",
          referrerPolicy: "origin",
          headers:
          {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({new_pass: password})
        }
      )

      const json_res = await res.json();

      alert(json_res.resp);
      router.push('/login');


    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      alert('Error al cambiar la contraseña');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography variant="h5">Cambiar Contraseña</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nueva Contraseña"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirmar Contraseña"
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            Cambiar Contraseña
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ResetPassword;
