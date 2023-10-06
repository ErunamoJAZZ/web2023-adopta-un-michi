'use client';

import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Aquí puedes agregar la lógica para enviar un correo de recuperación de contraseña al usuario
      // Esto puede implicar la generación de un token único y su envío por correo electrónico.

      alert('Instrucciones de recuperación de contraseña enviadas al correo electrónico: ' + email);
      // Redirige al usuario a una página de confirmación o a donde sea necesario
    } catch (error) {
      console.error('Error al enviar las instrucciones de recuperación de contraseña:', error);
      alert('Error al enviar las instrucciones de recuperación de contraseña');
    }
  };

  return (
    <div>
      <h1>Recuperar Contraseña</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Enviar Instrucciones</button>
      </form>
    </div>
  );
};

export default ForgotPassword;