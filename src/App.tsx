import React from 'react';
import { styled } from '@mui/material/styles';
// import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox, TextField } from '@mui/material';
import CreateCategory from './components/create-category';
import CreateBooze from './components/add-booze';


const Section = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  '& .listIcon': {
    minWidth: 0,
  },
  '& .listcheck': {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

function App() {

  return (
    <div className="App">
    <Section>
        <CreateBooze />
    </Section>
    <CreateCategory />
    </div>
  );
}

export default App;
