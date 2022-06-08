import {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { List, ListItem, ListItemIcon, ListItemText, Checkbox, Button, Tooltip, IconButton, Dialog, DialogContent, DialogActions} from '@mui/material';
import {useLoadable} from '../store/use-loadable';
import { booze as boozeSel, categories } from '../store/booze';
import { deleteBooze, patchBooze, postBooze } from '../services/booze';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import BoozeForm from './booze-form';


// @ts-ignore
const ColumnList = styled(({children, ...props}) => (
  <List {...props}>{children}</List>
))(() => ({
  // columnCount: 5,
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  height: 900,
  '& li': {
    width: '33%',
  },
  // width: '100%',
  '@media (min-width: 600px)': {
    height: 700,
    '& li': {
      width: '25%',
    }
  },
  '@media (min-width: 1000px)': {
    height: 600,
    '& li': {
      width: '20%',
    }
  },
  '@media (min-width: 1200px)': {
    height: 500,
    '& li': {
      width: '16%',
    }
  },
}))

export default function Booze() {
  const { loading:catsLoading, data: cats } = useLoadable(categories);
  const { loading, data: boozes } = useLoadable<MongoBooze[]>(boozeSel);
  const refreshBooze = useRecoilRefresher_UNSTABLE(boozeSel);

  // const [onHand, setOnHand] = useState(true);
  // const [newBoozeCat, setNewBoozeCat] = useState('');
  // const [boozeName, setBoozeName] = useState('');

  // useEffect(() => {
  //   if (!cats) { return; }
  //   setNewBoozeCat(cats[0]._id);
  // }, [cats]);

  const addBooze = async (booze:Booze) => {
    console.log('add booze', booze);
    const newBooze = await postBooze(booze);
    console.log('newBooze:', newBooze);
    // refresh booze list
    refreshBooze();
  }

  return (
    <div>

      <h1>Booze</h1>
      {loading && <p>Booze loading...</p>}
      <ColumnList dense={true}>
        {boozes?.map(booze => <BoozeItem key={booze._id} booze={booze} />)}
      </ColumnList>

      <BoozeForm initialBooze={{onHand:true, name:'', category: ''}} onSubmit={addBooze} />

      <h2>Add Ingredient</h2>
    </div>
  )

}


const BoozeItem = ({booze}:{booze:MongoBooze}) => {

  const [hovering, setHovering] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [editing, setEditing] = useState(false);
  // const catsById = useRecoilValue(categoriesById);
  const { loading: catsLoading, data: cats } = useLoadable(categories);
  const [category, setCategory] = useState('');


  const boozeHover = () => {
    if (category === '') {
      const cat = cats?.filter(c => c._id === booze.category)[0] || {name:'No category set'};
      console.log(cat.name);
      setCategory(cat.name);
    }
    setHovering(true);
  }
  const boozeExit = () => {
    setHovering(false);
  }

  const refreshBooze = useRecoilRefresher_UNSTABLE(boozeSel);
  const changeOnHand = async() => {
    setUpdating(true);
    console.log('cahnging on hand')
    await patchBooze(booze._id, {...booze, onHand: !booze.onHand});
    setUpdating(false);
    refreshBooze();
  }
  const boozeDelete = async () => {
    console.log('edlete', booze);
    await deleteBooze(booze._id);
    refreshBooze();
  }
  const boozeEdit = () => {
    setEditing(true);
    console.log('edit', booze);
  }
  const submitEdit = async (boozeEdit:Booze) => {
    setEditing(false);
    console.log('edit', boozeEdit)
    await patchBooze(booze._id, boozeEdit);
    refreshBooze();
  }

  return (
    <>
      <Tooltip title={category} placement="top-start" arrow componentsProps={{ tooltip: { sx: { marginBottom: '0 !important' } }}}>
        <ListItem key={booze.name}
            onMouseEnter={boozeHover}
            onMouseLeave={boozeExit}
            // sx={{ width: '25%' }}
            secondaryAction={hovering && <>
              <IconButton edge="end" onClick={boozeEdit} disabled={updating}><EditOutlined /></IconButton>
              <IconButton edge="end" onClick={boozeDelete} disabled={updating}><DeleteOutline /></IconButton>
            </>}
            disablePadding>
          <ListItemIcon className='listIcon'>
            <Checkbox
              disabled={updating}
              className="listcheck"
              edge="start"
              checked={booze.onHand}
              onChange={changeOnHand}
              size="small"
              tabIndex={-1}
              disableRipple
              />
          </ListItemIcon>
          <ListItemText primary={booze.name} />
        </ListItem>
      </Tooltip>
      <Dialog open={editing}>
        <DialogContent><BoozeForm initialBooze={booze} onSubmit={submitEdit} editMode /></DialogContent>
        <DialogActions><Button onClick={() => setEditing(false)}>Cancel</Button></DialogActions>
      </Dialog>
    </>
  )
}