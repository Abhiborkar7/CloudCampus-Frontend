import * as React from 'react';

import Divider from '@mui/joy/Divider';
import Tooltip from '@mui/joy/Tooltip';
import ButtonStepper from '../../dashboard/applications/ButtonStepper';
import { ApplicationFormat } from '../../../types/application';
import { useAuth } from '../../../context/AuthContext';
import { approveApplication, rejectApplication } from '../../../services/application.service';
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
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");


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

  const handleSendBack = async () => {
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
            <Button onClick={handleSendBack} color='warning'>
              Send Back to Applicant
            </Button>
            <Button  onClick={() => setOpenRejectDialog(true)} color='danger'>
              Reject
            </Button>
          </Box>
      )}

      {/* Reject Reason Dialog */}
      {openRejectDialog && (
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
            Enter Reason for Rejection
          </Typography>
        
          <FormControl>
            <FormLabel>Reason</FormLabel>
            <Textarea
              minRows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter reason..."
            />
          </FormControl>
        
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setOpenRejectDialog(false);
                setRejectReason('');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={() => {
                handleReject(rejectReason);
                setOpenRejectDialog(false);
                setRejectReason('');
              }}
              disabled={!rejectReason.trim()}
            >
              Submit
            </Button>
          </Box>
        </Sheet>
      )}

    </Sheet>
  );
}
