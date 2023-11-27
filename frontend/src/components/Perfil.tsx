'use client';

import { useState } from 'react';
import {
  Avatar, Button, TextField,
} from '@mui/material';

export interface ProfileProps {
  name: string,
  lastName: string
  email: string
  createdAt: Date
}

function Perfil({
  name, lastName, email, createdAt,
}: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);

  const nameI = name[0].toUpperCase();
  const lastNameI = lastName[0].toUpperCase();

  return (
    <div style={{ position: 'absolute', left: '42%', top: '15%' }}>
      <Avatar
        sx={{
          width: 150, height: 150, fontSize: 40, textAlign: 'justify', left: '20%',
        }}
      >
        {`${nameI + lastNameI}`}
      </Avatar>
      {isEditing ? (
        <>
          <div>
            <TextField size="small" fullWidth margin="normal" label="Nombre" defaultValue={name} sx={{ display: 'block', padding: '5px' }} />
            <TextField size="small" fullWidth margin="normal" label="Apellido" defaultValue={lastName} sx={{ display: 'block', padding: '5px' }} />
            <TextField size="small" fullWidth margin="normal" label="Email" defaultValue={email} sx={{ display: 'block', padding: '5px' }} />
            <TextField size="small" fullWidth margin="normal" label="Fecha de creacion" defaultValue={createdAt} sx={{ display: 'block', padding: '5px' }} />
          </div>
          <Button onClick={() => setIsEditing(false)}> Guardar </Button>
        </>
      ) : (
        <Button style={{ position: 'relative', left: '48%' }} onClick={() => setIsEditing(true)}> Editar </Button>
      )}

    </div>

  );
}

export default Perfil;
