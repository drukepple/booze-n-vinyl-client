import {TextField} from "@mui/material";
import {useState} from 'react';

type BVTextFieldProps = {
  onEnter: () =>  void,
  initValue?: string,
  stateValue: string,
  stateSetter: (val:string) => void,
}
export default function BVTextField({ onEnter, initValue = '', stateValue, stateSetter}:BVTextFieldProps) {

  // const [val, setVal] = useState(initValue);

  return <TextField size="small"
                    onKeyDown={({ key }) => key === 'Enter' && onEnter()}
    value={stateValue}
    onChange={evt => stateSetter(evt.target.value)} />
}
