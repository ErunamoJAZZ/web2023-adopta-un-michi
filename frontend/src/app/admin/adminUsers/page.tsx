import { Box, Button, TextField, } from '@mui/material';
import DataTable from '../../../components/adminTable';

export default function AdminUsers() {
  const columnaUsers = [ 
    { titulo: 'Nombre', campo: 'name' },
    { titulo: 'Correo', campo: 'email' },
    { titulo: 'Rol', campo: 'role' },
    { titulo: 'Estado', campo: 'status'},
  ];                              

  const users = [
    { name: 'Carlos Pérez', email: 'carlos.perez@example.com', role: 'Administrador', status: 'Activo' },
    { name: 'Marta García', email: 'marta.garcia@example.com', role: 'Usuario', status: 'Activo' },
    { name: 'Juan Rodríguez', email: 'juan.rodriguez@example.com', role: 'Editor', status: 'Inactivo' },
    { name: 'Ana Ramírez', email: 'ana.ramirez@example.com', role: 'Usuario', status: 'Activo' },
    { name: 'Luisa Morales', email: 'luisa.morales@example.com', role: 'Administrador', status: 'Activo' },
    { name: 'Diego Ortega', email: 'diego.ortega@example.com', role: 'Usuario', status: 'Activo' },
    { name: 'Lucía Guzmán', email: 'lucia.guzman@example.com', role: 'Editor', status: 'Activo' },
    { name: 'Mario Castillo', email: 'mario.castillo@example.com', role: 'Usuario', status: 'Inactivo' },
    { name: 'Sofía Peña', email: 'sofia.pena@example.com', role: 'Administrador', status: 'Activo' },
    { name: 'José Mendoza', email: 'jose.mendoza@example.com', role: 'Usuario', status: 'Activo' },
  ];

  const usersActive = users.filter(user => user.status === 'Activo').length;
  const usersInactive = users.filter(user => user.status === 'Inactivo').length;
  const totalUsers = users.length;

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <p>Usuarios activos: {usersActive}</p>
      <p>Usuarios inactivos: {usersInactive}</p>
      <p>Total de usuarios: {totalUsers}</p>

      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <div>
          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
            Agregar Usuario
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

      <DataTable columnas={columnaUsers} datos={users} numPerPage={8} />
    </div>

  )

}
