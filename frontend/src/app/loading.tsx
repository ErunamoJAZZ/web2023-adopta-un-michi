'use client';

import React from 'react';
import { Container, CircularProgress, Typography } from '@mui/material';

const container = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
};

const progress = {
  margin: '2em',
};

const Loading = () => {
  return (
    <Container sx={container}>
      <Typography variant="h5">Cargando...</Typography>
      <CircularProgress sx={progress} color="primary" />
    </Container>
  );
};

export default Loading;
