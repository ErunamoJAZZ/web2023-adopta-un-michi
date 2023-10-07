import {
  Box, Typography, Button, Container,
} from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Panel de Administración
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Link href="admin/adminCats">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
            >
              Administrar Gatos
            </Button>
          </Link>
          <Link href="admin/adminUsers">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
            >
              Administrar Usuarios
            </Button>
          </Link>
          <Link href="admin/adminDonations">
            <Button
              variant="contained"
              color="primary"
              fullWidth
            >

              Administrar Donaciones
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
