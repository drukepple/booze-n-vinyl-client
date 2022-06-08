import { useEffect, useState } from 'react';
import { Button, TextField, FormControl, InputLabel, FormControlLabel, Checkbox, Select, MenuItem, Autocomplete, AutocompleteRenderGroupParams, Paper } from '@mui/material';
import styled from '@emotion/styled';
import { atom, RecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { booze, boozeById, categoriesById } from '../../store/booze';
import { genres } from '../../store/vinyl';
import { useLoadable } from '../../store/use-loadable';


const sideAIngredients = atom<string[]>({
  key: "ingredients/side-a",
  default: [],
})
const sideBIngredients = atom<string[]>({
  key: "ingredients/side-b",
  default: [],
})

const FormRow = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 10,
}))

type VinylFormProps = {
  initVinyl?: Vinyl,
  editMode?:boolean,
  onSubmit:(vinyl:Vinyl) => void,
}
export default function VinylForm(props:VinylFormProps) {
  const {
    editMode = false,
    onSubmit,
    initVinyl = {
      artist: '',
      album: '',
      onHand: false,
      genre: 'Rock',
      year: 1999,
      page: 1,
      ingredientsA: [],
      ingredientsB: [],
    }
  } = props;

  const genreList = useRecoilValue(genres);

  const [artist, setArtist] = useState(initVinyl.artist);
  const [album, setAlbum] = useState(initVinyl.album);
  const [onHand, setOnHand] = useState(initVinyl.onHand);
  const [genre, setGenre] = useState(initVinyl.genre);
  const [year, setYear] = useState(initVinyl.year);
  const [page, setPage] = useState(initVinyl.page);
  const [ingredientsA, setIngA] = useRecoilState(sideAIngredients);
  const [ingredientsB, setIngB] = useRecoilState(sideBIngredients);

  useEffect(() => {
    setIngA(initVinyl.ingredientsA);
    setIngB(initVinyl.ingredientsB);
  }, []);

  const submit = () => {
    console.log('submit', ingredientsA, ingredientsB);
    onSubmit({
      artist,
      album,
      onHand,
      genre,
      year,
      page,
      ingredientsA,
      ingredientsB,
    })
  }

  return (
    <div>
      <FormRow>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Artist</InputLabel>
          <TextField size="small" value={artist} onChange={evt => setArtist(evt.target.value)} />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Album</InputLabel>
          <TextField size="small" value={album} onChange={evt => setAlbum(evt.target.value)} />
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox checked={onHand} onChange={(evt) => {
              console.log('checked:', evt.target.checked)
              setOnHand(evt.target.checked)
            }} />
          }
          label="On Hand"
        />
      </FormRow>

      <FormRow>
        <Select value={genre} onChange={evt => setGenre(evt.target.value)} >
          {genreList.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}
        </Select>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <TextField size="small" value={year} onChange={evt => setYear(parseInt(evt.target.value))} />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Page</InputLabel>
          <TextField size="small" value={page} onChange={evt => {
            setPage(parseInt(evt.target.value) || 1)
          }} />
        </FormControl>
      </FormRow>

      <FormRow>
        <IngredientSelect label="Side A Ingredients" atom={sideAIngredients} />
      </FormRow>
      <FormRow>
        <IngredientSelect label="Side B Ingredients" atom={sideBIngredients} />
      </FormRow>
      <FormRow>

        <Button onClick={submit} variant="contained">{editMode ? "Update" : "Add"}</Button>
      </FormRow>
    </div>
  )
}

type IngredientSelectProps = {
  label:string,
  atom:RecoilState<string[]>,
}
const IngredientSelect = ({label, atom}:IngredientSelectProps) => {
  const {data:ingredients} = useLoadable(booze);
  const [sortedIngreds, setSortedIngreds] = useState<MongoBooze[]>([]);
  const [value, setValue] = useRecoilState(atom);
  const { data: boozeMap } = useLoadable(boozeById);
  const { data: categoryMap } = useLoadable(categoriesById);

  const sortIngs = (a:Booze, b:Booze) => {
    if (a.category < b.category) { return -1; }
    if (a.category > b.category) { return 1; }
    return 0;
  }
  useEffect(() => {
    if (!ingredients) { return; }
    const tmp = ingredients.concat().sort(sortIngs);
    setSortedIngreds(tmp);
  }, [ingredients]);

  return (
    <Autocomplete options={sortedIngreds}
                  getOptionLabel={opt => opt.name}
                  groupBy={(opt) => categoryMap ? categoryMap[opt.category].name : ''}
                  isOptionEqualToValue={(opt, val) => opt._id === val._id}
                  renderInput={(params) => <TextField {...params} label={label} />}
                  multiple
                  // To style the group label, we have to affect the Paper that it's actaully in.
                  // Putting this `sx` directly on Autocomplete has no effect.
                  componentsProps={{
                    paper: { sx: {"& .MuiAutocomplete-groupLabel":{backgroundColor: '#f5f5f5'}}}
                  }}
                  sx={{ minWidth: 530}}
                  value={boozeMap ? value.map(id => boozeMap[id]) : []}
                  onChange={(event, newValue) => {
                    console.log(newValue);
                    setValue(newValue.map(x => x._id));
                  }}
      />
  )
}