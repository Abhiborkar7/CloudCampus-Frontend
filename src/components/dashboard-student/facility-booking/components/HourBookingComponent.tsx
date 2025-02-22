import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { Box, Button, Typography } from '@mui/material';

interface HourSlot {
  hour: number;
  booked: boolean;
}

export default function HourBookingComponent() {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  const [hours, setHours] = React.useState<HourSlot[]>([]);

  // Initialize 24 hours for the selected date
  const initializeHours = () => {
    const hoursArray: HourSlot[] = [];
    for (let i = 0; i < 24; i++) {
      hoursArray.push({ hour: i, booked: false }); // Default: all hours are available
    }
    setHours(hoursArray);
  };

  // Handle date selection
  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    initializeHours(); // Reset hours when a new date is selected
  };

  // Handle hour booking
  const handleHourClick = (hour: number) => {
    if (!selectedDate) return;

    const updatedHours = hours.map((slot) =>
      slot.hour === hour ? { ...slot, booked: !slot.booked } : slot
    );
    setHours(updatedHours);

    console.log(
      `Hour ${hour} on ${selectedDate.format('YYYY-MM-DD')} is now ${updatedHours[hour].booked ? 'booked' : 'available'
      }`
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          Book a Time Slot
        </Typography>

        {/* Date Picker */}
        <DatePicker
          label="Select a date"
          value={selectedDate}
          onChange={handleDateChange}
          sx={{ mb: 3 }}
        />

        {/* Display 24 Hours */}
        {selectedDate && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1,
            }}
          >
            {hours.map((slot) => (
              <Button
                key={slot.hour}
                variant="contained"
                disabled={slot.booked}
                onClick={() => handleHourClick(slot.hour)}
                sx={{
                  backgroundColor: slot.booked ? 'red' : 'primary.main',
                  color: slot.booked ? 'white' : 'inherit',
                  '&:hover': {
                    backgroundColor: slot.booked ? 'darkred' : 'primary.dark',
                  },
                }}
              >
                {`${slot.hour}:00 - ${slot.hour + 1}:00`}
              </Button>
            ))}
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
}