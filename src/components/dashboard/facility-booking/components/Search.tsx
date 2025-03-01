import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query: string) => {
    console.log("Searching for:", query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <div>
      <Stack spacing={1} direction="row" sx={{ mb: 2 }}>
        <FormControl sx={{ flex: 1 }}>
          <Input
            placeholder="Search"
            startDecorator={<SearchRoundedIcon />}
            aria-label="Search"
            sx={{ width: '100%', height: 40 }}
            value={searchQuery}
            onChange={handleChange}
          />
        </FormControl>
        <Button variant="solid" color="primary" onClick={() => handleSearch(searchQuery)}>
          Search
        </Button>
      </Stack>
    </div>
  );
}
