import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';

interface StudentSelectProps {
  value: string;
  onChange: (value: string) => void;
}
export default function StudentSelect({ value, onChange }: StudentSelectProps) {
  return (
    // <Autocomplete
    //   placeholder="Registration Number"
    //   options={registrationList}
    //   sx={{ width: 300 }}
    //   type='studentId'
    // />
      <Autocomplete
      placeholder="Enter Registration Number"
      options={registrationList}
      value={value}
      onChange={(_, newValue) => onChange(newValue || "")}
      sx={{ width: 300 }}
    />
  );
}

const registrationList = [
  "REG2024001",
  "REG2024002",
  "REG2024003",
  "REG2024004",
  "REG2024005",
  "REG2024006",
  "REG2024007",
  "REG2024008",
  "REG2024009",
  "REG2024010",
];
