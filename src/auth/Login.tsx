import { CssVarsProvider, extendTheme, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import { SignupModal } from './signupModal';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Select, Option } from '@mui/joy';
import { useAuth } from '../context/AuthContext';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type RoleType = 'student' | 'faculty' | 'student-authority' | 'faculty-authority';

const roleOptions: { label: string; value: RoleType }[] = [
  { label: 'Student', value: 'student' },
  { label: 'Faculty', value: 'faculty' },
  { label: 'Student Authority', value: 'student-authority' },
  { label: 'Faculty Authority', value: 'faculty-authority' },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const { loginAccount, isAuthenticated, role } = useAuth();

  if (isAuthenticated) {
    if (role === 'student') return <Navigate to="/student/dashboard" replace />;
    if (role === 'faculty') return <Navigate to="/faculty/dashboard" replace />;
    if (role === 'faculty-authority') return <Navigate to="/faculty-authority/dashboard" replace />;
    if (role === 'student-authority') return <Navigate to="/student-authority/dashboard" replace />;
  }

  const roleLabelMap: Record<RoleType, string> = {
    student: 'Student',
    faculty: 'Faculty',
    'student-authority': 'Student Authority',
    'faculty-authority': 'Faculty Authority',
  };

  const signupPrompt = selectedRole ? `New ${roleLabelMap[selectedRole]}?` : 'New user?';

  return (
    <CssVarsProvider theme={customTheme} disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s',
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100%',
            px: 2,
          }}
        >
          <Box component="header" sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeRoundedIcon />
              </IconButton>
              <Typography level="title-lg">Cloud Campus</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>

          <Box
            component="main"
            sx={{
              mt: 5,
              mb: 2,
              py: 2,
              pb: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden',
              },
            }}
          >
            <Stack sx={{ gap: 4, mb: 2 }}>
              <Typography component="h1" level="h3">
                Login
              </Typography>

              <Stack sx={{ gap: 1 }}>
                <FormControl required>
                  <FormLabel>Role</FormLabel>
                  <Select
                    placeholder="Select role"
                    value={selectedRole ?? ''}
                    onChange={(_, newValue) => {
                      setSelectedRole((newValue as RoleType) || null);
                    }}
                  >
                    <Option value="student">Student</Option>
                    <Option value="faculty">Faculty</Option>
                    <Option value="student-authority">Student Authority</Option>
                    <Option value="faculty-authority">Faculty Authority</Option>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>

            <Stack sx={{ gap: 4, mt: 2 }}>
              <form
                onSubmit={async (event: React.FormEvent<SignInFormElement>) => {
                  event.preventDefault();
                  const formElements = event.currentTarget.elements;
                  const data = {
                    email: formElements.email.value,
                    password: formElements.password.value,
                    persistent: formElements.persistent.checked,
                  };
                  if (!selectedRole) {
                    toast.error('Please select a Role');
                    return;
                  }
                  await loginAccount(data, selectedRole);
                }}
              >
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" />
                </FormControl>

                <Stack sx={{ gap: 4, mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Checkbox size="sm" label="Remember me" name="persistent" />
                    <Link level="title-sm" href="#replace-with-a-link">
                      Forgot your password?
                    </Link>
                  </Box>
                  <Button type="submit" fullWidth>
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>

          {/* FOOTER: Signup prompt moved here */}
          <Box component="footer" sx={{ py: 3 }}>
            <Stack alignItems="center" spacing={1}>
              <Typography level="body-sm">
                {signupPrompt}{' '}
                <SignupModal />
              </Typography>

              <Typography level="body-xs" sx={{ textAlign: 'center' }}>
                © Cloud Campus {new Date().getFullYear()}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>

      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: 'url(https://www.sggs.ac.in/uploads/New%20folder/1.png)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage: 'url(https://www.sggs.ac.in/uploads/New%20folder/1.png)',
          },
        })}
      />
    </CssVarsProvider>
  );
}

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === 'light' ? 'dark' : 'light');
        onClick?.(event);
      }}
      {...other}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

const customTheme = extendTheme({
  colorSchemes: {
    light: { palette: { mode: 'light' } },
    dark: { palette: { mode: 'dark' } },
  },
});
