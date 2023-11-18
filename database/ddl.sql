create database michis;

-- Esta extensión es mejor desde el schema public
create extension pgcrypto;

CREATE SCHEMA IF NOT EXISTS michis;

DROP ROLE IF EXISTS "administrator";
DROP ROLE IF EXISTS "user_external";
DROP ROLE IF EXISTS "user_unal";

create role "administrator";
create role "user_external";
create role "user_unal";

CREATE TYPE michis.donation_type AS ENUM (
  'money',
  'food',
  'medicines'
);

CREATE TYPE michis.user_type AS ENUM (
  'administrator',
  'user_external',
  'user_unal'
);


CREATE TYPE michis.health_state AS ENUM (
  'excellent',
  'medium',
  'poor',
  'chronic_disease',
  'older',
  'unknown'
);

CREATE TYPE michis.sex_type AS ENUM (
  'male',
  'female',
  'unknown'
);

CREATE TABLE michis.cat (
  id serial4 NOT NULL,
  "name" varchar(50) NOT NULL,
  description text NULL,
  image_url text NULL,
  age float NULL,
  personality text NULL,
  sex michis.sex_type NOT NULL DEFAULT 'unknown',
  health_state michis.health_state NOT NULL DEFAULT 'unknown',
  is_available bool NOT NULL DEFAULT true,
  added_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NULL,
  CONSTRAINT cat_pk PRIMARY KEY (id)
);

COMMENT ON COLUMN michis.cat.id IS 'Primary key';
COMMENT ON COLUMN michis.cat."name" IS 'Cat Name';
COMMENT ON COLUMN michis.cat.description IS 'The most complete description of this cat';
COMMENT ON COLUMN michis.cat.image_url IS 'A url of a cute picture of this cat';
COMMENT ON COLUMN michis.cat.age IS 'Cat age in years (can be 0.5yo)';
COMMENT ON COLUMN michis.cat.personality IS 'A complete description of this cat personality';
COMMENT ON COLUMN michis.cat.sex IS 'Biological sex';
COMMENT ON COLUMN michis.cat.health_state IS 'Current health state of this cat';
COMMENT ON COLUMN michis.cat.is_available IS 'Flag to know if this cat is available yet';
COMMENT ON COLUMN michis.cat.added_at IS 'Timestamptz when cat was added';
COMMENT ON COLUMN michis.cat.updated_at IS 'Timestamptz when cat was updated';


