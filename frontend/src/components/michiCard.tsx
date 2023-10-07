import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

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

interface MichiCardProps {
  name: string;
  description: string | null;
  image_url: string | null;
  age: number | null;
  personality: string | null;
  sex: string;
  health_state: string;
  is_available: boolean;
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
}: MichiCardProps) {
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
        <Button size="small" disabled={!is_available}>
          <VolunteerActivismIcon color={is_available ? 'primary' : 'disabled'} />
          {is_available ? 'Quiero adoptar' : 'No disponible' }
        </Button>
      </CardActions>
    </Card>
  );
}
