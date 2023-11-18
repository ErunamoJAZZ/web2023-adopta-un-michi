import express, { Request, Response } from 'express';
import { Pool, Query } from 'pg';
import { Router } from 'express';
import nodemailer from 'nodemailer'

function get_rand_token(length: number) 
{
  let token = '';

  const token_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const characters_length = token_chars.length;
  
  for(let idx: number = 0; idx < length; idx++)
    token += token_chars[Math.floor(Math.random()*characters_length)];

  return token;
}

const transporter = nodemailer.createTransport(
  {
    host: "aspmx.l.google.com",
    port: 25,
    secure: false,
    auth: {
      user: `${process.env.SERVER_MAIL}`,
      pass: `${process.env.SERVER_MAILPASS}`
    }
  });

const router: Router = express.Router();

router.post('/recovery', async (req: Request, res: Response) => 
{
    const pgPool: Pool = require("./index");
    // Check if there's an entry (user) with the provided mail.
    const result = await pgPool.query("SELECT email FROM michis.user WHERE email = $1 LIMIT 1", [req.body.email]);
    let info;

    if(result.rowCount === 1)
    {
      const reset_token = get_rand_token(15);

      // Insert token
      await pgPool.query(`INSERT INTO michis.user_token (user_id, token, expiration_date) \
      VALUES ( \
      (SELECT user_id FROM michis.user WHERE email = $1 LIMIT 1),\
      $2, \
      CURRENT_TIMESTAMP + INTERVAL '20 minutes');`, [req.body.email, reset_token]);

      info = await transporter.sendMail(
        {
          from: `${process.env.SERVER_MAIL}`, // sender address
          to: `${req.body.email}`, // list of receivers
          subject: "Reset your password!", // Subject line
          text: `TF is this field for?`, // plain text body
          html: `This is your password reset link: http://localhost:3001/reset/${reset_token}`, // html body
        });
    }

    res.send(info?.accepted ?? '0');
  });

router.post('/reset/:token', async (req: Request, res: Response) => 
{
  const new_pass  = req.body.password;
  const token = req.params.token;

  const pgPool: Pool = require("./index");

  // First remove already expired tokens
  await pgPool.query("DELETE FROM michis.user_token WHERE expiration_date <= CURRENT_TIMESTAMP;");
  const verify_token = await pgPool.query("SELECT token FROM michis.user_token WHERE token = $2 LIMIT 1", [token]);

  if(verify_token.rowCount === 1)
  {
    await pgPool.query("UPDATE michis.user \
    SET password_hash = crypt($1, gen_salt('bf'))\
    WHERE michis.user.id = (SELECT user_id FROM michis.user_token WHERE token = $2 LIMIT 1)", [new_pass, token]);
    await pgPool.query("DELETE FROM michis.user_token WHERE user.token = $1", [token]);
  }

});
  
module.exports = router;

// reset password
