import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { FocusTrap } from '@mui/base/FocusTrap';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

import CreateRoundedIcon from '@mui/icons-material/CreateRounded';

import Layout from './Layout';
import Navigation from './Navigation';
import Mails from './Mails';
import EmailContent from './EmailContent';
import WriteEmail from './WriteEmail';
import { IconButton, Stack } from '@mui/joy';
import { closeEmailContent, toggleComplainPane, toggleEmailContent } from '../utils';
import { Complaint } from '../../../types/types';
import { getAllComplaints, getAllComplaintSenders, getMyComplaints } from '../../../services/complaints.service';


export interface Sender {
  _id: string;
  name: string;
  email: string;
}

export default function ComplaintRoom() {

  const [open, setOpen] = React.useState(false);
  const [selectedComplaint, setSelectedComplaint] = React.useState(0);
  const [complaints, setComplaints] = React.useState<Complaint[] | null>(null);
  const [senders, setSenders] = React.useState<Sender[] | null>([]);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(0);


    const fetchApplications = async () => {
      try {
        let response;
        if (selectedIndex === 0) {
          response = await getAllComplaints();
        } else {
          response = await getMyComplaints();
        }
        // response = await getAllApplications();
        console.log('Applications:', response);
        setComplaints(response);
        return;
      } catch (error) {
        console.error('Failed to fetch applications:', error);
        return error;
      }
    }
    React.useEffect(() => {
      
      fetchApplications();
    }, [selectedIndex]);

  const fetchSenders = async () => {
    try {
      const response = await getAllComplaintSenders();
      console.log('Senders:', response);
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
  

  // const complaints : Complaint[] = [
  //   {
  //     "title": "Poor Wi-Fi Connectivity in Hostel",
  //     "complaintTo": "IT Department",
  //     "description": "The Wi-Fi in the hostel is extremely slow and frequently disconnects. This is affecting our ability to attend online classes and complete assignments.",
  //     "student": "65b9087c24d4adf22ada711d", // Replace with a valid Student _id
  //     "keepAnonymousCount": 3,
  //     "status": "Pending",
  //     "attachments": [
  //       "https://example.com/wifi-issue-1.jpg",
  //       "https://example.com/wifi-issue-2.jpg"
  //     ]
  //   },
  //   {
  //     "title": "Unhygienic Food in Mess",
  //     "complaintTo": "Mess Committee",
  //     "description": "The food served in the mess is often unhygienic and of poor quality. Several students have reported stomach issues after eating.",
  //     "student": "65b9087c24d4adf22ada711e", // Replace with a valid Student _id
  //     "keepAnonymousCount": 5,
  //     "status": "Under Review",
  //     "attachments": [
  //       "https://example.com/mess-food-1.jpg",
  //       "https://example.com/mess-food-2.jpg"
  //     ]
  //   },
  //   {
  //     "title": "Broken Furniture in Classroom",
  //     "complaintTo": "Maintenance Department",
  //     "description": "Several chairs and desks in Room 205 are broken and need immediate repair. This is causing inconvenience during lectures.",
  //     "student": "65b9087c24d4adf22ada711f", // Replace with a valid Student _id
  //     "keepAnonymousCount": 2,
  //     "status": "Resolved",
  //     "attachments": [
  //       "https://example.com/broken-furniture-1.jpg"
  //     ]
  //   },
  //   {
  //     "title": "No Water Supply in Hostel",
  //     "complaintTo": "Hostel Management",
  //     "description": "There has been no water supply in the hostel for the past 24 hours. This is causing severe inconvenience to all residents.",
  //     "student": "65b9087c24d4adf22ada7120", // Replace with a valid Student _id
  //     "keepAnonymousCount": 0,
  //     "status": "Rejected",
  //     "attachments": []
  //   },
  //   {
  //     "title": "Loud Noise from Construction Site",
  //     "complaintTo": "Administration",
  //     "description": "The construction work near the hostel is causing excessive noise, especially during early morning hours, disturbing our sleep.",
  //     "student": "65b9087c24d4adf22ada7121", // Replace with a valid Student _id
  //     "keepAnonymousCount": 1,
  //     "status": "Pending",
  //     "attachments": [
  //       "https://example.com/construction-noise-1.jpg"
  //     ]
  //   }
  // ]

  React.useEffect(() => {
    return () => {
      closeEmailContent();
    };
  }, []);
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />

      <Layout.SideDrawer
        sx={{
          display: { sm: 'none' },
          position: { xs: 'fixed', sm: 'sticky' },
          transform: {
            xs: 'translateX(calc(100% * (var(--ComplainPane-slideIn, 0) - 1)))',
            sm: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 100,
          width: '100%',
          top: 52,
        }}
        onClose={() => toggleComplainPane()}
      >
        <Navigation selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      </Layout.SideDrawer>

      <Layout.SideDrawer
        sx={{
          display: { sm: 'none' },
          position: { xs: 'fixed', sm: 'sticky' },
          transform: {
            xs: 'translateX(calc(-100% * (var(--EmailContent-slideIn, 0) - 1)))',
            sm: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 100,
          width: '100%',
          top: 52,
        }}
        onClose={() => toggleEmailContent()}
      >
        {
          complaints != null && complaints.length != 0 && selectedComplaint !== -1 && (
            <EmailContent complaint={complaints[selectedComplaint]} />
          )
        }    
          </Layout.SideDrawer>


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
            <Box sx={{ alignItems: 'center', gap: 1 }}>
              <Stack
                direction="row"
                spacing={{ xs: 1, md: 2 }}
                sx={{ alignItems: 'center' }}
              >
                <IconButton
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                  onClick={() => toggleComplainPane()}
                >
                  <ArrowBackIosNewRoundedIcon />
                </IconButton>
                <div>
                  <Typography level="title-lg" textColor="text.secondary" component="h1">
                    All Complaints
                  </Typography>
                  <Typography level="title-sm" textColor="text.tertiary">
                    5 complaints
                  </Typography>
                </div>
              </Stack>


            </Box>
            <Button
              size="sm"
              startDecorator={<CreateRoundedIcon />}
              onClick={() => setOpen(true)}
              sx={{ ml: 'auto' }}
            >
              File Complaint
            </Button>
            <FocusTrap open={open} disableAutoFocus disableEnforceFocus>
              <WriteEmail senders={senders} open={open} onClose={() => setOpen(false)} />
            </FocusTrap>
          </Box>
          {
            complaints != null && complaints.length != 0 && <Mails complaints={complaints} selectedComplaint={selectedComplaint} setSelectedComplaint={setSelectedComplaint} />
          }
        </Layout.SidePane>
        <Layout.Main>
          {
            complaints != null && complaints.length != 0 && selectedComplaint !== -1 && (
              <EmailContent complaint={complaints[selectedComplaint]} />
            )
          }
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}
