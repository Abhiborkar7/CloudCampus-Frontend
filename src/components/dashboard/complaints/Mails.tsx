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


interface EmailListProps {
  selectedComplaint: number;
  setSelectedComplaint: (complaint: number) => void;
  complaints: Complaint[];
}

export default function Mails({ complaints, setSelectedComplaint, selectedComplaint }: EmailListProps) {

  return (
    <List
      sx={{
        [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
          borderLeft: '2px solid',
          borderLeftColor: 'var(--joy-palette-primary-outlinedBorder)',
        },
      }}
    >
      {complaints.map((item, index) => (
        <div key={index}>
          <ListItem onClick={() => { setSelectedComplaint(index); toggleEmailContent();}}>
            <ListItemButton
              {...(index === selectedComplaint && {
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
                    <Typography level="body-xs">{item.complaintTo}</Typography>
                    <Box
                      sx={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '99px',
                      }}
                    />
                  </Box>
                  <Typography level="body-xs" textColor="text.tertiary">
                    {item.status}
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
