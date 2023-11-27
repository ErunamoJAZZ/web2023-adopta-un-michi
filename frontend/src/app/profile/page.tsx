'use client';

import { gql, useQuery } from '@apollo/client';
import Perfil, { ProfileProps } from '../../components/Perfil';

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

function Home() {
  const { loading, data } = useQuery(query);
  if (loading) { return (<h1> Loading... </h1>); }

  const {
    name, lastName, email, createdAt,
  } = data.currentUser as ProfileProps;

  return (
    <main>
      <Perfil
        name={name}
        lastName={lastName}
        createdAt={new Date(createdAt)}
        email={email}
      />
    </main>
  );
}

export default Home;
