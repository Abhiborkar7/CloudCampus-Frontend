import { useEffect, useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import LinearProgress from '@mui/joy/LinearProgress';
import { VotingSectionModel } from './VotingSectionModel';



export default function VotingRoom() {
  const startDate = new Date(2025, 1, 22, 0, 0, 0);
  const endDate = new Date(2025, 1, 25, 15, 0, 20);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const totalDuration = endDate.getTime() - startDate.getTime();
  const remainingTime = endDate.getTime() - currentDate.getTime();


  return (
    <Sheet color={remainingTime > 0 ? "primary" : "danger"} variant="plain" sx={{
      display: 'flex',
      position: 'relative',
      gap: 2,
      my: 2,
      p: 2,
      width: '100%',
      height: '500px',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}
    >
      {remainingTime > 0 ? <>
        <h1>Voting Started</h1>
        <VotingSectionModel />
      </> :
        <>
          <h1>Voting Ended</h1>
        </>
      }
      <RemainingTimeNotification remainingTime={remainingTime} totalDuration={totalDuration} />

    </Sheet>
  )
}

interface RemainingTimeNotificationProps {
  remainingTime: number;
  totalDuration: number;
}

const RemainingTimeNotification = ({ remainingTime, totalDuration }: RemainingTimeNotificationProps) => {
  const remainingTimePercentage = (remainingTime / totalDuration) * 100;


  const calculateRemainingTime = () => {
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    return `${days}d:${hours}h:${minutes}m:${seconds}s`;
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        m: 2,
        p: 2,
        borderRadius: 15,
        color: 'primary.50',
        fontWeight: 'bold',
        fontSize: 'lg',
        transition: 'background-color 0.3s ease-out'
      }}
    >
      {(remainingTime >= 0) && (
        <>
          <p>Remaining Time : {calculateRemainingTime()}</p>
          <LinearProgress
            determinate
            variant="outlined"
            color="neutral"
            size="sm"
            thickness={24}
            value={100 - remainingTimePercentage}
            sx={{
              '--LinearProgress-radius': '20px',
              '--LinearProgress-thickness': '24px',
            }}
          >
            <Typography
              level="body-xs"
              textColor="common.white"
              sx={{ fontWeight: 'xl', mixBlendMode: 'difference' }}
            >
              {`${remainingTimePercentage.toFixed(2)}%`} TIME REMAINING...
            </Typography>
          </LinearProgress>
        </>
      )}
    </Box>
  );
}

