import express, { Router, Request, Response } from 'express';
import nodemailer from 'nodemailer'
import pgPool from './pg';

function getRandToken(length: number)
{
  let token = '';

  const tokenChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = tokenChars.length;

  for(let idx: number = 0; idx < length; idx+=1)
    token += tokenChars[Math.floor(Math.random()*charactersLength)];

  return token;
}

const transporter = nodemailer.createTransport(
  {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: `${process.env.SERVER_MAIL}`,
      pass: `${process.env.SERVER_MAILPASS}`
    }
  });

const router: Router = express.Router();

router.post('/recovery', async (req: Request, res: Response) =>
{
    // Check if there's an entry (user) with the provided mail.
    const result = await pgPool.query("SELECT email FROM michis.user WHERE email = $1 LIMIT 1", [req.body.email]);

    // If user found
    if(result.rowCount === 1)
    {
      const resetToken = getRandToken(15);

      // Insert token
      await pgPool.query(`INSERT INTO michis.user_token (user_id, token, expiration_date) \
      VALUES ( \
      (SELECT id FROM michis.user WHERE email = $1 LIMIT 1),\
      $2, \
      CURRENT_TIMESTAMP + INTERVAL '20 minutes')
      ON CONFLICT ON CONSTRAINT user_token_pkey do update
      SET token = $2, expiration_date = now() + INTERVAL '20 minutes';`, [req.body.email, resetToken]);

      await transporter.sendMail(
        {
          from: `${process.env.SERVER_MAIL}`, // sender address
          to: `${req.body.email}`, // list of receivers
          subject: "Reset your password!", // Subject line
          text: `This is your password reset link: ${process.env.CLIENT_URL}/login/resetPassword/${resetToken}`, // plain text body
          html: `This is your password reset link: ${process.env.CLIENT_URL}/login/resetPassword/${resetToken}`, // html body
        });

        res.status(200).json({resp: "Se ha enviado el correo de recuperacion."});
    }

    else
      res.status(400).json({resp: "Cuenta no registrada."});
  });

// password reset
router.post('/reset/:token', async (req: Request, res: Response) =>
{

  const {newPass, token} = req.body;

  // First remove already expired tokens
  await pgPool.query("DELETE FROM michis.user_token WHERE expiration_date <= CURRENT_TIMESTAMP;");
  const verifyToken = await pgPool.query("SELECT user_id FROM michis.user_token WHERE token = $1 LIMIT 1", [token]);

  if(verifyToken.rowCount === 1)
  {
    const userId = verifyToken.rows[0].user_id;
    await pgPool.query(`UPDATE michis.user \
    SET password_hash = crypt($1, gen_salt('bf'))\
    WHERE michis.user.id = $2`, [newPass, userId]);

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
