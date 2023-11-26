/*
  donation type
    money
      ammount
    food
    medicines

*/

'use client';

import { useState } from 'react';
import {
  FormControl,
  Box,
  FormLabel,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Button,
} from '@mui/material';

const donationStyles = {
  margin: '2rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  '& .donations': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'left',
    width: '20vh',
    '& > label': {
      margin: '15px',
    },
    '& button': {
      marginTop: '10px',
    },
  },
};

export default function Donations() {
  const [moneyState, setMoneyState] = useState(false);
  const [foodState, setFoodState] = useState(false);
  const [medicineState, setMedicineState] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (name === 'Dinero') {
      setMoneyState(!moneyState);
    } else if (name === 'Comida') {
      setFoodState(!foodState);
    } else if (name === 'Medicinas') {
      setMedicineState(!medicineState);
    }
  };

  const sendDonationForm = () => {
    console.log('a');
    // TODO: Conectar con back
  };

  return (
    <main>
      <Box sx={donationStyles}>
        <Typography id="donate-form" variant="h6" component="h2">
          ¿Quieres donarle a los michis?
        </Typography>

        <FormControl className="form">
          <Box className="donations">
            <FormLabel>
              Llenando este formulario,
              nos pondremos en contacto contigo para que puedas realizar la donación.
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={moneyState} onChange={handleChange} name="Dinero" />
                }
                label="Dinero"
              />
              {moneyState
                ? (
                  <>
                    <FormLabel>Cuánto dinero deseas donar?</FormLabel>
                    <TextField id="money-donation" label="Dinero $COP" variant="outlined" type="number" />
                  </>
                )
                : null}
              <FormControlLabel
                control={
                  <Checkbox checked={foodState} onChange={handleChange} name="Comida" />
                }
                label="Comida"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={medicineState} onChange={handleChange} name="Medicinas" />
                }
                label="Medicinas"
              />
              <Button variant="contained" onClick={sendDonationForm} disabled={!(medicineState || foodState || moneyState)}>Enviar</Button>
            </FormGroup>
          </Box>
        </FormControl>
      </Box>
    </main>
  );
}
