import React, { useState } from 'react';
import { Button, CircularProgress, Modal, ModalClose } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { CheatingForm } from '../../../types/types';
import { uploadImageToCloudinary } from '../../../services/uploadImage.service';
import { createCheatingIncident } from '../../../services/cheating-record';

export const CheatingModal = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const [formData, setFormData] = useState<CheatingForm>({
    studentId: '',
    title: '',
    description: '',
    proof: [],
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    console.log(formData);
    createCheatingIncident(formData);
    setOpen(false);
  }

  const handleUploadImage = async () => {
    setLoading(true);
    console.log('Selected File:', selectedFile);
    if (selectedFile) {
      try {
        const response = await uploadImageToCloudinary(selectedFile);
        console.log('Response:', response);
        setFormData({
          ...formData,
          proof: [...formData.proof, response.imageUrl] // Add new URL to array
        });
      } catch (error) {
        console.error('Error while uploading Image', error);
      }
    }
    setLoading(false);
    // console.log(formData);
    // setOpen(false);
  };



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
          Add Cheating</Button>
      </Box>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={(_event: React.MouseEvent<HTMLButtonElement>) => {
          alert(`Are you sure you want to discontinue registration?`);
          setOpen(false);
        }}
        sx={{
          justifyContent: 'center', alignItems: 'center',
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
            maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg', marginX: 'auto',
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
              fontWeight: 'lg', mb: 2
            }}
          >
            Add Details
          </Typography>
          <br />
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Student Registration Number</FormLabel>
                <Input name="studentId" value={formData.studentId} onChange={handleInputChange} autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input name="title" value={formData.title} onChange={handleInputChange} required />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input name="description" value={formData.description} onChange={handleInputChange} required />
              </FormControl>

              <FormControl >
                <FormLabel>Upload Proof</FormLabel>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Input
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                  />
                  <Button size="md" sx={{ alignSelf: 'flex-end', justifySelf: 'flex-end', my: 2, fontSize: '1rem' }} onClick={() => handleUploadImage()} >Upload</Button>
                </Box>
              </FormControl>
            </Stack>
            <Button disabled={formData.proof.length === 0} type="submit" size="md" sx={{ my: 2, fontSize: '1rem' }} >Add</Button>
          </form>

        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
