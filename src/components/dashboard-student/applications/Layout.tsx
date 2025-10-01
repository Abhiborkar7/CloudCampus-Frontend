import * as React from 'react';
import Box, { BoxProps } from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

/* ---------- Root Layout ---------- */
function Root(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        {
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
            md: 'minmax(160px, 300px) minmax(300px, 500px) minmax(500px, 1fr)',
          },
          minHeight: '100vh',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

/* ---------- Sidebar (Navigation) ---------- */
function SideNav(props: BoxProps) {
  return (
    <Box
      component="nav"
      className="Navigation"
      {...props}
      sx={[
        {
          p: 2,
          bgcolor: 'background.surface',
          borderRight: '1px solid',
          borderColor: 'divider',
          display: {
            xs: 'none',
            sm: 'block',
          },
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

/* ---------- Side Pane (Inbox, List, etc.) ---------- */
function SidePane(props: BoxProps) {
  return (
    <Box
      className="Inbox"
      {...props}
      sx={[
        {
          bgcolor: 'background.surface',
          borderRight: '1px solid',
          borderColor: 'divider',
          display: {
            xs: 'block',
            sm: 'none',
            md: 'block',
          },
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

/* ---------- Main Content Area ---------- */
function Main(props: BoxProps) {
  return (
    <Box
      component="main"
      className="Main"
      {...props}
      sx={[
        {
          p: 2,
          display: {
            xs: 'none',
            sm: 'block',
          },
          overflowY: 'auto',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

/* ---------- Drawer (Mobile View) ---------- */
interface SideDrawerProps extends BoxProps {
  onClose: () => void;
}

function SideDrawer({ onClose, children, ...other }: SideDrawerProps) {
  return (
    <Box
      {...other}
      sx={[
        { position: 'fixed', inset: 0, zIndex: 1200, bgcolor: 'rgba(0,0,0,0.3)' },
        ...(Array.isArray(other.sx) ? other.sx : [other.sx]),
      ]}
    >
      <Sheet
        sx={{
          width: '100%',
          height: '100%',
          p: 2,
          boxShadow: 'lg',
          bgcolor: 'background.surface',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1,
            borderRadius: '50%',
            boxShadow: 'sm',
          }}
        >
          <CloseRoundedIcon />
        </IconButton>

        {/* Drawer Content */}
        {children}
      </Sheet>
    </Box>
  );
}

/* ---------- Export as Layout Object ---------- */
const Layout = {
  Root,
  SideNav,
  SidePane,
  SideDrawer,
  Main,
};

export default Layout;
