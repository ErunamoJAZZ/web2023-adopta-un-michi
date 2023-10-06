import { Box } from '@mui/material';
import FilterList from '../../components/filters';
import MichiCard from '../../components/michiCard';

import cats from './mockedData';

interface Cat {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  age: number | null;
  personality: string | null;
  sex: string;
  health_state: string;
  is_available: boolean;
  added_at: string;
  updated_at: string | null;
}

const michisInventoryStyles = {
  display: 'flex',
  '& .filterList': {
    position: 'sticky',
    top: '8px',
    marginTop: {
      xs: '1rem',
      sm: '1rem',
      md: '0',
    },
  },
  flexDirection: {
    xs: 'column',
    sm: 'column',
    md: 'row',
  },
  alignItems: {
    xs: 'center',
    sm: 'center',
    md: 'flex-start',
  },
  '& .michisList': {
    display: 'flex',
    listStyle: 'none',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
    padding: 0,
  },
};

export default function Michis() {
  return (
    <main>
      <Box sx={michisInventoryStyles}>
        <Box className="filterList">
          <FilterList />
        </Box>
        <ul className="michisList">
          {cats.cats.map((cat: Cat) => (
            <li key={cat.id}>
              <MichiCard
                name={cat.name}
                description={cat.description}
                image_url={cat.image_url}
                age={cat.age}
                personality={cat.personality}
                sex={cat.sex}
                health_state={cat.health_state}
                is_available={cat.is_available}
              />
            </li>
          ))}
        </ul>
      </Box>
    </main>
  );
}
