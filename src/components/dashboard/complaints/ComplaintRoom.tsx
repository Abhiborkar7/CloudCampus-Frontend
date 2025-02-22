import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { FocusTrap } from '@mui/base/FocusTrap';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

import CreateRoundedIcon from '@mui/icons-material/CreateRounded';

import Layout from './Layout';
import Navigation from './Navigation';
import Mails from './Mails';
import EmailContent from './EmailContent';
import WriteEmail from './WriteEmail';
import { useSidebar } from '../../../contexts/SidebarContext';
import { IconButton, Sheet, Stack } from '@mui/joy';
import { closeEmailContent, toggleComplainPane, toggleEmailContent } from '../utils';

export default function ComplaintRoom() {

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    return () => {
      closeEmailContent();
    };
  }, []);
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />

      <Layout.SideDrawer
        sx={{
          display: { sm: 'none' },
          position: { xs: 'fixed', sm: 'sticky' },
          transform: {
            xs: 'translateX(calc(100% * (var(--ComplainPane-slideIn, 0) - 1)))',
            sm: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 100,
          width: '100%',
          top: 52,
        }}
        onClose={() => toggleComplainPane()}
        >
        <Navigation />
      </Layout.SideDrawer>

      <Layout.SideDrawer
        sx={{
          display: { sm: 'none' },
          position: { xs: 'fixed', sm: 'sticky' },
          transform: {
            xs: 'translateX(calc(-100% * (var(--EmailContent-slideIn, 0) - 1)))',
            sm: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 100,
          width: '100%',
          top: 52,
        }}
        onClose={() => toggleEmailContent()}
        >
        <EmailContent />
      </Layout.SideDrawer>


      <Layout.Root>
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        <Layout.SidePane>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ alignItems: 'center', gap: 1 }}>
              <Stack
                direction="row"
                spacing={{ xs: 1, md: 2 }}
                sx={{ alignItems: 'center' }}
              >
                <IconButton
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                  onClick={() => toggleComplainPane()}
                >
                  <ArrowBackIosNewRoundedIcon />
                </IconButton>
                <div>
                  <Typography level="title-lg" textColor="text.secondary" component="h1">
                    All Complaints
                  </Typography>
                  <Typography level="title-sm" textColor="text.tertiary">
                    5 complaints
                  </Typography>
                </div>
              </Stack>


            </Box>
            <Button
              size="sm"
              startDecorator={<CreateRoundedIcon />}
              onClick={() => setOpen(true)}
              sx={{ ml: 'auto' }}
            >
              File Complaint
            </Button>
            <FocusTrap open={open} disableAutoFocus disableEnforceFocus>
              <WriteEmail open={open} onClose={() => setOpen(false)} />
            </FocusTrap>
          </Box>
          <Mails />
        </Layout.SidePane>
        <Layout.Main>
          <EmailContent />
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}
