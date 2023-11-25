import express, { Router, Request, Response } from 'express';
import nodemailer from 'nodemailer'
import pgPool from './pg';

function getRandToken(length: number)
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
    // Check if there's an entry (user) with the provided mail.
    console.log(req.headers); // Log request headers
    console.log(req.body);    // Log request body
    const result = await pgPool.query("SELECT email FROM michis.user WHERE email = $1 LIMIT 1", [req.body.email]);
    let info;

    // If user found
    if(result.rowCount === 1)
    {
      const reset_token = getRandToken(15);

      // Insert token
      await pgPool.query(`INSERT INTO michis.user_token (user_id, token, expiration_date) \
      VALUES ( \
      (SELECT id FROM michis.user WHERE email = $1 LIMIT 1),\
      $2, \
      CURRENT_TIMESTAMP + INTERVAL '20 minutes')
      ON CONFLICT ON CONSTRAINT user_token_pkey do update
      SET token = $2, expiration_date = now() + INTERVAL '20 minutes';`, [req.body.email, reset_token]);

      info = await transporter.sendMail(
        {
          from: `${process.env.SERVER_MAIL}`, // sender address
          to: `${req.body.email}`, // list of receivers
          subject: "Reset your password!", // Subject line
          text: `This is your password reset link: ${process.env.CLIENT_URL}/login/resetPassword/${reset_token}`, // plain text body
          html: `This is your password reset link: ${process.env.CLIENT_URL}/login/resetPassword/${reset_token}`, // html body
        });

        res.status(200).json({resp: "Se ha enviado el correo de recuperacion."});
    }

    else
      res.status(400).json({resp: "Cuenta no registrada."});
  });

// password reset
router.post('/reset/:token', async (req: Request, res: Response) =>
{

  const new_pass: string = req.body.new_pass;
  const token: string = req.params.token;

  // First remove already expired tokens
  await pgPool.query("DELETE FROM michis.user_token WHERE expiration_date <= CURRENT_TIMESTAMP;");
  const verify_token = await pgPool.query("SELECT user_id FROM michis.user_token WHERE token = $1 LIMIT 1", [token]);

  if(verify_token.rowCount === 1)
  {
    const user_id = verify_token.rows[0].user_id;
    await pgPool.query(`UPDATE michis.user \
    SET password_hash = crypt($1, gen_salt('bf'))\
    WHERE michis.user.id = $2`, [new_pass, user_id]);

    await pgPool.query("DELETE FROM michis.user_token WHERE token = $1", [token]);
    res.status(200).json({resp: "Password reset successfully"});
  }

  else
    res.status(401).json({resp: "Reset token is not valid."});

  /*
    Because we didn't find an user with the provided token, we can assume the token
    was removed from the user token_table (expired)
    Or maybe it didn't even exist in the first place...
    this case might arise from brute forcing attack attempt, it is likely that the token
    has to be longer than 15 characters in order to avoid this.)
  */
});

export default router;
