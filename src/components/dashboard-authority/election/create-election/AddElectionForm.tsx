import React, { useState } from 'react';
import { Button, CircularProgress, Modal, ModalClose } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { addElection } from '../../../../services/elections.service';

interface ElectionForm {
  electionName: string;
  description: string;
  startDate: string;
  endDate: string;
}

export const AddElectionForm = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<ElectionForm>({
    electionName: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Replace with your actual API call
      await addElection(formData);
      console.log('Election data:', formData);
      setOpen(false);
    } catch (error) {
      console.error('Error creating election:', error);
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <Button
          size="lg"
          sx={{
            my: 2, fontSize: '1rem', width: 'auto', py: 1, px: 2
          }}
          onClick={() => setOpen(true)}
        >
          Create Election
        </Button>
      </Box>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={(_event: React.MouseEvent<HTMLButtonElement>) => {
          if (confirm('Are you sure you want to discontinue election creation?')) {
            setOpen(false);
          }
        }}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: {
            xs: 'calc(0px + var(--Header-height))',
            md: 5
          },
          zIndex: 999,
          overflow: 'auto'
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            marginX: 'auto',
            position: 'relative'
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />

          {loading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                zIndex: 10
              }}
            >
              <CircularProgress />
            </Box>
          )}

          <Typography
            component="h2"
            id="modal-title"
            level="h3"
            textColor="inherit"
            sx={{
              fontWeight: 'lg',
              mb: 2
            }}
          >
            Create New Election
          </Typography>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Election Name</FormLabel>
                <Input 
                  name="electionName" 
                  value={formData.electionName} 
                  onChange={handleInputChange} 
                  autoFocus 
                  required 
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  required 
                />
              </FormControl>
              <FormControl>
                <FormLabel>Start Date</FormLabel>
                <Input 
                  type="date"
                  name="startDate" 
                  value={formData.startDate} 
                  onChange={handleInputChange} 
                  required 
                />
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
            </Stack>
            <Button 
              type="submit" 
              size="md" 
              sx={{ my: 2, fontSize: '1rem' }}
            >
              Create Election
            </Button>
          </form>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
