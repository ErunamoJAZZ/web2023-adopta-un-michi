'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  CssBaseline,
  Alert,
} from '@mui/material';

import { useRouter } from 'next/navigation';

function ResetPassword({ params }: { params: { token: string } }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertState, setAlertState] = useState(0);
  const [infoStatus, setInfoStatus] = useState('');
  const [badPasswordAlert, setBadPasswordAlert] = useState(0);

  const router = useRouter();
  const url = 'http://localhost:3001';

  const { token } = params;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setBadPasswordAlert(1);
    }

    try {
      const res = await fetch(
        `${url}/reset/${token}`,
        {
          method: 'POST',
          mode: 'cors',
          credentials: 'omit',
          cache: 'no-cache',
          referrerPolicy: 'origin',
          headers:
          {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ new_pass: password }),
        },
      );

      const jsonRes = await res.json() as { resp: string };
      setInfoStatus(jsonRes.resp);

      if (res.status === 200) { setAlertState(1); } else { throw new Error('Invalid token.'); }
      router.push('/login');
    } catch (error) {
      setAlertState(2);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography variant="h5">Cambiar Contraseña</Typography>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
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
          { badPasswordAlert ? <Alert severity="error"> Las contraseñas no coinciden. </Alert> : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Cambiar Contraseña
          </Button>
          {alertState ? (
            <Alert severity={alertState === 1 ? 'success' : 'error'}>
              {infoStatus}
            </Alert>
          ) : null }
        </form>
      </div>
    </Container>
  );
}

export default ResetPassword;
