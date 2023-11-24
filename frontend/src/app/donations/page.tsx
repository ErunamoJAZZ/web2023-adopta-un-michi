/*
  donation type
    money
      ammount
    food
    medicines

*/

import {
  FormControl, Box, FormLabel, Button, Typography, ButtonGroup, MenuItem, Select,
} from '@mui/material';

const donationStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  '& .donations': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
};

export default function Home() {
  return (
    <main>
      <Box sx={donationStyles}>
        <Typography id="donate-form" variant="h6" component="h2">
          ¿Quieres donarle a los michis?
        </Typography>
        <Typography id="donate-form" component="p">
          Llenando este formulario,
          nos pondremos en contacto contigo para que puedas realizar la donación.
        </Typography>
        <FormControl className="form">
          <Box className="donations">
            <FormLabel>
              ¿Tus ventanas están cerradas o protegidas para que el gato no escape?
            </FormLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Dinero</MenuItem>
              <MenuItem value={20}>Comida</MenuItem>
              <MenuItem value={30}>Medicinas</MenuItem>
            </Select>
          </Box>
        </FormControl>
      </Box>
    </main>
  );
}
