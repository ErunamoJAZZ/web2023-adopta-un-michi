import { Box, Button, TextField } from '@mui/material';
import DataTable from '../../../components/adminTable';

export default function AdminCats() {
  const gatos = [
    {
      id: 1, name: 'Whiskers', age: 2, condition: 'Saludable', status: 'Para adoptar',
    },
    {
      id: 2, name: 'Fluffy', age: 4, condition: 'Enfermo', status: 'Adoptado',
    },
    {
      id: 3, name: 'Shadow', age: 3, condition: 'Saludable', status: 'Para adoptar',
    },
    {
      id: 4, name: 'Whiskers', age: 2, condition: 'Saludable', status: 'Para adoptar',
    },
    {
      id: 5, name: 'Fluffy', age: 4, condition: 'Enfermo', status: 'Adoptado',
    },
    {
      id: 6, name: 'Shadow', age: 3, condition: 'Saludable', status: 'Para adoptar',
    },
    {
      id: 7, name: 'Whiskers', age: 2, condition: 'Saludable', status: 'Para adoptar',
    },
    {
      id: 8, name: 'Fluffy', age: 4, condition: 'Enfermo', status: 'Adoptado',
    },
    {
      id: 9, name: 'Shadow', age: 3, condition: 'Saludable', status: 'Para adoptar',
    },
    {
      id: 10, name: 'Whiskers', age: 2, condition: 'Saludable', status: 'Para adoptar',
    },
    {
      id: 11, name: 'Fluffy', age: 4, condition: 'Enfermo', status: 'Adoptado',
    },
    {
      id: 12, name: 'Shadow', age: 3, condition: 'Saludable', status: 'Para adoptar',
    },
  ];

  const columnasGatos = [
    { titulo: 'Nombre', campo: 'name' },
    { titulo: 'Edad', campo: 'age' },
    { titulo: 'Condición', campo: 'condition' },
    { titulo: 'Estado', campo: 'status' },
  ];

  const gatosParaAdoptar = gatos.filter((gato) => gato.status === 'Para adoptar').length;
  const gatosAdoptados = gatos.filter((gato) => gato.status === 'Adoptado').length;
  const totalGatos = gatos.length;

  return (
    <div>
      <h1>Lista de Gatos</h1>
      <p>
        Gatos para adoptar:
        {gatosParaAdoptar}
      </p>
      <p>
        Gatos adoptados:
        {gatosAdoptados}
      </p>
      <p>
        Total de gatos:
        {totalGatos}
      </p>

      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <div>
          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
            Agregar Gato
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

      <DataTable columnas={columnasGatos} datos={gatos} numPerPage={8} />
    </div>

  );
}
