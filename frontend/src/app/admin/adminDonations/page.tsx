import { Box, Button, TextField, } from '@mui/material';
import DataTable from '../../../components/adminTable';

export default function AdminDonations() {
  const columnaDonations = [
    { titulo: 'Nombre', campo: 'name' },
    { titulo: 'Correo', campo: 'email' },
    { titulo: 'Objeto', campo: 'object' },
    { titulo: 'Fecha', campo: 'date' },
    { titulo: 'Estado', campo: 'status' },
  ];

  const donations = [
    { name: 'Carlos Pérez', email: 'carlos.perez@example.com', object: 'Comida', date: '2023-10-01', status: 'Recibido' },
    { name: 'Marta García', email: 'marta.garcia@example.com', object: 'Juguetes', date: '2023-09-29', status: 'Pendiente' },
    { name: 'Juan Rodríguez', email: 'juan.rodriguez@example.com', object: 'Dinero', date: '2023-10-02', status: 'Recibido' },
    { name: 'Ana Ramírez', email: 'ana.ramirez@example.com', object: 'Ropa', date: '2023-09-28', status: 'Recibido' },
    { name: 'Luisa Morales', email: 'luisa.morales@example.com', object: 'Mantas', date: '2023-10-03', status: 'Pendiente' },
    { name: 'Diego Ortega', email: 'diego.ortega@example.com', object: 'Comida', date: '2023-09-27', status: 'Recibido' },
    { name: 'Lucía Guzmán', email: 'lucia.guzman@example.com', object: 'Dinero', date: '2023-10-04', status: 'Pendiente' },
    { name: 'Mario Castillo', email: 'mario.castillo@example.com', object: 'Medicinas', date: '2023-09-26', status: 'Recibido' },
    { name: 'Sofía Peña', email: 'sofia.pena@example.com', object: 'Ropa', date: '2023-10-05', status: 'Pendiente' },
    { name: 'José Mendoza', email: 'jose.mendoza@example.com', object: 'Comida', date: '2023-09-25', status: 'Recibido' },
  ];

  const donationsReceived = donations.filter(donation => donation.status === 'Recibido').length;
  const donationsPending = donations.filter(donation => donation.status === 'Pendiente').length;
  const totalDonations = donations.length;

  return (
    <div>
      <h1>Lista de Donaciones</h1>
      <p>Donaciones recibidas: {donationsReceived}</p>
      <p>Donaciones pendientes: {donationsPending}</p>
      <p>Total de donaciones: {totalDonations}</p>

      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <div>
          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
            Agregar Donación
          </Button>
          <Button variant="outlined">
            Exportar Tabla
          </Button>
        </div>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Buscar..."
          style={{ backgroundColor: 'white' }}
        />
      </Box>

      <DataTable columnas={columnaDonations} datos={donations} numPerPage={8} />
    </div>

  )

}
