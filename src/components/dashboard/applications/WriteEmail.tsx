import * as React from 'react';
import Box from '@mui/joy/Box';
import ModalClose from '@mui/joy/ModalClose';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import Sheet from '@mui/joy/Sheet';
import { IconButton, Input, Option, Select, Stack, Typography } from '@mui/joy';

import FormatColorTextRoundedIcon from '@mui/icons-material/FormatColorTextRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import { Sender } from './ApplicationPage';
import { createApplication } from '../../../services/application.service';
// import { Select } from '@mui/material';

interface WriteEmailProps {
  open?: boolean;
  onClose?: () => void;
  senders?: Sender[] | null;
}

const WriteEmail = React.forwardRef<HTMLDivElement, WriteEmailProps>(
  function WriteEmail({ open, onClose, senders }, ref) {

    const [formData, setFormData] = React.useState({
      title: '',
      body: '',
      to: [] as string[], // Change to array
      file: null as File | null
    });

    const handleSubmit = async () => {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('body', formData.body);
      // data.append('to', formData.to);
      formData.to.forEach(recipientId => {
        data.append('to[]', recipientId); // Use 'to[]' to indicate array on server side
      });
      if (formData.file) {
        data.append('file', formData.file);
      }

      console.log('Data:', formData);

      const response = await createApplication(data);
      console.log('Response:', response);
    
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setFormData(prev => ({ ...prev, file: event.target.files![0] }));
      }
    };

    return (
      <Sheet
        ref={ref}
        sx={[
          {
        alignItems: 'center',
        px: 1.5,
        py: 1.5,
        ml: 'auto',
        width: { xs: '100dvw', md: 600 },
        flexGrow: 1,
        border: '1px solid',
        borderRadius: '8px 8px 0 0',
        backgroundColor: 'background.level1',
        borderColor: 'neutral.outlinedBorder',
        boxShadow: 'lg',
        zIndex: 1000,
        position: 'fixed',
        bottom: 0,
        right: 24,
        transition: 'transform 0.3s ease',
          },
          open ? { transform: 'translateY(0)' } : { transform: 'translateY(100%)' },
        ]}
      >
        <Box sx={{ mb: 2 }}>
          <Typography level="title-sm">New Application</Typography>
          <ModalClose id="close-icon" onClick={onClose} />
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}
        >
          <FormControl>
        <FormLabel>To</FormLabel>
        <Select 
          value={formData.to[0]}
              onChange={(_, value) => setFormData(prev => ({
                ...prev,
                to: Array.isArray(value) ? value.filter(Boolean) as string[] : value ? [value] : []
              }))}
        >
          {
            senders?.map((sender, index) => (
          <Option key={index} value={sender.email}>{sender.name}</Option>
            ))
          }
        </Select>
          </FormControl>

          <Input 
        placeholder="Title" 
        value={formData.title}
        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          />
          <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Textarea
          placeholder="Write Application..."
          value={formData.body}
          onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
          minRows={8}
          endDecorator={
            <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexGrow: 1,
            py: 1,
            pr: 1,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
            >
          <div>
            {/* <IconButton size="sm" variant="plain" color="neutral">
              <FormatColorTextRoundedIcon />
            </IconButton> */}
            <IconButton 
              component="label" 
              size="sm" 
              variant="plain" 
              color="neutral"
            >
              <input
            type="file"
            hidden
            onChange={handleFileChange}
              />
              <AttachFileRoundedIcon />
            </IconButton>
            {/* <IconButton size="sm" variant="plain" color="neutral">
              <InsertPhotoRoundedIcon />
            </IconButton>
            <IconButton size="sm" variant="plain" color="neutral">
              <FormatListBulletedRoundedIcon />
            </IconButton> */}
          </div>
          <Button
            color="primary"
            sx={{ borderRadius: 'sm' }}
            onClick={handleSubmit}
          >
            Send
          </Button>
            </Stack>
          }
          sx={{
            '& textarea:first-of-type': {
          minHeight: 72,
            },
          }}
        />
          </FormControl>
        </Box>
      </Sheet>
    );
  },
);


export default WriteEmail;