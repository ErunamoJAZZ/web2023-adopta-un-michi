import express, { Request, Response , Application } from 'express';
import { postgraphile } from 'postgraphile';
import pgPool from './pg';
import router from './auth';


const app: Application = express();
const port = process.env.PORT || 3001;

const cors = require('cors');

app.use(cors({
  origin: `${process.env.CLIENT_URL}`,
  methods: 'POST',
  credentials: false,
}));
app.use(express.json());
app.use(router);

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

export default pgPool;
