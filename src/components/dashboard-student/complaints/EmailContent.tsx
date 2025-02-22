import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Divider from '@mui/joy/Divider';
import Tooltip from '@mui/joy/Tooltip';

import FolderIcon from '@mui/icons-material/Folder';
import { Complaint } from '../../../types/types';

export default function EmailContent({ complaint }: { complaint: Complaint }) {




  return (
    <Sheet
      variant="outlined"
      sx={{ minHeight: 500, borderRadius: 'sm', p: 2, mb: 3 }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          transform: {
            xs: 'translateX(calc(-100% * (var(--EmailContent-slideIn, 0) - 1)))',
            sm: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 100,
          width: '100%',
          top: 52,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ ml: 2 }}>
            <Typography level="title-sm" textColor="text.primary" sx={{ mb: 0.5 , fontSize: '1.5rem', fontWeight: 'bold'}}>
              To {complaint.complaintTo}
            </Typography>
            <Typography level="body-xs" textColor="text.tertiary">
              21 Oct 2022
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
          {complaint.title}
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
              To
            </Typography>
            <Tooltip size="sm" title="Copy email" variant="outlined">
              <Chip size="sm" variant="soft" color="primary" onClick={() => { }}>
                {complaint.complaintTo}
              </Chip>
            </Tooltip>
          </div>
        </Box>
      </Box>
      <Divider />
      <Typography level="body-sm" sx={{ mt: 2, mb: 2 }}>
        {complaint.description}
      </Typography>
      <Divider />
      <Typography level="title-sm" sx={{ mt: 2, mb: 2 }}>
        Attachments
      </Typography>
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          '& > div': {
            boxShadow: 'none',
            '--Card-padding': '0px',
            '--Card-radius': theme.vars.radius.sm,
          },
        })}
      >
        {
          complaint.attachments?.map((attachment, index) => (
            <Card key={index} variant="outlined">
              <AspectRatio ratio="1" sx={{ minWidth: 80 }}>
                <img
                  src={attachment}
                  alt="Attachment"
                />
              </AspectRatio>
            </Card>
          ))
        }
      </Box>
    </Sheet>
  );
}
