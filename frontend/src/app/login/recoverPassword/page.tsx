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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Agrega aquí la lógica para enviar las instrucciones de recuperación de contraseña

      alert('Instrucciones de recuperación de contraseña enviadas al correo electrónico: ' + email);
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
        <Typography variant="h5">Recuperar Contraseña</Typography>
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
            Enviar Instrucciones
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ForgotPassword;