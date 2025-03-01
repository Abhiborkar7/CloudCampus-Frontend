import * as React from 'react';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Stack from '@mui/joy/Stack';
import { Typography } from '@mui/joy';


export default function Selector2({ setSelector2value, selector1value }: { setSelector2value: React.Dispatch<React.SetStateAction<number>>, selector1value: number}) {
  return (
    <form>
      <Typography level="body-sm" sx={{ fontSize: 16, fontWeight: 500, mb: 2 }}>
        Select Room
      </Typography>   
         <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Select
          placeholder="Select Campus Facility"
          name="foo"
          required
          sx={{ minWidth: 200 }}
          onChange={(event, newValue) => setSelector2value(Number(newValue))}
        >
          {
            selector1value === 0 ? (
              <>
                <Option value="0">Football Field</Option>
                <Option value="1">Basketball Court</Option>
              </>
            ) : selector1value === 2 ? (
              <>
                <Option value="0">Lab 1</Option>
                <Option value="1">Lab 2</Option>
              </>
            ) : selector1value === 3 ? (
              <>
                <Option value="0">Library</Option>
                <Option value="1">Cafeteria</Option>
              </>
            ) : selector1value === 4 ? (
              <>
                <Option value="0">Room 101</Option>
                <Option value="1">Room 102</Option>
              </>
            ) : null
          }
         
        </Select>
        {/* <Button type="submit" onClick={() => {}}>Submit</Button> */}
      </Stack>
    </form>
  );
}
