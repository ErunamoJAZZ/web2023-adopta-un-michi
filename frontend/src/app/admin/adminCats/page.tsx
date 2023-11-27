'use client';
import * as React from "react";
import { gql, useQuery, useMutation } from '@apollo/client';
import { Box, Button, TextField } from '@mui/material';
import DataTable from '../../../components/adminTable';
import EditForm from '../../../components/editForm';

const query = gql`
query adminCat {
  allCats {
    nodes {
      id
      name
      age
      healthState
      isAvailable
    }
  }
  HealthStateOptions: __type(name: "HealthState") {
    name
    enumValues {
      name
    }
  }
}`;
// mutation addCat {
//   createCat(
//     input: {cat: {name: "Test", isAvailable: false, healthState: EXCELLENT, age: 1.5}}
//   ){
//     clientMutationId
//   }
// }

const addCat = gql`
mutation addCat($input: CatInput!) {
  createCat(input: {cat: $input}) {
    cat {
      id
    }
  }
}`;

const updateCat = gql`
mutation updateCat($id: Int!, $input: CatPatch!) {
  updateCatById(input: { id: $id, catPatch: $input }) {
    cat {
      name
      age
      healthState
      isAvailable
    }
  }
}`;

const deleteCat = gql`
mutation deleteCat($id: Int!) {
  deleteCatById(input: { id: $id }) {
    __typename
  }
}`;


export default function AdminCats() {
  const { loading, error, data, refetch} = useQuery(query);
  const [editCatData, setEditCatData] = React.useState(null);
  const [showAddCatForm, setShowAddCatForm] = React.useState(false);
  const [doAddCat] = useMutation(addCat);
  const [doUpdateCat] = useMutation(updateCat);
  const [doDeleteCat] = useMutation(deleteCat);


  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const cats = data.allCats.nodes;

  const gatos = cats.map((cat) => ({
    id: cat.id, name: cat.name, age: cat.age, condition: cat.healthState, status: cat.isAvailable ? 'Para adoptar' : 'Adoptado', 
  }));

  const columnasGatos = [
    { titulo: 'ID', campo: 'id'},
    { titulo: 'Nombre', campo: 'name'},
    { titulo: 'Edad', campo: 'age'},
    { titulo: 'Condición', campo: 'condition'},
    { titulo: 'Estado', campo: 'status'},
  ];

  const gatosParaAdoptar = gatos.filter((gato) => gato.status === 'Para adoptar').length;
  const gatosAdoptados = gatos.filter((gato) => gato.status === 'Adoptado').length;
  const totalGatos = gatos.length;

  const catFields = [
    { name: 'name', label: 'Nombre' },
    { name: 'age', label: 'Edad' },
    { name: 'healthState', label: 'Estado de Salud', type: 'select', options: data.HealthStateOptions.enumValues.map((option) => option.name)},
    { name: 'isAvailable', label: 'Disponible para Adopción', type: 'select', options: [true, false]},
  ];

  const handleShowAddCatForm = () => {
    setShowAddCatForm(true);
  };

  const handleSaveNewCat = (newCat) => {
    newCat.age = parseInt(newCat.age);
    doAddCat({ variables: { input: newCat } })
      .then(() => {
        refetch(); // Refrescar los datos
      });
    setShowAddCatForm(false); // Cerrar el formulario
  };

  const handleEdit = (cat) => {
    setEditCatData(cat);
  };

  const handleSaveEdit = (cat) => {
    const inputCat = {'name': cat.name, 'age': cat.age, 'healthState': cat.healthState, 'isAvailable': cat.isAvailable}; 
    doUpdateCat({ variables: { id: cat.id, input: inputCat} }).then(() => {
      refetch();
    }
  );
    setEditCatData(null);
  }

  const handleCancelEdit = () => {
    setEditCatData(null);
  }

  const handleDelete = (cat) => {
    doDeleteCat({ variables: { id: cat.id} }).then(() => {
      refetch();
    }
  )};



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
      {showAddCatForm && (
      <EditForm
      initialData={{ name: '', age: 0, healthState: '', isAvailable: false}}
      open={showAddCatForm}
      onSave={handleSaveNewCat}
      onClose={() => setShowAddCatForm(false)}
      fields={catFields}
      />
      )}
      {editCatData && (
        <EditForm
          initialData={editCatData}
          open={Boolean(editCatData)}
          onSave={handleSaveEdit}
          onClose={handleCancelEdit}
          fields={catFields}
        />
      )}
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <div>
          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}  onClick={handleShowAddCatForm}>
            Agregar Gato
          </Button>
        </div>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Buscar..."
          style={{ backgroundColor: 'white' }}
        />
      </Box>

      <DataTable 
      columnas={columnasGatos} 
      datos={gatos} 
      numPerPage={8}
      onEdit={handleEdit}
      onDelete={handleDelete}
      />
    </div>

  );
}
