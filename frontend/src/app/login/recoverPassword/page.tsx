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

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [alertState, setAlertState] = useState(0);
  const [infoStatus, setInfoStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.SERVER_URL}/recovery`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        cache: 'no-cache',
        referrerPolicy: 'origin',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const jsonRes = await res.json() as { resp: string };
      setInfoStatus(jsonRes.resp);

      if (res.status === 200) { setAlertState(1); } else { throw new Error('User not found.'); }
    } catch (error) {
      setAlertState(2);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography variant="h5">Recuperar contraseña</Typography>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Recuperar
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

export default ForgotPassword;
