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
        <Sheet
          sx={{
            bgcolor: 'background.level1',
            borderRadius: 'sm',
            p: 1.5,
            my: 1.5,
            display: 'flex',
            gap: 2,
            '& > div': { flex: 1 },
          }}
        >
          <div>
            <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
              Articles
            </Typography>
            <Typography sx={{ fontWeight: 'lg' }}>34</Typography>
          </div>
          <div>
            <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
              Followers
            </Typography>
            <Typography sx={{ fontWeight: 'lg' }}>980</Typography>
          </div>
          <div>
            <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
              Rating
            </Typography>
            <Typography sx={{ fontWeight: 'lg' }}>8.9</Typography>
          </div>
        </Sheet>
        <Box>
          <p>Lorem ipsum dolor sit, amet sit, amesit, amer adipisicing elum.</p>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
          <Button variant="outlined" color="neutral">
            Chat
          </Button>
          <Button variant="solid" color="primary">
            Follow
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CandidateCard



