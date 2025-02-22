import React, { useEffect, useState } from 'react';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { Button, Modal, ModalClose } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import CandidateSmallCard from './CandidateSmallCard';
import ImageUpload from './ImageUpload';

export const VotingSectionModel = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [stepNumber, setStepNumber] = useState<number>(1);


  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number>(101)
  useEffect(() => {
    setStepNumber(1)
  }, [open])
  const votingInstructions = [
    {
      step: 'Step 1:',
      instruction: "Click the 'Generate Random List' button below to proceed."
    },
    {
      step: 'Step 2:',
      instruction: "You will see a list of candidates along with their unique candidate numbers. Write down the candidate number you wish to vote for on a blank paper."
    },
    {
      step: 'Step 3:',
      instruction: "Click the 'Continue to Vote' button again to move to the next step."
    },
    {
      step: 'Step 4:',
      instruction: "In the next screen, you will need to take a selfie with a piece of paper showing the candidate number you wrote down. Make sure the number and your face is clearly visible in the selfie.\nOnce your selfie is captured, your vote will be registered!"
    },
    {
      step: 'Note',
      instruction: "Make sure the candidate number is clearly visible in the photo for your vote to be valid."
    }
  ];

  const candidateList = [
    {
      img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286",
      name: "John Doe",
      branch: "Computer Science",
      candidateNumber: 101
    },
    {
      img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286",
      name: "Jane Smith",
      branch: "Electrical Engineering",
      candidateNumber: 102
    },
    {
      img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286",
      name: "Samuel Lee",
      branch: "Mechanical Engineering",
      candidateNumber: 103
    },
    {
      img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286",
      name: "Anna White",
      branch: "Civil Engineering",
      candidateNumber: 104
    },
    {
      img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286",
      name: "Michael Brown",
      branch: "Biotechnology",
      candidateNumber: 105
    }
  ];

  const handleSubmit = () => {
    const formData = {
      imageUrl,
      selectedCandidateId
    };
    console.log("Form Data: ", formData);
  };



  return (
    <React.Fragment>

      <Box
        sx={{
          width: 250,
          height: 250,
          m: 2,
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 15,
          bgcolor: 'primary.700',
          transition: 'background-color 0.3s ease-out',
          '&:hover': {
            bgcolor: 'primary.400',
          },
          '@media (max-width: 600px)': {
            marginBottom: 15,
          },
        }}
        onClick={() => setOpen(true)}
      >
        <HowToVoteIcon sx={{ fontSize: '10rem' }} />
      </Box>


      {/* Modal */}

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
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

          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />

          {stepNumber == 1 &&
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

              {votingInstructions.map((instruction, index) => <div key={index}>
                <Typography
                  component="h2"
                  id="modal-title"
                  level="h4"
                  textColor="inherit"
                  sx={{ fontWeight: 'md', mt: 1 }}
                >
                  {instruction.step}
                </Typography>
                <Typography id="modal-desc" textColor="text.tertiary">
                  {instruction.instruction}
                </Typography></div>
              )}

              <Button onClick={() => setStepNumber(2)} size="md" sx={{ my: 2 }}>Generate Random List</Button>
            </>}

          {stepNumber == 2 &&
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
                Candidate List
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: "auto",
                  gap: 2,
                }}>

                {
                  candidateList.map((cardItem) => (
                    <CandidateSmallCard onClick={() => setSelectedCandidateId(cardItem.candidateNumber)} cardItem={cardItem} selected={selectedCandidateId === cardItem.candidateNumber} />
                  ))
                }
              </Box>

              <Button onClick={() => setStepNumber(3)} size="md" sx={{ my: 2, fontSize: '1rem' }}>Continue to Vote</Button>
            </>}


          {stepNumber == 3 &&
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
                Take Selfie
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: "auto",
                  gap: 2,
                }}>
                <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />

              </Box>
            <Button size="md" sx={{ my: 2, fontSize: '1rem' }} disabled={imageUrl === null} onClick={handleSubmit}>Submit you Vote</Button>
            </>}

        </Sheet>
      </Modal>
    </React.Fragment>
  );
}


