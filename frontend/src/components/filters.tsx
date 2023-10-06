'use client';

import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button, Typography } from '@mui/material';

const FilterStyles = {
  '& .michisList': {
    display: {
      xs: 'none',
      md: 'block',
    },
    width: '100%',
    maxWidth: 220,
    height: '98vh',
    bgcolor: 'background.paper',
    '& .categoryLabel': {
      padding: '4px 16px',
      color: '#777',
      textTransform: 'capitalize',
    },
  },
  '& .toggleFilterButton': {
    display: {
      xs: 'block',
      md: 'none',
    },
  },
};

const filters = [
  {
    category: 'sex',
    id: 99,
    items: [
      {
        id: 0,
        label: 'female',
      },
      {
        id: 1,
        label: 'male',
      },
    ],
  },
  {
    category: 'age',
    id: 98,
    items: [
      {
        id: 2,
        label: '< 1 año',
      },
      {
        id: 3,
        label: '1 año > x < 7 años',
      },
      {
        id: 4,
        label: '< 7 años',
      },
      {
        id: 5,
        label: 'unknown',
      },
    ],
  },
  {
    category: 'health_state',
    id: 97,
    items: [
      {
        id: 6,
        label: 'excellent',
      },
      {
        id: 7,
        label: 'medium',
      },
      {
        id: 8,
        label: 'poor',
      },
      {
        id: 9,
        label: 'chronic_disease',
      },
      {
        id: 10,
        label: 'older',
      },
      {
        id: 11,
        label: 'unknown',
      },
    ],
  },
];

export default function FilterList() {
  const [checked, setChecked] = useState<number[]>([]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Box sx={FilterStyles}>
      <Button variant="outlined" className="toggleFilterButton">
        Outlined
      </Button>
      <List className="michisList" dense>
        {filters.map((filter) => (
          <>
            <ListItem
              key={filter.id}
              className="categoryLabel"
              disablePadding
            >
              <Typography component="p">{filter.category}</Typography>
            </ListItem>
            {filter.items.map((filterOptions) => (
              <ListItem
                key={filterOptions.id}
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(filterOptions.id)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(filterOptions.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText id={`checkbox-list-label-${filterOptions.id}`} primary={filterOptions.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        ))}
      </List>
    </Box>
  );
}
