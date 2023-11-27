'use client';
import * as React from "react";
import { gql, useQuery, useMutation } from '@apollo/client';
import { Box, Button, TextField } from '@mui/material';
import DataTable from '../../../components/adminTable';
import EditForm from '../../../components/editForm';

const query = gql`
query adminUser {
  allUsers {
    nodes {
      id
      name
      lastName
      email
      userType
      isActive
    }
  }
}`;

const updateUser = gql`
mutation updateUser($id: Int!, $input: UserPatch!) {
  updateUserById(input: { id: $id, userPatch: $input }) {
    user {
      name
      lastName
      email
      userType
      isActive
    }
  }
}`;

const deleteUser = gql`
mutation deleteUser($id: Int!) {
  deleteUserById(input: { id: $id }) {
    __typename
  }
}`;

export default function AdminUsers() {

  const { loading, error, data, refetch} = useQuery(query);
  const [editUserData, setEditUserData] = React.useState(null);
  const [doUpdateUser] = useMutation(updateUser);
  const [doDeleteUser] = useMutation(deleteUser);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const usuarios = data.allUsers.nodes;
  const users = usuarios.map((user) => ({
    id: user.id, name: user.name, lastName: user.lastName, email: user.email, userType: user.userType, status: user.isActive ? 'Activo' : 'Inactivo',
  }));

  const columnaUsers = [
    { titulo: 'ID', campo: 'id'},
    { titulo: 'Nombre', campo: 'name'},
    { titulo: 'Apellido', campo: 'lastName'},
    { titulo: 'Email', campo: 'email'},
    { titulo: 'Tipo de Usuario', campo: 'userType'},
    { titulo: 'Estado', campo: 'status'},
  ];

  const usersActive = users.filter((user) => user.status === 'Activo').length;
  const usersInactive = users.filter((user) => user.status === 'Inactivo').length;
  const totalUsers = users.length;

  const userFields = [
    { name: 'name', label: 'Nombre' },
    { name: 'lastName', label: 'Apellido' },
    { name: 'email', label: 'Email' },
    { name: 'userType', label: 'Tipo de Usuario', type: 'select', options: ['USER_UNAL', 'USER_EXTERNAL', 'ADMINISTRATOR'] },
    { name: 'status', label: 'Estado', type: 'select', options: [true, false]},
  ];

  const handleEditUser = (user) => {
    setEditUserData(user);
  };

  const handleSaveEdit = (user) => {
    const inputUser = {'name': user.name, 'lastName': user.lastName, 'email': user.email, 'userType': user.userType, 'isActive': user.status};
    doUpdateUser({ variables: { id: user.id, input: inputUser } }).then(() => {
      refetch();
    });
    setEditUserData(null);
  };

  const handleCancelEdit = () => {
    setEditUserData(null);
  }

  const handleDeleteUser = (user) => {
    doDeleteUser({ variables: { id: user.id } }).then(() => {
      refetch();
    });
  };

// 'isActive': user.status === 'Activo' ? true : false


  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <p>
        Usuarios activos:
        {usersActive}
      </p>
      <p>
        Usuarios inactivos:
        {usersInactive}
      </p>
      <p>
        Total de usuarios:
        {totalUsers}
      </p>
      {editUserData && (
        <EditForm
          initialData={editUserData}
          open={!!editUserData}
          onSave={handleSaveEdit}
          onClose={handleCancelEdit}
          fields={userFields}
        />
      )}

      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <div>
          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
            Agregar Usuario
          </Button>
        </div>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Buscar..."
          style={{ backgroundColor: 'white' }}
        />
      </Box>

      <DataTable columnas={columnaUsers} datos={users} numPerPage={8} 
      onEdit={handleEditUser}
      onDelete={handleDeleteUser} />
    </div>

  );
}
