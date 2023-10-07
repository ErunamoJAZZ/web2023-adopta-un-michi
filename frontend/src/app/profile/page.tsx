import { Perfil, ProfileProps } from '../../components/Perfil';

export default function Home() {
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
