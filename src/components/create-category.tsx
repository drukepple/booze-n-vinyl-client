import React, { useState } from 'react';
import {TextField, Button, Checkbox, Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { categories } from '../store/booze';
import { useLoadable } from '../store/use-loadable';
import { postCategory } from '../services/category';

import BVTextField from './ui/text-field';
import styled from '@emotion/styled';




export default function CreateCategory() {

  const [newCategory, setNewCategory] = useState('');


  // const cats = useRecoilValueLoadable(categories);
  const {loading, error, data:cats} = useLoadable<Category[]>(categories);
  const refreshCats = useRecoilRefresher_UNSTABLE(categories);


  const addCategory = () => {
    console.log('add category:', newCategory);
    postCategory(newCategory);
    refreshCats();
  }

  return (
    <div>
      <h2>Add Category</h2>
      <div>
        <TextField size="small" onKeyDown={({key}) => key === 'Enter' && addCategory()} value={newCategory} onChange={evt => setNewCategory(evt.target.value)} />
        <Button variant="contained" onClick={addCategory}>Add Category</Button>
        { loading && <p>Loading...</p>}
        <ul>{ cats?.map(cat => <li key={cat.name}>{cat.name}</li>)}</ul>
      </div>
    </div>
  )
}