CREATE TABLE michis."user" (
  id serial4 NOT NULL,
  "name" varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  email text NOT NULL,
  "password_hash" text NOT NULL,
  "user_type" michis."user_type" NOT NULL,
  birth_day date NULL,
  is_active bool NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NULL,
  CONSTRAINT email_ck CHECK (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
  CONSTRAINT user_pk PRIMARY KEY (id),
	CONSTRAINT user_un UNIQUE (email)
);

COMMENT ON COLUMN michis."user".id IS 'Primary key';
COMMENT ON COLUMN michis."user"."name" IS 'User name';
COMMENT ON COLUMN michis."user".last_name IS 'User last name';
COMMENT ON COLUMN michis."user".email IS 'user email';
COMMENT ON COLUMN michis."user"."password_hash" IS '@omit
user password stored using Bcrypt';
COMMENT ON COLUMN michis."user"."user_type" IS 'User type (admin or user)';
COMMENT ON COLUMN michis."user".birth_day IS '@omit
To calculate the current age';
COMMENT ON COLUMN michis."user".is_active IS 'To know if this user can be active. False means banned';
COMMENT ON COLUMN michis."user".created_at IS 'Timestamptz when user was created';
COMMENT ON COLUMN michis."user".updated_at IS 'Timestamptz when user was updated';


CREATE TABLE michis.donation (
  id serial4 NOT NULL,
  user_id int4 NOT NULL,
  ts timestamptz NOT NULL DEFAULT now(),
  "type" michis.donation_type NOT NULL,
  amount numeric(10, 2) NULL,
  CONSTRAINT donation_pk PRIMARY KEY (id),
  CONSTRAINT donation_fk FOREIGN KEY (id) REFERENCES michis."user"(id) ON DELETE RESTRICT
);

COMMENT ON COLUMN michis.donation.id IS 'Primary key';
COMMENT ON COLUMN michis.donation.user_id IS 'Foreign key to user';
COMMENT ON COLUMN michis.donation.ts IS 'Timestamptz when this donation was made';
COMMENT ON COLUMN michis.donation."type" IS 'Donation type';
COMMENT ON COLUMN michis.donation.amount IS 'Donation amount in COP.';


CREATE TABLE michis.usercat_interest (
  user_id int4 NOT NULL,
  cat_id int4 NOT NULL,
  reason text NOT NULL,
  ts timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT usercat_interest_pk PRIMARY KEY (user_id, cat_id),
  CONSTRAINT usercat_interest_fk FOREIGN KEY (user_id) REFERENCES michis."user"(id),
  CONSTRAINT usercat_interest_fk_1 FOREIGN KEY (cat_id) REFERENCES michis.cat(id)
);

COMMENT ON COLUMN michis.usercat_interest.user_id IS 'Foreign key to user';
COMMENT ON COLUMN michis.usercat_interest.cat_id IS 'Foreign key to cat';
COMMENT ON COLUMN michis.usercat_interest.reason IS 'Reasons why this user wants adopt this cat';
COMMENT ON COLUMN michis.usercat_interest.ts IS 'Timestamptz when this request was made';


CREATE TABLE michis.usercat_like (
  user_id int4 NOT NULL,
  cat_id int4 NOT NULL,
  ts timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT usercat_like_pk PRIMARY KEY (user_id, cat_id),
  CONSTRAINT usercat_like_fk FOREIGN KEY (user_id) REFERENCES michis."user"(id),
  CONSTRAINT usercat_like_fk_1 FOREIGN KEY (cat_id) REFERENCES michis.cat(id)
);

COMMENT ON COLUMN michis.usercat_like.user_id IS 'Foreign key to user';
COMMENT ON COLUMN michis.usercat_like.cat_id IS 'Foreign key to cat';
COMMENT ON COLUMN michis.usercat_like.ts IS 'Timestamptz when this like was made';

CREATE TABLE michis.user_token (
    user_id INT PRIMARY KEY REFERENCES michis.user(id),
    token VARCHAR(15),
    expiration_date TIMESTAMP
);

COMMENT ON COLUMN michis.user_token.user_id IS 'Foreign key to user';
COMMENT ON COLUMN michis.user_token.token IS 'Unique token used for password resetting';
COMMENT ON COLUMN michis.user_token.expiration_date IS 'Expiration date for the token of the previous column';

-- Type especial para el JWT de postgraphile.
-- DROP TYPE michis.jwt_token cascade;
CREATE TYPE michis.jwt_token AS (
  "role" text,
  user_id int4,
  is_admin bool
);

--Grants generales para las tablas y los usuarios.
GRANT USAGE ON SCHEMA michis TO administrator;
GRANT USAGE ON SCHEMA michis TO user_external;
GRANT USAGE ON SCHEMA michis TO user_unal;

GRANT INSERT, SELECT, UPDATE ON TABLE michis."user" TO user_unal;
GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE michis."user" TO administrator;

GRANT SELECT ON TABLE michis."cat" TO user_unal;
GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE michis."cat" TO administrator;

GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE michis.donation TO administrator;
GRANT INSERT, SELECT ON TABLE michis.donation TO user_external;
GRANT INSERT, SELECT ON TABLE michis.donation TO user_unal;

GRANT SELECT, UPDATE ON TABLE michis.usercat_interest TO administrator;
GRANT INSERT, SELECT, UPDATE ON TABLE michis.usercat_interest TO user_unal;

GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE michis.usercat_like TO user_unal;
GRANT SELECT ON TABLE michis.usercat_like TO user_external;
GRANT SELECT, UPDATE, DELETE ON TABLE michis.usercat_like TO administrator;


-- Funciones auxiliares
create function michis.current_user_id() returns integer as $$
  select nullif(current_setting('jwt.claims.user_id', true), '')::integer;
$$ language sql stable;

create function michis.current_user_role() returns text as $$
  select nullif(current_setting('jwt.claims.role', true), '')::text;
$$ language sql stable;


-- Row Level Security
ALTER TABLE michis."user" ENABLE ROW LEVEL SECURITY;

-- Política para que un usuario solo pueda modificarse a sí mismo.
CREATE POLICY own_user ON michis."user"
  AS PERMISSIVE
  FOR UPDATE
  USING ((id = michis.current_user_id()))
  WITH CHECK ((id = michis.current_user_id()));

-- Política para que cualquier usuario pueda consultar a los demás.
CREATE POLICY any_select_user ON michis."user"
  AS PERMISSIVE
  FOR SELECT
  USING (true);
