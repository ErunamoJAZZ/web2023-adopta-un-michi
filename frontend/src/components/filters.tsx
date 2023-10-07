'use client';

import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {
  Box, Button, Drawer, Typography,
} from '@mui/material';

const drawerWidth = 240;

const FilterStyles = {
  width: { sm: `calc(100% - ${drawerWidth}px)` },
  '& .MuiDrawer-paper': {
    position: {
      xs: 'fixed',
      sm: 'fixed',
      md: 'sticky',
    },
  },
  '& .michisList': {
    width: '100%',
    maxWidth: 220,
    height: '98vh',
    bgcolor: 'background.paper',
    display: 'flex',
    justifyContent: 'flex-start',
    '& .categoryLabel': {
      padding: '4px 16px',
      color: '#777',
      textTransform: 'capitalize',
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCheckboxToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const MichisList = (
    <List className="michisList" dense>
      {filters.map((filter) => (
        <Box key={filter.id}>
          <ListItem
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
              <ListItemButton
                role={undefined}
                onClick={handleCheckboxToggle(filterOptions.id)}
                dense
              >
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
        </Box>
      ))}
    </List>
  );

  return (
    <Box sx={FilterStyles}>

      <Button
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { md: 'none' } }}
        variant="contained"
        className="toggleFilterButton"
      >
        Filtros
      </Button>
      <Drawer
        anchor="top"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'fixed', sm: 'fixed', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: { xs: '60%', sm: '40%' },
            left: { xs: '20%', sm: '30%' },
            padding: '0 1rem 0.5rem ',
          },
        }}
      >
        {MichisList}
        <Button
          variant="outlined"
          onClick={handleDrawerToggle}
        >
          Aplicar filtros
        </Button>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
        open
      >
        {MichisList}
      </Drawer>
    </Box>
  );
}
