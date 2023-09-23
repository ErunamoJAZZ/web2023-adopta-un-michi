import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const cardActionsStyles = {
  display: 'flex',
  justifyContent: 'space-around',
  '& button *': {
    margin: '0 0.2rem',
  },
};

export default function MichiCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Michi img"
        height="140"
        image="https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Michi name
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Michi description
        </Typography>
      </CardContent>
      <CardActions sx={cardActionsStyles}>
        <Button size="small">
          <FavoriteBorderIcon />
          Favorito
        </Button>
        <Button size="small">
          <VolunteerActivismIcon />
          Quiero adoptar
        </Button>
      </CardActions>
    </Card>
  );
}
