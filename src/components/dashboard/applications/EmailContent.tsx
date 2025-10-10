import * as React from 'react';

import Divider from '@mui/joy/Divider';
import Tooltip from '@mui/joy/Tooltip';
import ButtonStepper from '../../dashboard/applications/ButtonStepper';
import { ApplicationFormat } from '../../../types/application';
import { useAuth } from '../../../context/AuthContext';
import { approveApplication, rejectApplication, sendBackApplication} from '../../../services/application.service';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Sheet, Typography, Box, Button, FormControl, FormLabel, Textarea, Chip } from '@mui/joy';

// Label colors
const labelColors: Record<string, string> = {
  'Leave Request': '#4caf50',
  'Library Access': '#ff9800',
  'IT Support': '#2196f3',
  default: '#9e9e9e',
};


export default function EmailContent({application,setApplications,}: {application: ApplicationFormat;setApplications: React.Dispatch<React.SetStateAction<Application[]>>;}){

  const { faculty, facultyAuthority, studentAuthority, role } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState<'reject' | 'sendBack' | null>(null);
  const [Reason, setReason] = useState("");


    const currentUserEmail =
    faculty?.email || facultyAuthority?.email || studentAuthority?.email || null;

  // Determine if we should display reason
  const rejectedOrSentBack = application.to.filter(
    (recipient) => ['rejected', 'sent back'].includes(recipient.status.toLowerCase()) && application.reason
  );

  const handleApprove = async () => {
    toast.promise(
      approveApplication(application._id)
      .then((res) => {
        // Update the state
        setApplications((prev) =>
          prev.map((app) =>
            app._id === res.application._id ? res.application : app
          )
        );
        return res.message; // this is used by toast.success
      }),
      {
        loading: 'Approving...',
        success: 'Application approved successfully!',
        error: '',
      }
    );
  };



  const handleReject = async (reason:string) => {
    toast.promise(
      rejectApplication(application._id, reason).then(() => {
        
        setApplications((prev) =>
          prev.map((app) => {
            if (app._id !== application._id) return app;

            const updatedTo = app.to.map((recipient: ApplicationFormat["to"][number]) => {
              if (recipient.authority === currentUserEmail) {
                return {
                  ...recipient,
                  status: 'rejected',
                };
              }
              return recipient;
            });

            return {
              ...app,
              to: updatedTo,
              reason: reason ?? "",
              status: 'rejected',
              isApproved: false,
            };
          })
        );
      }),
      {
        loading: 'Rejecting...',
        success: 'Application rejected successfully!',
        error: '',
      }
    );
  };

  // Todo : send back testing 
  const handleSendBack = async (reason:string) => {
    toast.promise(
      sendBackApplication(application._id, reason).then(() => {
        
        setApplications((prev) =>
          prev.map((app) => {
            if (app._id !== application._id) return app;

            const updatedTo = app.to.map((recipient: ApplicationFormat["to"][number]) => {
              if (recipient.authority === currentUserEmail) {
                return {
                  ...recipient,
                  status: 'returned back to applicant',
                };
              }
              return recipient;
            });

            return {
              ...app,
              to: updatedTo,
              reason: reason ?? "",
              status: 'returned back to applicant',
              isApproved: false,
            };
          })
        );
      }),
      {
        loading: 'Sending Back to Applicant...',
        success: 'Application sent back successfully!',
        error: '',
      }
    );
  };

  return (
    <Sheet variant="outlined" sx={{ minHeight: 500, borderRadius: 'sm', p: 2, mb: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Label Dot */}
          <Tooltip title={application.label} size="sm" variant="soft">
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: labelColors[application.label] ?? labelColors.default,
              }}
            />
          </Tooltip>
          <Typography level="title-sm" textColor="text.primary" sx={{ mb: 0.5 }}>
            {application?.from.name}
          </Typography>
        </Box>
        <Typography level="body-xs" textColor="text.tertiary">
          {new Date(application?.createdAt).toLocaleString()}
        </Typography>
      </Box>

      <Divider sx={{ mt: 2 }} />

      {/* Subject + Recipients */}
      <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <Typography level="title-lg" textColor="text.primary">
          {application?.title}
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* From */}
          <Box>
            <Typography level="body-sm" sx={{ mr: 1, display: 'inline-block' }}>
              From:
            </Typography>
            <Tooltip size="sm" title="Copy email" variant="outlined">
              <Chip size="sm" variant="soft" color="primary">
                {application?.from.email}
              </Chip>
            </Tooltip>
          </Box>

          {/* To recipients */}
          <Box>
            <Typography level="body-sm" sx={{ mr: 1, display: 'inline-block' }}>
              To:
            </Typography>
            {application?.to?.map((item, idx) => (
              <Tooltip key={idx} size="sm" title={`Status: ${item.status}`} variant="outlined">
                <Chip
                  size="sm"
                  variant="soft"
                  color={
                    item.status === 'approved'
                      ? 'success'
                      : item.status === 'returned back to applicant'
                      ? 'warning'
                      : item.status === 'rejected'
                      ? 'danger'
                      :'neutral'
                  }
                  sx={{ mr: 1 }}
                >
                  {item.name}
                </Chip>
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Body */}
      <Typography level="body-sm" sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}>
        {application?.body}
      </Typography>

      {/* Display reason if rejected or sent back */}
      {rejectedOrSentBack.length > 0 && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'background.level1', borderRadius: 'sm' }}>
          <Typography level="body-sm" fontWeight="md" sx={{ mb: 1 }}>
            Reason for rejection / sent back:
          </Typography>
          <Typography level="body-sm" sx={{ whiteSpace: 'pre-line' }}>
            {application.reason}
          </Typography>
        </Box>
      )}

      <Divider />

      {/* Progress bar */}
      <Box sx={{ display: 'flex', gap: 1, mt: 5, alignItems: 'center', justifyContent: 'center' }}>
        <ButtonStepper recipients={application.to} />
      </Box>

      {/* Faculty approve button */}
      {currentUserEmail === application.currentRecipient && application.status === 'pending' && (
          <Box sx={{ display: 'flex', gap: 1, mt: 5, alignItems: 'center', justifyContent: 'center' }}>
            <Button onClick={handleApprove}>
              Approve
            </Button>
            <Button 
              onClick={() => {
                setActionType('sendBack');
                setOpenDialog(true);
              }} color='warning'>
              Send Back to Applicant
            </Button>
            <Button  
              onClick={() => {
                setActionType('reject');
                setOpenDialog(true);
              }} 
              color='danger'>
              Reject
            </Button>
          </Box>
      )}

      {/* Reject Reason Dialog */}
      {openDialog && (
        <Sheet
          variant="outlined"
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            p: 3,
            borderRadius: 2,
            zIndex: 9999,
            bgcolor: 'background.body',
            boxShadow: 4,
          }}
        >
          <Typography level="title-md" sx={{ mb: 2 }}>
            {actionType === 'reject'
              ? 'Enter Reason for Rejection'
              : 'Enter Reason for Sending Back'}
          </Typography>
        
          <FormControl>
            <FormLabel>Reason</FormLabel>
            <Textarea
              minRows={3}
              value={Reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason..."
            />
          </FormControl>
        
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setOpenDialog(false);
                setReason('');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color={actionType === 'reject' ? 'danger' : 'warning'}
              onClick={() => {
                if(actionType === 'reject'){
                  handleReject(Reason);
                }
                else{
                  handleSendBack(Reason);
                }
                setOpenDialog(false);
                setReason('');
              }}
              disabled={!Reason.trim()}
            >
              Submit
            </Button>
          </Box>
        </Sheet>
      )}

    </Sheet>
  );
}
