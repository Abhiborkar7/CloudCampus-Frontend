import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function HeaderSection() {
  return (
    <Stack sx={{ mb: 2 }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', width: '100%' }}>
        <Typography level="h3">Campus Facility Booking</Typography>
      </Stack>
      <Typography level="body-md" color="neutral">
        Book a facility for your event
      </Typography>
    </Stack>
  );
}
