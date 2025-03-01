import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { getLoginUser } from '../../../services/auth.service';
import { User } from '../../../types/types';



export default function MyProfile() {
  const [profile, setProfile] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getLoginUser();
        setProfile(response.student);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (!profile) return <Typography>Error loading profile</Typography>;

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
              src={profile.profilePhoto || profile.idPhoto}
              alt="Profile"
              loading="lazy"
            />
          </AspectRatio>
        </Stack>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input size="sm" defaultValue={profile.name} disabled />
          </FormControl>
          <FormControl>
            <FormLabel>Registration No</FormLabel>
            <Input size="sm" defaultValue={profile.registrationNo} disabled />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              size="sm"
              type="email"
              startDecorator={<EmailRoundedIcon />}
              defaultValue={profile.email}
              disabled
            />
          </FormControl>
          <FormControl>
            <FormLabel>Department</FormLabel>
            <Input size="sm" defaultValue={profile.department} disabled />
          </FormControl>
          <FormControl>
            <FormLabel>Date of Birth</FormLabel>
            <Input size="sm" defaultValue={profile.dob} disabled />
          </FormControl>
        </Stack>
      </Card>
    </Box>
  );
}
