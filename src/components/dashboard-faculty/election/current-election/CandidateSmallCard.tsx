import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';

interface CardItemProps {
  cardItem: {
    img: string,
    name: string,
    branch: string,
    candidateNumber: number
  },
  selected: boolean;
  onClick?: () => void;
}

export default function CandidateSmallCard({ cardItem, selected, ...props }: CardItemProps) {
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: '100%',
        position: 'relative',
        borderColor: selected ? 'green' : 'transperent',
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      }}
      {...props}
    >
      {selected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CheckCircleIcon color="success" fontSize="large" />
        </motion.div>
      )}
      <AspectRatio ratio="1" sx={{ width: 90 }}>
        <img
          src={cardItem.img}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description">
          {cardItem.name}
        </Typography>
        <Typography
          level="body-sm"
          aria-describedby="card-description"
          sx={{ mb: 1 }}
        >
          <Typography sx={{ color: 'text.tertiary' }}>
            {cardItem.branch}
          </Typography>
        </Typography>
        <Typography sx={{ pointerEvents: 'none' }}>
          {cardItem.candidateNumber}
        </Typography>
      </CardContent>
    </Card>
  );
}
