import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepButton from '@mui/joy/StepButton';
import StepIndicator from '@mui/joy/StepIndicator';
import Check from '@mui/icons-material/Check';

type Recipient = {
  name: string;
  email: string;
  status: string; // 'approved', 'pending', 'rejected', 'sent back'
  role?: string;
};

export default function ButtonStepper({ recipients }: { recipients: Recipient[] }) {
  // Build steps from recipients + extra "Approved" step at end
  const steps = ['Sent', ...recipients.map((r) => r.name), 'Approved'];

  // Determine active step
  const activeStep = React.useMemo(() => {
    const pendingIndex = recipients.findIndex((r) => r.status === 'pending');
    if (pendingIndex !== -1) return pendingIndex + 1; // +1 because step[0] = Sent

    // If any recipient is rejected or sent back, active step should stop there
    const blockedIndex = recipients.findIndex(
      (r) => r.status.toLowerCase() === 'rejected' || r.status.toLowerCase() === 'sent back to applicant'
    );
    if (blockedIndex !== -1) return blockedIndex + 1;

    return steps.length - 1; // all approved
  }, [recipients, steps]);

  // Function to get circle color based on status
  const getIndicatorColor = (recipient: Recipient | null, index: number) => {
    if (!recipient) {
      // first (Sent) or last (Approved) step
      if (index === steps.length - 1) {
        // Final Approved step only green if all approved
        const allApproved = recipients.every((r) => r.status.toLowerCase() === 'approved');
        return allApproved ? 'success' : 'primary';
      }
      return 'primary';
    }

    switch (recipient.status.toLowerCase()) {
      case 'rejected':
        return 'danger';
      case 'sent back':
        return 'warning';
      default:
        return 'primary'; // blue for approved/pending
    }
  };

  return (
    <Stepper sx={{ width: '100%' }}>
      {steps.map((step, index) => {
        const recipient = index === 0 || index === steps.length - 1 ? null : recipients[index - 1];

        return (
          <Step
            key={step}
            indicator={
              <StepIndicator
                variant={activeStep === index ? 'solid' : 'soft'}
                color={getIndicatorColor(recipient, index)} // circle color
              >
                {activeStep > index ? <Check /> : index + 1}
              </StepIndicator>
            }
            sx={[
              activeStep > index && {
                '&::after': { bgcolor: 'primary.solidBg' },
              },
            ]}
          >
            <StepButton
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                color: 'blue', // text always blue
              }}
            >
              <strong>{step}</strong>
              {recipient && (
                <span style={{ fontSize: '0.8rem', color: 'blue' }}>
                  {recipient.role ? `${recipient.role} • ` : ''}
                  {recipient.email}
                </span>
              )}
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
}
