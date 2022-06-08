import { styled } from '@mui/material/styles';
import './App.css';
import Booze from './components/booze';
import CreateCategory from './components/create-category';
import Vinyl from './components/vinyl/vinyl';


const Section = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: 10,
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
        <Vinyl />
    </Section>
    <Section>
        <Booze />
    </Section>
    <CreateCategory />
    </div>
  );
}

export default App;
