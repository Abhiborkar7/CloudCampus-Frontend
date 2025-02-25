import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import AspectRatio from '@mui/joy/AspectRatio';
import Divider from '@mui/joy/Divider';
import Avatar from '@mui/joy/Avatar';
import Tooltip from '@mui/joy/Tooltip';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ForwardToInboxRoundedIcon from '@mui/icons-material/ForwardToInboxRounded';
import FolderIcon from '@mui/icons-material/Folder';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ButtonStepper from './ButtonStepper';
import { Application } from './Mails';

export default function EmailContent({ application }: { application: Application }) {
  const [open, setOpen] = React.useState([false, false, false]);

  return (
    <Sheet
      variant="outlined"
      sx={{ minHeight: 500, borderRadius: 'sm', p: 2, mb: 3 }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* <Avatar
            src="https://i.pravatar.cc/40?img=3"
            srcSet="https://i.pravatar.cc/80?img=3"
          /> */}
          <Box sx={{ ml: 2 }}>
            <Typography level="title-sm" textColor="text.primary" sx={{ mb: 0.5 }}>
              {application?.from.name}
            </Typography>
            <Typography level="body-xs" textColor="text.tertiary">
              {application?.createdAt}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box
        sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'start' }}
      >
        <Typography
          level="title-lg"
          textColor="text.primary"
        >
          {application?.title}
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <Typography
              component="span"
              level="body-sm"
              sx={{ mr: 1, display: 'inline-block' }}
            >
              {application?.from.name}
            </Typography>
            <Tooltip size="sm" title="Copy email" variant="outlined">
              <Chip size="sm" variant="soft" color="primary" onClick={() => { }}>
                {application?.from.email}
              </Chip>
            </Tooltip>
            <Tooltip size="sm" title="Copy email" variant="outlined">
              <Box>
                {
                  application && application?.to.map((item) => (
                    <Chip size="sm" variant="soft" color="primary">
                      {item.email}
                    </Chip>
                  ))
                }
              </Box>
            </Tooltip>
          </div>
          <div>
            <Typography
              component="span"
              level="body-sm"
              sx={{ mr: 1, display: 'inline-block' }}
            >
              {/* {application?.to.name} */}
            </Typography>
          </div>
        </Box>
      </Box>
      <Divider />
      <Typography level="body-sm" sx={{ mt: 2, mb: 2 }}>
        {application?.body}
      </Typography>
      <Divider />
      <Box sx={{
        display: 'flex',
        gap: 1,
        mt: 5,
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
        <ButtonStepper />
      </Box>
      <Box sx={{
        display: 'flex',
        gap: 1,
        mt: 5,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Button>
        Approve
      </Button>
      </Box>
    </Sheet>
  );
}