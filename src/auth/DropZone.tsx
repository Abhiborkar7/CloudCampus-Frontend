import * as React from 'react';
import Card, { CardProps } from '@mui/joy/Card';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { useState } from 'react';

interface DropZoneProps extends CardProps {
  icon?: React.ReactElement<any>;
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const DropZone: React.FC<DropZoneProps> = ({
  icon,
  selectedFile,
  setSelectedFile,
  sx,
  ...other
}) => {
    const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };


  return (
    <Card
      variant="soft"
      {...other}
      sx={[
        {
          borderRadius: 'sm',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'center',
          px: 3,
          flexGrow: 1,
          boxShadow: 'none',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <AspectRatio
        ratio="1"
        variant="solid"
        color="primary"
        sx={{ minWidth: 32, borderRadius: '50%', '--Icon-fontSize': '16px' }}
      >
        <div>{icon ?? <FileUploadRoundedIcon />}</div>
      </AspectRatio>
      <Typography level="body-sm" sx={{ textAlign: 'center' }}>
        <Link
          component="button"
          overlay
          onClick={() => fileInput?.click()}
        >
          Click to upload
        </Link>
      </Typography>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={input => setFileInput(input)}
        onChange={handleFileChange}
      />

    </Card>
  );
};

export default DropZone;
