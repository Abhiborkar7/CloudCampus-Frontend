import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Checkbox from '@mui/joy/Checkbox';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ClickAwayListener } from '@mui/base';

import { toggleEmailContent } from '../utils';
import { ApplicationFormat } from '../../../types/application';

// Status filters
const statusFilters = ['All', 'approved', 'pending', 'sent back', 'rejected'] as const;

// Label colors
const labelColors: Record<string, string> = {
  'Leave Request': '#4caf50',
  'Library Access': '#ff9800',
  'IT Support': '#2196f3',
  default: '#9e9e9e',
};

interface EmailListProps {
  selectedApplication: ApplicationFormat | null;
  setSelectedApplication: (app: ApplicationFormat | null) => void;
  applications: ApplicationFormat[];
}

export default function Mails({
  applications,
  setSelectedApplication,
  selectedApplication,
}: EmailListProps) {
  const [statusFilter, setStatusFilter] = React.useState<typeof statusFilters[number]>('All');
  const [labelFilter, setLabelFilter] = React.useState<string[]>([]);
  const [labelMenuOpen, setLabelMenuOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const labels = Array.from(new Set(applications.map((app) => app.label))).sort();

  const filteredApplications = applications.filter((app) => {
    const statusMatch =
      statusFilter === 'All' ||
      app.to.some((recipient) => recipient.status.toLowerCase() === statusFilter.toLowerCase());

    const labelMatch =
      labelFilter.length === 0 || labelFilter.includes(app.label);

    return statusMatch && labelMatch;
  });

  const handleLabelMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setLabelMenuOpen((prev) => !prev); // toggle open/close
  };

  const handleClickAway = () => {
    setLabelMenuOpen(false); // close menu on outside click
  };

  const toggleLabel = (label: string) => {
    setLabelFilter((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const clearLabels = () => setLabelFilter([]);

  return (
    <Box>
      {/* Status Filter Buttons */}
      <Box sx={{ display: 'flex', gap: 1, p: 1, flexWrap: 'wrap' }}>
        {statusFilters.map((f) => (
          <Button
            key={f}
            variant={statusFilter === f ? 'solid' : 'outlined'}
            size="sm"
            onClick={() => setStatusFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}

        {/* Label Filter Dropdown */}
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box>
            <Button
              size="sm"
              startDecorator={<FilterListIcon />}
              onClick={handleLabelMenuClick}
              variant={labelFilter.length > 0 ? 'solid' : 'outlined'}
            >
              Labels {labelFilter.length > 0 ? `(${labelFilter.length})` : ''}
            </Button>

            <Menu
              open={labelMenuOpen}
              anchorEl={anchorEl}
              placement="bottom-start"
              sx={{ mt: 0.5 }}
            >
              {labels.map((label) => (
                <MenuItem key={label} onClick={() => toggleLabel(label)}>
                  <Checkbox
                    checked={labelFilter.includes(label)}
                    sx={{ mr: 1 }}
                  />
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: labelColors[label] ?? labelColors.default,
                      mr: 1,
                    }}
                  />
                  {label}
                </MenuItem>
              ))}
              {labelFilter.length > 0 && (
                <MenuItem 
                  onClick={clearLabels} 
                  sx={{ justifyContent: 'center', color: 'danger.500' }}
                >
                  Clear
                </MenuItem>
              )}
            </Menu>
          </Box>
        </ClickAwayListener>
      </Box>

      {/* Application List */}
      <List
        sx={{
          [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
            borderLeft: '3px solid',
            borderLeftColor: 'var(--joy-palette-primary-outlinedBorder)',
            backgroundColor: 'var(--joy-palette-background-level1)',
          },
        }}
      >
        {filteredApplications.length > 0 ? (
          filteredApplications.map((item) => (
            <React.Fragment key={item._id}>
              <ListItem
                onClick={() => {
                  setSelectedApplication(item); // pass the actual application object
                  toggleEmailContent();
                }}
              >
                <ListItemButton
                  selected={selectedApplication?._id === item._id}
                  sx={{ p: 2, alignItems: 'flex-start' }}
                >
                  <Box sx={{ width: '100%' }}>
                    {/* Header row */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {item.to.map((to, i) => (
                          <Typography key={i} level="body-xs" textColor="text.secondary">
                            {to.email || to.authority} ({to.status})
                          </Typography>
                        ))}
                      </Box>
                      <Typography level="body-xs" textColor="text.tertiary">
                        {new Date(item.createdAt).toLocaleDateString()} •{' '}
                        {new Date(item.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Typography>
                    </Box>

                    {/* Label + Title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: labelColors[item.label] ?? labelColors.default,
                        }}
                      />
                      <Typography level="title-sm">{item.title}</Typography>
                    </Box>

                    {/* Body preview */}
                    <Typography
                      level="body-sm"
                      textColor="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {item.body}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
              <ListDivider sx={{ m: 0 }} />
            </React.Fragment>
          ))
        ) : (
          <Typography level="body-sm" textColor="text.tertiary" sx={{ p: 2, textAlign: 'center' }}>
            No applications found
          </Typography>
        )}
      </List>
    </Box>
  );
}
