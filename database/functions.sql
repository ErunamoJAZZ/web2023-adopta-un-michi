-- Login
CREATE OR REPLACE FUNCTION michis.authenticate(email text, password text)
 RETURNS michis.jwt_token
 LANGUAGE plpgsql
 STRICT SECURITY DEFINER
AS $function$
declare
  the_user michis."user";
begin

  -- Se consulta al usuario del email.
  select u.* into the_user
    from michis."user" u
    where u.email = authenticate.email;

  -- Se comprueba que el password_hash, sí concuerde con el password enviado.
  if the_user.password_hash = crypt(password, the_user.password_hash) then
    return (
      the_user."user_type"::text,
      the_user.id,
      (the_user."user_type" = 'administrator')
    )::michis.jwt_token;
  else
    -- En caso que no, devuelve null
    return null;
  end if;
end;
$function$
;
-- Permiso para que los usuarios externos (rol por defecto), sí puedan loguearse.
GRANT EXECUTE ON FUNCTION michis.authenticate(text, text) TO user_external;


-- Registro
CREATE OR REPLACE FUNCTION michis.register(
  "name" varchar(50),
  last_name varchar(50),
  email text,
  "password" text,
  birth_day date
)
 RETURNS michis."user"
 LANGUAGE plpgsql
 STRICT SECURITY DEFINER
AS $function$
declare
  the_user michis."user";
begin
  -- Se inserta el usuario tal y como llegue, pero se delega la verificación a las reglas del DDL.
  INSERT INTO michis."user"("name", last_name, email, password_hash, "user_type", birth_day
  )VALUES(
    register."name",
    register.last_name,
    register.email,
    crypt(register."password", gen_salt('bf')),
    (case when register.email like '%@unal.edu.co' then 'user_unal' else 'user_external' end)::michis.user_type,
    register.birth_day
  ) RETURNING * INTO the_user;

  -- Retorna el usuario nuevo.
  return the_user;
end;
$function$
;
