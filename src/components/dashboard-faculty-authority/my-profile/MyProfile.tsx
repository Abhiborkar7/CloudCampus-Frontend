import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { useAuth } from '../../../context/AuthContext';

export default function MyProfile() {
  const {facultyAuthority} = useAuth();
  const profile = facultyAuthority;


  return (
    <Box sx={{ flex: 1, width: '100%', maxWidth: '800px', mx: 'auto', p: 3 }}>
      <Card>
        <Box sx={{ mb: 1 }}>
          <Typography level="title-md">Personal info</Typography>
        </Box>
        <Divider />

        <Stack direction="row" spacing={3} alignItems="center" sx={{ my: 2 }}>
          <AspectRatio ratio="1" sx={{ width: 120, borderRadius: '100%' }}>
            <img
              src={profile?.faculty?.profilePhoto || '/default-profile.png'}
              alt="Profile"
              loading="lazy"
            />
          </AspectRatio>
        </Stack>

        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input size="sm" value={profile?.faculty?.name || ''} disabled />
          </FormControl>

          <FormControl>
            <FormLabel>Position</FormLabel>
            <Input size="sm" value={profile?.position} disabled />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              size="sm"
              type="email"
              startDecorator={<EmailRoundedIcon />}
              value={profile?.email}
              disabled
            />
          </FormControl>

          <FormControl>
            <FormLabel>Department</FormLabel>
            <Input size="sm" value={profile.department} disabled />
          </FormControl>
        </Stack>
      </Card>
    </Box>
  );
}
