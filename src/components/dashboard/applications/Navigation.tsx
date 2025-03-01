import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import OutboxRoundedIcon from '@mui/icons-material/OutboxRounded';
import DraftsRoundedIcon from '@mui/icons-material/DraftsRounded';
import AssistantPhotoRoundedIcon from '@mui/icons-material/AssistantPhotoRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Input } from '@mui/joy';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import { closeComplainPane } from '../utils';

export default function Navigation({ selectedIndex, setSelectedIndex }: { selectedIndex: number | null, setSelectedIndex: (index: number) => void }) {
  // const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log('Key pressed:', event.key);
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        console.log('Ctrl + K pressed');
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        } else {
          console.log('Search input not found');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const onOptionClick = (index: number) => {
    setSelectedIndex(index);
    closeComplainPane()
  };

  return (
    <List size="sm" sx={{ '--ListItem-radius': '8px', '--List-gap': '4px' }}>
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          transform: {
            xs: 'translateX(calc(100% * (var(--ComplainPane-slideIn, 0) - 1)))',
            sm: 'none',
          },
          gap: 1.5,
          alignItems: 'center',
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 100,
          width: '100%',
          top: 52,
        }}
      >
        <Input
          id="search-input"
          ref={searchInputRef}
          size="sm"
          variant="outlined"
          placeholder="Search anything…"
          startDecorator={<SearchRoundedIcon color="primary" />}
          endDecorator={
            <IconButton
              variant="outlined"
              color="neutral"
              sx={{ bgcolor: 'background.level1' }}
            >
              <Typography level="title-sm" textColor="text.icon">
                ⌘ K
              </Typography>
            </IconButton>
          }
          sx={{
            alignSelf: 'center',
            display: {
              sm: 'flex'
            },
          }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{ display: { xs: 'inline-flex', sm: 'none' }, alignSelf: 'center' }}
        >
          <SearchRoundedIcon />
        </IconButton>
      </Box> */}


      <ListItem nested>
        <ListSubheader sx={{ letterSpacing: '2px', fontWeight: '800' }}>
          Browse
        </ListSubheader>
        <List aria-labelledby="nav-list-browse">
          <ListItem>
            <ListItemButton
              onClick={() => onOptionClick(0)}
              selected={selectedIndex === 0}
            >
              <ListItemDecorator>
                <InboxRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>All Applications</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => onOptionClick(1)}
              selected={selectedIndex === 1}
            >
              <ListItemDecorator>
                <OutboxRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>My Applications</ListItemContent>
            </ListItemButton>
          </ListItem>

        </List>
      </ListItem>
    </List>
  );
}