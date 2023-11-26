'use client';

import { gql, useQuery } from '@apollo/client';
import { Perfil, ProfileProps } from '../../components/Perfil';

const query = gql`
  query userPerfil {
    currentUser {
      id
      email
      name
      lastName
      isActive
      createdAt
    }
  }`;

export default function Home() {
  const { loading, error, data } = useQuery(query);

  const pinfo: ProfileProps = {
    correo: 'testmail@mail.com',
    nombre: 'Nombre de prueba',
  };

  return (
    <main>
      <Perfil {...pinfo} />
    </main>
  );
}
