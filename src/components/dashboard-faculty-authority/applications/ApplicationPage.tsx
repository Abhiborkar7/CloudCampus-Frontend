import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { FocusTrap } from '@mui/base/FocusTrap';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import Layout from '../../dashboard/applications/Layout';
import Navigation from './Navigation';
import Mails from './Mails';
import WriteEmail from '../../dashboard/applications/WriteEmail';
import EmailContent from '../../dashboard/applications/EmailContent';
import { closeEmailContent } from '../utils';
import { uploadImageToCloudinary } from '../../../services/uploadImage.service';
import { getAllApplications, getFacultyApplications, getAllApplicationSenders } from '../../../services/application.service';
import { Application, Sender } from '../../../types/application';


export default function ApplicationPage() {
  const [open, setOpen] = React.useState(false);
  const [fileUrl, setFileUrl] = React.useState('');
  const [selectedApplication, setSelectedApplication] = React.useState<Application | null>(null);
  const [applications, setApplications] = React.useState<Application[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [senders, setSenders] = React.useState<Sender[]>([]);

  // 🔹 Fetch senders once
  React.useEffect(() => {
    (async () => {
      try {
        const response = await getAllApplicationSenders();
        setSenders(response);
      } catch (error) {
        console.error('Failed to fetch senders:', error);
      }
    })();
  }, []);

  // 🔹 Fetch applications based on selected index
  React.useEffect(() => {
    (async () => {
      try {
        const response =
          selectedIndex === 0 ? await getAllApplications() : await getFacultyApplications();
          console.log(response);
        setApplications(response);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      }
    })();
  }, [selectedIndex]);

  // Set initial email as 0th 
  React.useEffect(() => {
    if (applications.length > 0) {
      setSelectedApplication(applications[0]);
    } else {
      setSelectedApplication(null);
    }
  }, [applications]);

  // 🔹 File upload handler
  const handleFileUpload = async (file: File) => {
    try {
      const response = await uploadImageToCloudinary(file);
      setFileUrl(response.url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // 🔹 Cleanup
  React.useEffect(() => {
    return () => {
      closeEmailContent();
    };
  }, []);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Layout.Root sx={{ height: '100vh', display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar Navigation */}
        <Layout.SideNav sx={{ flexShrink: 0 }}>
          <Navigation selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
        </Layout.SideNav>

        {/* Applications list + "New" button */}
        <Layout.SidePane
          sx={{
            width: 320,
            minWidth: 450,
            maxWidth: 450,
            flexShrink: 0,
            borderRight: '1px solid var(--joy-palette-divider)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* New Application Button */}
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button
              size="sm"
              startDecorator={<CreateRoundedIcon />}
              onClick={() => setOpen(true)}
            >
              New Application
            </Button>
          </Box>

          {/* WriteEmail Modal */}
          <FocusTrap open={open} disableAutoFocus disableEnforceFocus>
            <WriteEmail senders={senders} open={open} onClose={() => setOpen(false)} />
          </FocusTrap>

          {/* Mail list */}
          <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            <Mails
              applications={applications}
              selectedApplication={selectedApplication}
              setSelectedApplication={setSelectedApplication}
            />
          </Box>
        </Layout.SidePane>

        {/* Application details */}
        <Layout.Main
          sx={{
            flexGrow: 1,
            minWidth: 0,
            p: 2,
            overflowY: 'auto',
            backgroundColor: 'var(--joy-palette-background-surface)',
          }}
        >
          {selectedApplication ? (
            <EmailContent application={selectedApplication} />
          ) : (
            <Box sx={{ p: 2, textAlign: 'center', color: 'text.tertiary' }}>
              No application selected
            </Box>
          )}
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}
