import express, { Express, Request, Response , Application } from 'express';
import { postgraphile } from 'postgraphile';
import { Pool } from 'pg';
import dotenv from 'dotenv';

//For env File
dotenv.config();

// To avoid RDS connection errors
const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  application_name: 'michis_postgraphile',
  ssl: {
    rejectUnauthorized: false,
  },
});

const app: Application = express();
const port = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('This is a Postgraphile API. Use the /graphql endpoint to access.');
});

app.use(
  postgraphile(
    pgPool,
    'michis',
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      pgDefaultRole: 'user_external',
      jwtPgTypeIdentifier: 'michis.jwt_token',
      jwtSecret: process.env.POSTGRAPHILE_JWT_SECRET,
      jwtSignOptions: {
        expiresIn: '7 days',
      }
    }
  )
);



app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
