import {useState} from 'react';
import { useRecoilRefresher_UNSTABLE } from 'recoil';

import { postVinyl } from "../../services/vinyl";
import { vinyl as vinylSelector } from '../../store/vinyl';
import VinylForm from "./vinyl-form";


const textEditInput = {
  artist: 'Genesis',
  album: 'Trick of the Tail',
  onHand: true,
  ingredientsA: [
    '629b93ac35bca1f4cff5db03',
    '629b94af35bca1f4cff5db0c',
  ],
  ingredientsB: [
    '629b943435bca1f4cff5db05',
    '629b938b35bca1f4cff5db02',
  ],
}

export default function CreateVinyl() {

  const [loading, setLoading] = useState(false);
  const refreshVinyl = useRecoilRefresher_UNSTABLE(vinylSelector)

  const addVinyl = async (vinyl:Vinyl) => {
    console.log(vinyl);
    setLoading(true)
    // vinyl.ingredientsA = vinyl.ingredientsA.map(ing => ing._id);
    // vinyl.ingredientsB = vinyl.ingredientsB.map(ing => ing._id);
    const result = await postVinyl(vinyl);
    console.log(result);
    refreshVinyl();
    setLoading(false);
  }

  return (
    <div>
      <h2>Add Vinyl</h2>
      <div>
        {loading
          ? <p>loading...</p>
          :
          <VinylForm onSubmit={addVinyl} />
        }
      </div>
    </div>
  );
}

/*
{ _id: '629b938b35bca1f4cff5db02', name: 'Tequila', onHand: true, category: '62963eea8948c55ff909bcd5' }
{ _id: '629b93ac35bca1f4cff5db03', name: 'Mezcal', onHand: true, category: '62963eea8948c55ff909bcd5' }
{ _id: '629b93f435bca1f4cff5db04', name: 'Rum', onHand: true, category: '62963eea8948c55ff909bcd5' }
{ _id: '629b943435bca1f4cff5db05', name: 'Dark Rum', onHand: true, category: '62963eea8948c55ff909bcd5' }
{ _id: '629b94af35bca1f4cff5db0c', name: 'Rye Whiskey', onHand: true, category: '62963eea8948c55ff909bcd5' }
*/