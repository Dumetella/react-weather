import { IconButton, InputBase, Paper } from "@mui/material";
import { Search } from '@mui/icons-material';
import React, { useState } from "react";
import { Box } from "@mui/system";

interface LocationSearchProps {
  onSearch: (search: string) => void;
}

export default function LocationSearch(props: LocationSearchProps): JSX.Element {

  const [locationSearch, setLocationSearch] = useState('');
  const disableSearch = locationSearch.trim() === '';

  const addLocation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    props.onSearch(locationSearch);
    setLocationSearch('');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Add Location"
          inputProps={{ 'aria-label': 'Add Location' }}
          value={locationSearch}
          onChange={e => setLocationSearch(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={addLocation} disabled={disableSearch}>
          <Search />
        </IconButton>
      </Paper>
    </Box>
  )
};