import { useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';


const types = [
    'fire',
    'water',
    'ground',
    'flying',
    'electric',
    'normal',
    'fighting',
    'psychic',
    'rock',
    'ice',
    'bug',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy',
  ];

const PokemonSelect = ({ onTypeChange }) => {
    const [pokemonType, setpokemonType] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof pokemonType>) => {
      const {
        target: { value },
      } = event;
      setpokemonType(
        typeof value === 'string' ? value.split(',') : value,
      );
      onTypeChange(value);
    };
  return (
    <FormControl className='w-[10vw] h-[6vh]'>
    <InputLabel className='' id='pokemonType'>Types</InputLabel>
    <MuiSelect 
      className=''
      id='pokemonType'
      multiple
      value={pokemonType}
      onChange={handleChange}
      input={<OutlinedInput label="types" />}
      renderValue={(selected) => selected.join(', ')}
    >
    {types.map((type) => (
      <MenuItem key={type} value={type}>
        <Checkbox checked={pokemonType.indexOf(type) > -1} />
        <ListItemText primary={type} />
        </MenuItem>
    ))}
    </MuiSelect>
    </FormControl>  )
}

export default PokemonSelect
