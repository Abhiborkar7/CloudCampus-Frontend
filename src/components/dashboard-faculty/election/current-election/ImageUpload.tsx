import React, { useEffect, useRef } from 'react';
import { Box, Button, Sheet, Typography } from '@mui/joy';
import ReplayIcon from '@mui/icons-material/Replay';

interface ImageUploadProps {
  imageUrl: string | null;
  setImageUrl: (url: Blob | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imageUrl, setImageUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing webcam:', err);
    }
  };

  useEffect(() => {


    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        streamRef.current = null;
      }
      setImageUrl(null)
    };
  }, []);


  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context && videoRef.current.readyState === 4) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

        const imageDataUrl = canvasRef.current.toDataURL('image/png');
        setImageUrl(imageDataUrl);
      }
    }
  };

  const refreshImage = () => {
    setImageUrl(null);
    startCamera();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // minHeight: '100vh',
      }}
    >
      <Sheet
        color="neutral" variant="soft"
        sx={{
          // width: '300px',
          height: '400px',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          textAlign: 'center',
          flexDirection: 'column',
        }}
      >
        {!imageUrl ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            width="100%"
            height="auto"
            style={{ borderRadius: '8px', marginBottom: '10px' }}
          />
        ) : (
          <Box sx={{ marginTop: '10px' }}>
            <Typography sx={{ marginBottom: '10px' }}>
              Captured Image:
            </Typography>
            <img src={imageUrl} alt="Captured" width="100%" style={{ borderRadius: '8px' }} />
          </Box>
        )}


        <div style={{ display: 'flex', gap: '10px' }}>

          <Button onClick={captureImage} sx={{ marginBottom: '10px' }}>
            Capture Image
          </Button>
          <Button onClick={refreshImage} sx={{ marginBottom: '10px' }}>
            <ReplayIcon />
          </Button>
        </div>


        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </Sheet>
    </Box>
  );
};

export default ImageUpload;
