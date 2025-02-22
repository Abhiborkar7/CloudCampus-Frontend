import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Link, Modal, ModalClose } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { CheatingForm } from '../../../types/types';
import { uploadImage, uploadImageToCloudinary } from '../../../services/uploadImage.service';
import { createCheating } from '../../../services/cheating.service';
import { Description } from '@mui/icons-material';

export const CheatingModal = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const [formData, setFormData] = useState<CheatingForm>({
    studentName: '',
    title: '',
    description: '',
    proof: '',
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    const form = {
      studentId: "67b9087c24d4adf22ada711d",
      title: formData.title,
      description: formData.description,
      proof: formData.proof
    }    
    await createCheating(form)
    .then(res => {
      console.log(res)
    }) 
    .catch(err=> {
      console.log(err)
    }) 
    setOpen(false);
  }

  const handleUploadImage = async () => {
    setLoading(true);
    if (selectedFile) {
      try {
        const fData = new FormData();
        fData.append("photo", selectedFile)
        const url = await uploadImage(fData);
        setFormData({
          ...formData,
          proof: url
        });
        console.log("image uploaded ", url)
      } catch (error) {
        console.error('Error while uploading Image', error);
      }
    }
    setLoading(false);
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
            Check and Continue
          </Typography>
          <br />
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              // handleSubmit();
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Student Name</FormLabel>
                <Input name="studentName" value={formData.studentName} onChange={handleInputChange} autoFocus required />
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
                  <Button size="md" sx={{ alignSelf: 'flex-end', justifySelf: 'flex-end', my: 2, fontSize: '1rem' }} onClick={() => handleUploadImage()} >Add</Button>
                </Box>
              </FormControl>
            </Stack>
            <Button type="submit" size="md" sx={{ my: 2, fontSize: '1rem' }} onClick={() => handleSubmit()} >Complaint</Button>
          </form>

        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
