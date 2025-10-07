import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { FocusTrap } from '@mui/base/FocusTrap';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import Layout from './Layout';
import Navigation from './Navigation';
import Mails from './Mails';
import WriteEmail from './WriteEmail';
import { closeEmailContent } from '../utils';
import EmailContent from './EmailContent';
import { uploadImageToCloudinary } from '../../../services/uploadImage.service';
import { getAllApplications, getMyApplications, getAllApplicationSenders } from '../../../services/application.service';
import { ApplicationFormat, Sender} from '../../../types/application';


export default function ApplicationPage() {
  const [open, setOpen] = React.useState(false);
  const [fileUrl, setFileUrl] = React.useState('');
  const [selectedApplication, setSelectedApplication] = React.useState<ApplicationFormat | null>(null);
  const [applications, setApplications] = React.useState<ApplicationFormat[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(0);
  const [senders, setSenders] = React.useState<Sender[] | null>([]);


  const fetchSenders = async () => {
    try {
      const response = await getAllApplicationSenders();
      setSenders(response);
      return;
    } catch (error) {
      console.error('Failed to fetch senders:', error);
      return error;
    }
  }
  
  React.useEffect(() => {
    fetchSenders();
  }, []);


  const fetchApplications = async () => {
    try {
      let response;
      if (selectedIndex === 0) {
        response = await getAllApplications();
      } else {
        response = await getMyApplications();
      }
      setApplications(response);
      return;
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      return error;
    }
  }
  React.useEffect(() => {
    fetchApplications();
  }, [selectedIndex]);

  const handleFileUpload = async (file: File) => {
    try {
      const response = await uploadImageToCloudinary(file);
      setFileUrl(response.url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  React.useEffect(() => {
    return () => {
      closeEmailContent();
    };
  }, []);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Layout.Root>
        <Layout.SideNav>
          <Navigation selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
        </Layout.SideNav>
        <Layout.SidePane>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button
              size="sm"
              startDecorator={<CreateRoundedIcon />}
              onClick={() => setOpen(true)}
              sx={{ ml: 'auto' }}
            >
              New Application
            </Button>
            <FocusTrap open={open} disableAutoFocus disableEnforceFocus>
              <WriteEmail senders={senders} open={open} onClose={() => setOpen(false)} />
            </FocusTrap>
          </Box>
          <Mails applications={applications} selectedApplication={selectedApplication} setSelectedApplication={setSelectedApplication} />
        </Layout.SidePane>
        <Layout.Main>
          {selectedApplication && (
            <EmailContent application={selectedApplication} setApplications={setApplications} />
        )}
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}
