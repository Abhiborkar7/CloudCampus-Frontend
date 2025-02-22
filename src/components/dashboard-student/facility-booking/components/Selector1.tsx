import * as React from 'react';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Stack from '@mui/joy/Stack';
import { Typography } from '@mui/joy';


export default function Selector1({ setSelector1value }: { setSelector1value: React.Dispatch<React.SetStateAction<number>> }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        alert(JSON.stringify(formJson));
      }}
    >
      <Typography level="body-sm" sx={{ fontSize: 16, fontWeight: 500, mb: 2 }}>
        Select Sector
      </Typography> 
      <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Select
          placeholder="Select Campus Facility"
          name="foo"
          required
          sx={{ minWidth: 200 }}
          onChange={(event, newValue) => setSelector1value(Number(newValue))}
        >
          <Option value="0">Ground</Option>
          <Option value="2">CSE</Option>
          <Option value="3">College</Option>
          <Option value="4">Hostel</Option>
        </Select>
        {/* <Button type="submit">Submit</Button> */}
      </Stack>
    </form>
  );
}
