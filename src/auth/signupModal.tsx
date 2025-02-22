import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Link, Modal, ModalClose } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { extractTextFromImage, getOtp, registerUser } from '../services/auth.service';
import DropZone from './DropZone';
import OTPInput from '../services/OtpInput';
import {  SignupForm } from '../types/types';
import { uploadImageToCloudinary } from '../services/uploadImage.service';

export const SignupModal = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [stepNumber, setStepNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');


  const [formData, setFormData] = useState<SignupForm>({
    fullName: '',
    registrationNumber: '',
    branch: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: ''
    // registrationNo, name, email, password, department, idPhoto, dob
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [otp, setOtp] = React.useState('');
  const [enteredOtp, setEnteredOtp] = React.useState('');

  useEffect(() => {
    setStepNumber(1);
  }, [open]);

  const registrationInstructions = [
    {
      step: 'Step 1:',
      instruction: "Upload a clear photo of your college ID card."
    },
    {
      step: 'Step 2:',
      instruction: "Click the 'Continue to Verify' button to proceed."
    },
    {
      step: 'Step 3:',
      instruction: "Enter the OTP sent to your registered email to complete the verification process."
    },
    {
      step: 'Note:',
      instruction: "Ensure the college ID photo is clear and all details are visible for successful verification."
    }
  ];

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError(null);
  };

  const handleContinueToUpload = async () => {
    setLoading(true);
    if (selectedFile) {
      try {
        const response = await uploadImageToCloudinary(selectedFile);
        console.log('Response:', response);

        try {
          const extractedText = await extractTextFromImage(response.imageUrl);
          setImageUrl(response.imageUrl);
          console.log('Extracted text:', extractedText);
          setFormData({
            fullName: extractedText['Full Name'].toLowerCase(),
            registrationNumber: extractedText['Registration Number'].toLowerCase(),
            branch: extractedText['Branch'].toLowerCase(),
            dateOfBirth: extractedText['Date of Birth'].toLowerCase(),
            email: extractedText['Registration Number'].toLowerCase() + '@sggs.ac.in',
            password: '',
            confirmPassword: ''
          })

        } catch (error) {
          console.error('Failed to extract text from image', error);
        }



        setStepNumber(3);

      } catch (error) {
        console.error('Failed to extract text from image', error);
      }
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const sendOtp = async () => {
    try {
      console.log('Sending OTP to:', formData.email);
      const response = await getOtp(formData.email);
      setOtp(response.otp);
    }
    catch (error) {
      console.error('Failed to send OTP', error);
    }
    
    setStepNumber(4);
  }

  const registerThisUser = () => {
    console.log('Entered OTP:', enteredOtp);
    console.log('OTP:', otp);
    if(enteredOtp != otp) {

      alert('Incorrect OTP. Please try again.');
    }
    if(enteredOtp == otp) {
      registerUser(formData, imageUrl);
      console.log('Registering user:', formData);
    }
    
  }

  return (
    <React.Fragment>
      <Link
        level="title-sm"
        onClick={() => setOpen(true)}
      >
        Sign up!
      </Link>

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

          {stepNumber === 1 &&
            <>
              <Typography
                component="h2"
                id="modal-title"
                level="h3"
                textColor="inherit"
                sx={{
                  fontWeight: 'lg', mb: 2
                }}
              >
                Instructions
              </Typography>
              <br />

              {registrationInstructions.map((instruction, index) => <div key={index}>
                <Typography
                  component="h2"
                  id="modal-title"
                  level="h4"
                  textColor="inherit"
                  sx={{ fontWeight: 'md', mt: 1 }}
                >
                  {instruction.step}
                </Typography>
                <br />
                <Typography id="modal-desc" textColor="text.tertiary">
                  {instruction.instruction}
                </Typography></div>
              )}

              <Button onClick={() => setStepNumber(2)} size="md" sx={{ my: 2 }}>Continue</Button>
            </>}

          {stepNumber === 2 &&
            <>
              <Typography
                component="h2"
                id="modal-title"
                level="h3"
                textColor="inherit"
                sx={{
                  fontWeight: 'lg', mb: 2, fontSize: '2rem'
                }}
              >
                Upload your College ID
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: "auto",
                  gap: 2,
                }}>
                <DropZone selectedFile={selectedFile} setSelectedFile={setSelectedFile} />

              </Box>
              <Button onClick={handleContinueToUpload} disabled={selectedFile === null}>
                Continue
              </Button>
            </>}

          {stepNumber === 3 &&
            <>
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
                  handleSubmit();
                }}
              >
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input name="fullName" value={formData.fullName} onChange={handleInputChange} autoFocus required />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Registration Number</FormLabel>
                    <Input name="registrationNumber" value={formData.registrationNumber} onChange={handleInputChange} required />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Branch</FormLabel>
                    <Input name="branch" value={formData.branch} onChange={handleInputChange} required />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />
                  </FormControl>
                  <FormControl>
                    <FormLabel>email</FormLabel>
                    <Input name="email" value={formData.email} onChange={handleInputChange} required />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input name="password" type="password" value={formData.password} onChange={handleInputChange} required />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} required />
                  </FormControl>
                  {passwordError && (
                    <Typography color="danger" sx={{ mt: 1 }}>
                      {passwordError}
                    </Typography>
                  )}
                </Stack>
                <Button type="submit" size="md" sx={{ my: 2, fontSize: '1rem' }} onClick={() => sendOtp()}>Send OTP</Button>
              </form>
            </>}

          {stepNumber === 4 &&
            <>
              <Typography
                component="h2"
                id="modal-title"
                level="h3"
                textColor="inherit"
                sx={{
                  fontWeight: 'lg', mb: 2, fontSize: '2rem'
                }}
              >
                Enter OTP
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: "auto",
                  gap: 2,
                  py: 2
                }}>
              <OTPInput enteredOtp={enteredOtp} setEnteredOtp={setEnteredOtp} />
              </Box>
            <Button onClick={registerThisUser} disabled={enteredOtp.length !== 6}>
                Verify and Continue
              </Button>
            </>}
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
