import * as React from 'react';
import Box, { BoxProps } from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

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
            sm: 'initial',
          },
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

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
            xs: 'initial',
            sm: 'none',
            md: 'initial',
          },
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

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
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}
function SideDrawer(
  props: BoxProps & { onClose: React.MouseEventHandler<HTMLDivElement> },
) {
  const { onClose, ...other } = props;
  return (
    <Box
      {...other}
      sx={[
        { position: 'fixed', zIndex: 1200, width: '100%', height: '100%' },
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
        }}
      >
        <Box
          role="button"
          onClick={onClose}
          sx={(theme) => ({
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1,
            transform: 'scale(1.5)', // Increase the size
            transition: 'transform 0.2s',
          })}
        >
          <CloseRoundedIcon />
        </Box>
        {props.children}
      </Sheet>
    </Box>
  );
}

export default {
  Root,
  SideNav,
  SidePane,
  SideDrawer,
  Main,
};
