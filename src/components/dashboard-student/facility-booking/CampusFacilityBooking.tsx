import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Selector1 from './components/Selector1';
import Selector2 from './components/Selector2';
import CustomDatePicker from './components/CustomDatePicker';
import { Button } from '@mui/joy';
import HourBookingComponent from './components/HourBookingComponent';

export default function CampusFacilityBooking() {

  const [selector1value, setSelector1value] = React.useState<number>(0);
  const [selector2value, setSelector2value] = React.useState<number>(0);
  const [date, setDate] = React.useState<Date | null>(null);


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

          <Selector1 setSelector1value={setSelector1value} />
          <Selector2 selector1value={selector1value} setSelector2value={setSelector2value} />


          {/* <Box sx={{ mb: 2 }} /> */}

          <div >
            <CustomDatePicker selectedDate={date} onChange={setDate} />
            {date && <p style={{ marginTop: "1px" }}>Selected Date: {date.toDateString()}</p>}
            <Button type="submit" onClick={() => { }}>Submit</Button>
          </div>

          {/* <HourBookingComponent /> */}


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
            Facility Booking
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: 'flex',
          mb: 5,
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <Typography level="h2" component="h1">
          Facility Booking
        </Typography>
      </Box>
    </>
  )
}