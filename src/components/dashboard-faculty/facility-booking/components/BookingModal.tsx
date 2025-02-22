import React from 'react'
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { Button, Textarea } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
const BookingModal = () => {
    const [open, setOpen] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState({ reason: '', notes: '' });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name === 'reason' && value.length > 20) {
      return;
    }
    if (name === 'notes' && value.length > 500) {
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    setOpen(false);
  };
  return (
    <>
      <Box>
        <Button
          size="lg"
          sx={{
            my: 2, fontSize: '1rem', width: 'auto', py: 1, px: 2
          }}
          onClick={() => setOpen(true)}
        >
          Continue</Button>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Book a Facility</DialogTitle>
          <DialogContent>Please provide the details for booking the facility.</DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 1,
                  mb: 1
                }}>

                  <FormLabel>Describe Reason</FormLabel>
                  <Typography level="body-sm">{20 - formData.reason.length}</Typography>
                </Box>

                <Input
                  autoFocus
                  required
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 1,
                  mb: 1
                }}>

                  <FormLabel>Additional Notes</FormLabel>
                  <Typography level="body-sm">{500 - formData.notes.length}</Typography>
                </Box>
                <Textarea
                  minRows={3}
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default BookingModal