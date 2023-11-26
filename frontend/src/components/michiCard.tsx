'use client';

import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Chip,
  CardActions,
  Button,
  Modal,
  FormControl,
  FormLabel,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useState } from 'react';


const cardActionsStyles = {
  display: 'flex',
  justifyContent: 'space-around',
  '& button *': {
    margin: '0 0.2rem',
  },
};

const cardStyles = {
  width: '300px',
  height: '340px',
  '& .nameAndAge': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > div': {
      display: 'flex',
      gap: '0.5rem',
      margin: 0,
    },
  },
  '& .threedots': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  '& .health': {
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.5rem',
  },

};

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '35vh',
  bgcolor: 'background.paper',
  border: '2px solid #333',
  boxShadow: 24,
  p: 4,

  '& .form': {
    '& .question': {
      marginTop: '10px',
      display: 'flex',
      flexDirection: 'column',
      '& label': {
        marginBottom: '10px',
      },
    },
    '& .buttons': {
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'space-around',
    },
  },
};

interface MichiCardProps {
  name: string;
  description: string | null;
  image_url: string | null;
  age: number | null;
  personality: string | null;
  sex: string;
  health_state: string;
  is_available: boolean;
  id: number;
}

export default function MichiCard({
  name,
  description,
  image_url,
  age,
  personality,
  sex,
  health_state,
  is_available,
  id,
}: MichiCardProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sendForm = (catId: number) => {
    console.log(catId);
    // TODO: Conectar con back
  };

  return (
    <Card sx={cardStyles}>
      <CardMedia
        component="img"
        alt={name}
        height="140"
        image={image_url ?? ''}
      />
      <CardContent>
        <Box className="nameAndAge">
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Box>
            {
              sex === 'female'
                ? <FemaleIcon />
                : <MaleIcon />
            }
            <Chip variant="outlined" size="small" label={`${age} años`} />
          </Box>
        </Box>
        <Typography variant="body1" color="text.secondary" className="threedots">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="threedots">
          {personality}
        </Typography>
        <Box className="health">
          <HealthAndSafetyIcon />
          <Typography variant="body2" color="text.secondary">
            {health_state}
          </Typography>
        </Box>
      </CardContent>
      {
        // TODO: puedo marcar como favorito a uno no disponible o no lo debo mostrar?
      }
      <CardActions sx={cardActionsStyles}>
        <Button size="small">
          <FavoriteBorderIcon />
          Favorito
        </Button>
        <Button size="small" disabled={!is_available} onClick={handleOpen}>
          <VolunteerActivismIcon color={is_available ? 'primary' : 'disabled'} />
          {is_available ? 'Quiero adoptar' : 'No disponible'}
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-adopt-form-cats"
          aria-describedby="modal-adopt-form-cats"
        >
          <Box sx={modalStyles}>
            <Typography id="adopt-form-cats" variant="h6" component="h2">
              {`Formulario de adopción para ${name}`}
            </Typography>
            <FormControl className="form">
              <Box className="question">
                <FormLabel>
                  ¿Has tenido gatos antes? ¿Actualmente tienes alguno?
                  ¿Estás familiarizado con los cuidados necesarios para un gato?
                </FormLabel>
                <TextField label="¿Cuidados de gatos?" variant="outlined" />
              </Box>
              <Box className="question">
                <FormLabel>
                  ¿Tus ventanas están cerradas o protegidas para que el gato no escape?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="windows-protected"
                  defaultValue="No"
                  name="radio-buttons-group-windows-protected"
                >
                  <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
              <Box className="question">
                <FormLabel>
                  ¿Tienes otros animales en casa? ¿Qué tipo y cuántos?
                </FormLabel>
                <TextField label="¿Animales en casa?" variant="outlined" />
              </Box>
              <Box className="question">
                <FormLabel>
                  ¿Por qué estás interesado en adoptar un gato?
                </FormLabel>
                <TextField label="¿Interés al adoptar?" variant="outlined" />
              </Box>
              <Box className="buttons">
                <Button variant="contained" onClick={() => sendForm(id)}>Enviar</Button>
                <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
              </Box>
            </FormControl>
          </Box>
        </Modal>
      </CardActions>
    </Card>
  );
}
