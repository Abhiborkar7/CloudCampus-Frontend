import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { toggleEmailContent } from '../utils';
import { Complaint } from '../../../types/types';
// export interface Application {
//   _id: string;
//   from: {
//     _id: string;
//     name: string;
//     email: string;
//   };
//   title: string;
//   to: {
//     _id: string;
//     email: string;
//   }[];
//   body: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

export interface Application {
  _id: string;
  title: string;
  complaintTo: string[]; // List of people the complaint is addressed to
  description: string;
  student: string | null; // Null if anonymous
  keepAnonymousCount: number;
  status: 'Pending' | 'Resolved' | 'In Progress'; // Add other possible statuses if needed
  attachments: string[]; // Array of attachment URLs or file paths
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  __v: number;
}



interface EmailListProps {
  selectedApplication: number;
  setSelectedApplication: (complaint: number) => void;
  applications: Application[];
}

export default function Mails({ applications, setSelectedApplication, selectedApplication }: EmailListProps) {

  return (
    <List
      sx={{
        [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
          borderLeft: '2px solid',
          borderLeftColor: 'var(--joy-palette-primary-outlinedBorder)',
        },
      }}
    >
      {applications && applications.map((item, index) => (
        <div key={index}>
          <ListItem onClick={() => { setSelectedApplication(index); toggleEmailContent();}}>
            <ListItemButton
              {...(index === selectedApplication && {
                selected: true,
                color: 'neutral',
              })}
              sx={{ p: 2 }}
            >
              <Box sx={{ pl: 2, width: '100%' }}>
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {
                      item.complaintTo.map((to) => (
                        <Typography level="body-xs">{to}</Typography>
                      ))
                    }
                    <Box
                      sx={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '99px',
                      }}
                    />
                  </Box>
                  <Typography level="body-xs" textColor="text.tertiary">
                    {new Date(item.createdAt).toLocaleString()}
                  </Typography>
                </Box>
                <div>
                  <Typography level="title-sm" sx={{ mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography level="body-sm">{item.description}</Typography>
                </div>
              </Box>
            </ListItemButton>
          </ListItem>
          <ListDivider sx={{ m: 0 }} />
        </div>
      ))}
    </List>
  );
}
