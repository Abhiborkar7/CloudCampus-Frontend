import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Search from './components/Search';
import HeaderSection from './components/HeaderSection';
import FacilityCard from './components/FacilityCard';

import BookingModal from './components/BookingModal';

export default function CurrentElection() {
  const facilities = [
    {
      title: "Modern Classroom - 50 seats",
      category: "Classroom in Science Building",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2aM-abelimAUSHK6xtdw3brLk-QIdCRL48Q&s",
    },
    {
      title: "Auditorium - 200 seats",
      category: "Main Hall",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCBYMCAKBUX_o3OqnkgXOCDU9yBJf7BYgQ0w&s",
    },
    {
      title: "Basketball Court - Outdoor",
      category: "Sports Complex",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNaIrhGSE_jBFWOZ5Am1vGBudsM-KbKdkNRA&s",
    },
    {
      title: "Library Study Room",
      category: "Library",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTqIBZK45_VtmtyDD6423AbnTYXvegCWFvMw&s",
    },
    {
      title: "Computer Lab - 30 Computers",
      category: "Technology Center",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8glXpnhStxpRtiuJ-tne8hFQQHgqCnpCGw&s",
    },
    {
      title: "Music Room - Piano & Instruments",
      category: "Arts Department",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHlX2lxKw6pAtroo0ei-Ur8M5v6XJysTYF_A&s",
    },
  ];


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
          <HeaderSection />
          <Search />
          <Box sx={{ mb: 2 }} />

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
            {facilities.map((facility, index) => (
              <FacilityCard key={index} {...facility} />
            ))}
          </Box>

          <BookingModal />

          
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