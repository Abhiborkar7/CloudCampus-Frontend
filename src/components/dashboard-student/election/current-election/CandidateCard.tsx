import { Card, Typography } from '@mui/joy'
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import AspectRatio from '@mui/joy/AspectRatio';
import CardContent from '@mui/joy/CardContent';
import Box from '@mui/joy/Box';

const CandidateCard = () => {
  return (
    <Card
      orientation="horizontal"
      sx={{
        width: '100%',
        height: '350px',
        flexWrap: 'wrap',
        overflow: 'auto',
        '@media (max-width: 600px)': {
          height: '500px',
        },
      }}
    >
      <AspectRatio flex maxHeight={182} sx={{ minWidth: 182 }}>
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
          srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent>
        <Typography sx={{ fontSize: 'xl', fontWeight: 'lg' }}>
          Alex Morrison
        </Typography>
        <Typography
          level="body-sm"
          textColor="text.tertiary"
          sx={{ fontWeight: 'lg' }}
        >
          Computer Science & Engineering
        </Typography>
       
        <Box>
          <p>Lorem ipsum dolor sit, amet sit, amesit, amer adipisicing elum.</p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam ratione nostrum maiores tempore, sit cupiditate commodi ea? Quidem eaque saepe necessitatibus ad, blanditiis esse asperiores obcaecati possimus tenetur! Distinctio, eius.
        </Box>
      </CardContent>
    </Card>
  )
}

export default CandidateCard



