import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useLocation, useNavigate } from 'react-router-dom';
import ColorSchemeToggle from './ColorSchemeToggle';
import { closeSidebar } from '../utils';
import ErrorIcon from '@mui/icons-material/Error';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
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
  const currentPath = location.pathname;

  const isPathMatch = (path: string) => currentPath === path;

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
          {/* <ListItem>
            <SidebarListItemButton
              selected={isPathMatch('/faculty/dashboard')}
              to="/faculty/dashboard"
              icon={<QuestionAnswerRoundedIcon />}

            >
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm"> Dashboard</Typography>
              </ListItemContent>
            </SidebarListItemButton>
          </ListItem> */}

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
                  <SidebarListItemButton to='create-election' >Create Election</SidebarListItemButton>
                </ListItem>
                <ListItem>
                  <SidebarListItemButton to='election-result'>Results</SidebarListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
{/* 
          <ListItem>
            <SidebarListItemButton
              selected={isPathMatch('/faculty/messages')}
              to="/faculty/messages"
              icon={<QuestionAnswerRoundedIcon />}

            >
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Messages</Typography>
              </ListItemContent>
            </SidebarListItemButton>
          </ListItem> */}



          <ListItem>
            <SidebarListItemButton
              selected={isPathMatch('/faculty/cheatings')}
              to="/faculty/cheatings"
              icon={<QuestionAnswerRoundedIcon />}

            >
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Cheating Records</Typography>
              </ListItemContent>
            </SidebarListItemButton>
          </ListItem>


          <ListItem>
            <SidebarListItemButton
              to='/faculty/complaints'
              selected={isPathMatch('/faculty/complaints')}
            >
              <ErrorIcon />
              <ListItemContent>
                <Typography level="title-sm">Complaints</Typography>
              </ListItemContent>
            </SidebarListItemButton>
          </ListItem>

          {/* <ListItem >
            <SidebarListItemButton
              to='/faculty/facility-booking'
              selected={isPathMatch('/faculty/facility-booking')}
            >
              <BookmarkAddIcon />
              <ListItemContent>
                <Typography level="title-sm">Facility Booking</Typography>
              </ListItemContent>
            </SidebarListItemButton>
          </ListItem>
         */}
          {/* <ListItem>
            <SidebarListItemButton
              to='/faculty/profile'
              selected={isPathMatch('/faculty/profile')}
            >
              <AccountBoxIcon />
              <ListItemContent>
                <Typography level="title-sm">My profile</Typography>
              </ListItemContent>
            </SidebarListItemButton>
          </ListItem> */}
          <ListItem>
            <SidebarListItemButton
              to='/faculty/leave'
              selected={isPathMatch('/faculty/leave')}
            >
              <LogoutRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Student Leave</Typography>
              </ListItemContent>
            </SidebarListItemButton>
          </ListItem>

        </List>
      
       
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
