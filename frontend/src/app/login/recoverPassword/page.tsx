'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  CssBaseline,
  Grid,
} from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const url = "http://localhost:3001";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const res = await fetch(`${url}/recovery`, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        cache: "no-cache",
        referrerPolicy: "origin",
        headers:
        {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      
      
      const jres = await res.json();
      
      alert(jres.resp);
      // Redirige al usuario a la página de confirmación o a donde sea necesario
    } catch (error) {
      console.error('Error al enviar las instrucciones de recuperación de contraseña:', error);
      alert('Error al enviar las instrucciones de recuperación de contraseña');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography variant="h5">Recuperar contraseña</Typography>
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
        </form>
      </div>
    </Container>
  );
};

export default ForgotPassword;
