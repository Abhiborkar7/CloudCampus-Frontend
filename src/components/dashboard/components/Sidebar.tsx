import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'; 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useLocation, useNavigate } from 'react-router-dom';
import ColorSchemeToggle from './ColorSchemeToggle';
import { closeSidebar } from '../utils';
import ErrorIcon from '@mui/icons-material/Error';

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: 'grid',
            transition: '0.2s ease',
            '& > *': {
              overflow: 'hidden',
            },
          },
          open ? { gridTemplateRows: '1fr' } : { gridTemplateRows: '0fr' },
        ]}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

const SidebarListItemButton = ({ to, icon, children, selected }: { to?: string, icon?: React.ReactNode, children: React.ReactNode, selected?: boolean }) => {
  const navigate = useNavigate();

  return (
    <ListItemButton
      onClick={() => { navigate(to || '#'); closeSidebar(); }}
      selected={selected}
    >
      {children}
    </ListItemButton>
  );
};


export default function Sidebar() {

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isPathMatch = (path: string) => currentPath === path;
  // React.useEffect(() => {
  //   closeSidebar();
  // }, [location.pathname]);

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton variant="soft" color="primary" size="sm">
          {/* <CloudIcon /> */}
          <img src="/CCLogobg.png" alt="" style={{ width: '50px', height: '50px' }} />
        </IconButton>
        <Typography level="title-lg">Cloud Campus</Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
      <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" />
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <SidebarListItemButton
              to="#"
              icon={<DashboardRoundedIcon />}
              selected={isPathMatch('/dashboard')}
            >
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Dashboard</Typography>
              </ListItemContent>
            </SidebarListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <HowToVoteIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Election</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={[
                      open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
                    ]}
                  />
                </ListItemButton>
              )}
              defaultExpanded={isPathMatch('/tasks')}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <SidebarListItemButton to='current-election' >Current Elections</SidebarListItemButton>
                </ListItem>
                <ListItem>
                  <SidebarListItemButton to='election-result'>Results</SidebarListItemButton>
                </ListItem>
                <ListItem>
                  <SidebarListItemButton>Upcoming</SidebarListItemButton>
                </ListItem>
                <ListItem>
                  <SidebarListItemButton>Instructions</SidebarListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          <ListItem>
            <SidebarListItemButton
              // role="menuitem"
              // component="a"
              selected={isPathMatch('/messages')}
              to="/messages"
              icon={<QuestionAnswerRoundedIcon />}

            >
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Messages</Typography>
              </ListItemContent>
              {/* <Chip size="sm" color="primary" variant="solid">
                4
              </Chip> */}
            </SidebarListItemButton>
          </ListItem>
          


          <ListItem>
            <SidebarListItemButton
              // role="menuitem"
              // component="a"
              selected={isPathMatch('/cheatings')}
              to="/cheatings"
              icon={<QuestionAnswerRoundedIcon />}

            >
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Cheating Records</Typography>
              </ListItemContent>
              {/* <Chip size="sm" color="primary" variant="solid">
                4
              </Chip> */}
            </SidebarListItemButton>
          </ListItem>


          <ListItem>
            <SidebarListItemButton
              // role="menuitem"
              // component="a"
              to='/complaints'
              // onClick={() => {navigate('/complaints'), setComplaintsSelected(true)}}
              selected={isPathMatch('/complaints')}
            >
              <ErrorIcon />
              <ListItemContent>
                <Typography level="title-sm">Complaints</Typography>
              </ListItemContent>
              {/* <Chip size="sm" color="primary" variant="solid">
                1
              </Chip> */}
            </SidebarListItemButton>
          </ListItem>

          <ListItem >
            <SidebarListItemButton
              to='/facility-booking'
              selected={isPathMatch('/facility-booking')}
            >
              <BookmarkAddIcon />
              <ListItemContent>
                <Typography level="title-sm">Facility Booking</Typography>
              </ListItemContent>
            </SidebarListItemButton>
          </ListItem>


          <ListItem nested>
            <Toggler
              defaultExpanded
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Users</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={[
                      open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
                    ]}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    selected={isPathMatch('/profile')}
                    onClick={() => navigate('/profile')}
                  >My profile</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    onClick={() => navigate('/coming-soon')}
                  >Create a new user</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Roles & permission</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
        </List>
        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <SupportRoundedIcon />
              Support
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List>
        <Card
          invertedColors
          variant="soft"
          color="warning"
          size="sm"
          sx={{ boxShadow: 'none' }}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography level="title-sm">Used space</Typography>
            <IconButton size="sm">
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
          <Typography level="body-xs">
            Your team has used 80% of your available space. Need more?
          </Typography>
          <LinearProgress variant="outlined" value={80} determinate sx={{ my: 1 }} />
          <Button size="sm" variant="solid">
            Upgrade plan
          </Button>
        </Card>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">Siriwat K.</Typography>
          <Typography level="body-xs">siriwatk@test.com</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral">
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}
