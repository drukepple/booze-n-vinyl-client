import {useState, useEffect} from 'react';
import { Checkbox, FormControl, FormControlLabel, InputLabel, Select, MenuItem, Button } from '@mui/material';
import styled from '@emotion/styled';
import { useLoadable } from '../store/use-loadable';
import { booze, categories } from '../store/booze';
import BVTextField from './ui/text-field';

const FormRow = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}))

type BoozeFormProps = {
  initialBooze: Booze,
  onSubmit: (booze:Booze) => void,
  editMode?: boolean,
}

export default function BoozeForm({initialBooze, onSubmit, editMode=false}:BoozeFormProps) {

  const { loading: catsLoading, data: cats } = useLoadable(categories);

  const [onHand, setOnHand] = useState(typeof initialBooze.onHand !== 'undefined' ? initialBooze.onHand : true);
  const [category, setCategory] = useState(initialBooze.category || '');
  const [name, setName] = useState(initialBooze.name || '');
  const [newBooze, setNewBooze] = useState<Booze>({
    name: '',
    onHand: true,
    category: '',
  })

  useEffect(() => {
    if (!cats) { return; }
    const tmpBooze = {
      ...newBooze,
      category: cats[0]._id,
    }
    setNewBooze(tmpBooze);
  }, [cats]);


  const addBooze = () => {
    onSubmit({
      onHand,
      category,
      name,
    })
  }

  return (
    <FormRow>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
        <Select size="small" value={category} onChange={evt => setCategory(evt.target.value)}>
          <MenuItem value=''>None</MenuItem>
          {cats?.map(cat => <MenuItem key={cat.name} value={cat._id}>{cat.name}</MenuItem>)}
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox checked={onHand} onChange={(evt) => {
            console.log('checked:', evt.target.checked)
            setOnHand(evt.target.checked)
          }
          } />
        }
        label="On Hand"

      />

      <BVTextField stateValue={name} stateSetter={setName} onEnter={addBooze} />
      <Button disabled={name.trim() === ''} variant="contained" onClick={addBooze}>
        {editMode? "Update" : "Add"}
      </Button>
    </FormRow>

  )
}