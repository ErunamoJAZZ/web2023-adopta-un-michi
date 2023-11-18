import express, { Request, Response } from 'express';
import { Pool } from 'pg';
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
    secure: true,
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
    const result = await pgPool.query("SELECT email FROM michis.user WHERE email = $1 LIMIT 1", req.body.email);
    if(result.rowCount === 1)
    {
      const reset_token = get_rand_token(15);
      const info = await transporter.sendMail(
        {
          from: `${process.env.SERVER_MAIL}`, // sender address
          to: `${req.body.email}`, // list of receivers
          subject: "Reset your password!", // Subject line
          text: `This is your password reset link: http://localhost:3001/reset/${reset_token}`, // plain text body
          html: "<b>Hello world?</b>", // html body
        });
    }
    
  });

router.post('/reset/:token', async (req: Request, res: Response) => 
{
  const new_pass  = req.body.password;
  const token = req.params.token;

  const pgPool: Pool = require("./index");

  const verify_token = await pgPool.query("SELECT token FROM michis.user WHERE token = $2", [token]);
  if(verify_token.rowCount === 1)
  {
    await pgPool.query("UPDATE michis.user SET password_hash = crypt($1, gen_salt('bf')) WHERE user.token = $2", [new_pass, token]);
    await pgPool.query("UPDATE michis.user SET token = NULL WHERE user.token = $1", [token]);
  }

});
  
module.exports = router;

// reset password
