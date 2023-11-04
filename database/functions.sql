-- ToDo:

-- Registro
-- Login
-- Recuperar contraseña
-- ???

CREATE OR REPLACE FUNCTION michis.authenticate(email text, password text)
 RETURNS michis.jwt_token
 LANGUAGE plpgsql
 STRICT SECURITY DEFINER
AS $function$
declare
  the_user michis."user";
begin

  select u.* into the_user
    from michis."user" u
    where u.email = authenticate.email;

    -- crypt(password, gen_salt('bf'))

  if the_user.password_hash = crypt(password, the_user.password_hash) then
    return (
      the_user."user_type"::text,
      the_user.id,
      (the_user."user_type" = 'administrator')
    )::michis.jwt_token;
  else
    return null;
  end if;
end;
$function$
;

GRANT EXECUTE ON FUNCTION michis.authenticate(text, text) TO user_external;


create function michis.current_user_id() returns integer as $$
  select nullif(current_setting('jwt.claims.user_id', true), '')::integer;
$$ language sql stable;

create function michis.current_user_role() returns text as $$
  select nullif(current_setting('jwt.claims.role', true), '')::text;
$$ language sql stable;








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


  INSERT INTO michis."user"("name", last_name, email, password_hash, "user_type", birth_day
  )VALUES(
    register."name",
    register.last_name,
    register.email,
    crypt(register."password", gen_salt('bf')),
    (case when register.email like '%@unal.edu.co' then 'user_unal' else 'user_external' end)::michis.user_type,
    register.birth_day
  ) RETURNING * INTO the_user;


  return the_user;
end;
$function$
;
