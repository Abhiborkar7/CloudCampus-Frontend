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
  // Build steps from recipients
  const steps = ['Sent', ...recipients.map((r) => r.name)];

  // Find current active step (first pending or last approved)
  const activeStep = React.useMemo(() => {
    const pendingIndex = recipients.findIndex((r) => r.status === 'pending');
    if (pendingIndex !== -1) return pendingIndex + 1; // +1 because step[0] = Sent
    return steps.length - 1; // all approved
  }, [recipients, steps]);

  // Function to get color based on status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'green';
      case 'pending':
        return 'blue';
      case 'rejected':
        return 'red';
      case 'sent back':
        return 'orange';
      default:
        return 'gray';
    }
  };

  return (
    <Stepper sx={{ width: '100%' }}>
      {steps.map((step, index) => {
        const recipient = index === 0 ? null : recipients[index - 1];
        const textColor = recipient ? getStatusColor(recipient.status) : 'black';

        return (
          <Step
            key={step}
            indicator={
              <StepIndicator
                variant={activeStep === index ? 'solid' : 'soft'}
                color={activeStep >= index ? 'primary' : 'neutral'}
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
                color: textColor,
              }}
            >
              <strong>{step}</strong>
              {recipient && (
                <span style={{ fontSize: '0.8rem', color: textColor }}>
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
