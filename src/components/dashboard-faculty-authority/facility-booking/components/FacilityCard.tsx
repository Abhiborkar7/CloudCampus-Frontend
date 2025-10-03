import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import CardOverflow from '@mui/joy/CardOverflow';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type FacilityCardProps = {
  category: string;
  image: string;
  selected?: boolean;
  title: string;
};

export default function FacilityCard({ category, title, selected = false, image }: FacilityCardProps) {
  const [isSelected, setIsSelected] = React.useState(selected);
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        bgcolor: 'neutral.softBg',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        '&:hover': {
          boxShadow: 'lg',
          borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
        },
      }}
    >
      <CardOverflow>
        <AspectRatio
          ratio="1"
          flex
          sx={{ minWidth: { sm: 120, md: 160 } }}
        >
          <img alt={title} src={image} />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <div>
            <Typography level="body-sm">{category}</Typography>
            <Typography level="title-md">
              <Link overlay underline="none" href="#facility-card" sx={{ color: 'text.primary' }}>
                {title}
              </Link>
            </Typography>
          </div>
          <IconButton
            variant="plain"
            size="sm"
            color={isSelected ? 'success' : 'neutral'}
            onClick={() => setIsSelected((prev) => !prev)}
          >
            <CheckCircleIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
