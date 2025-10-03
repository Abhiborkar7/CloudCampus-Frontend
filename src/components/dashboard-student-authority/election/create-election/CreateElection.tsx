import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CandidateCard from './CandidateCard';
import VotingRoom from './VotingRoom';
import { fetchCurrentElection } from '../../../../services/elections.service';
import { AddElectionForm } from './AddElectionForm';



interface Candidate {
  candidateId: string;
  candidateName: string;
  uid: string;
  voteCount: string;
}

interface PositionResult {
  positionId: string;
  positionTitle: string;
  candidates: Candidate[];
}

export default function CreateElection() {

  const [ongoingElections, setOngoingElections] = React.useState<PositionResult[]>([]);
  React.useEffect(() => {
    fetchOngoingElections();
  }
    , []);
  const fetchOngoingElections = async () => {
    try {
      const response = await fetchCurrentElection();
      console.log(response);
      // if (response && response.data) {
      //   console.log(response.data);
      // } else {
      //   console.error('No data found in the response');
      // }
      setOngoingElections(response);
    } catch (error) {
      console.error('Failed to fetch ongoing elections', error);
    }
  }
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 2,
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
          <Header />

          {/* header complete */}
          <Typography
            sx={{
              mt: 2,
              mb: 1,
              fontWeight: 'bold',
              fontSize: { xs: 'h4', sm: 'h3' },
            }}
            level="h3" >
            Candidates List
          </Typography>

          <AddElectionForm />


          <div>
            <Typography
              sx={{
                mt: 2,
                mb: 1,
                fontWeight: 'bold',
                fontSize: { xs: 'h4', sm: 'h3' },
              }}
              level="h3" >
              {/* {election.allPositionResults.positionTitle} */}
            </Typography>

            <Box sx={{
              height: '100%',
              width: '100%',
              display: 'grid',
              columnGap: 7,
              rowGap: 7,
              gridTemplateColumns: 'repeat(2, 1fr)',
              '@media (max-width: 600px)': {
                gridTemplateColumns: 'repeat(1, 1fr)',
              }
            }}>
              <CandidateCard />
              <CandidateCard />
              <CandidateCard />
              <CandidateCard />
              <CandidateCard />
              <CandidateCard />
              <CandidateCard />
              <CandidateCard />

            </Box>
          </div>

        </Box>
      </Box>
    </CssVarsProvider>
  );
}


const Header = () => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="small" />}
          sx={{ pl: 0 }}
        >
          <Link
            underline="none"
            color="neutral"
            href="#some-link"
            aria-label="Home"
          >
            <HomeRoundedIcon />
          </Link>
          <Link
            underline="hover"
            color="neutral"
            href="#some-link"
            sx={{ fontSize: 12, fontWeight: 500 }}
          >
            Dashboard
          </Link>
          <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
            Current Election
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: 'flex',
          mb: 1,
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <Typography level="h2" component="h1">
          Current Election
        </Typography>
      </Box>
    </>
  )
}
