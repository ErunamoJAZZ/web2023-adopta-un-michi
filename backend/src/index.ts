import express, { Express, Request, Response , Application } from 'express';
import { postgraphile } from 'postgraphile';
import dotenv from 'dotenv';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('This is a Postgraphile API. Use the /graphql endpoint to access.');
});


app.use(
  postgraphile(
    process.env.DATABASE_URL,
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
