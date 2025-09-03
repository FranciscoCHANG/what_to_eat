import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Typography from '@mui/material/Typography';

const restaurantChildren = [
  { id: '店家列表', icon: <StoreIcon />, active: true },
  { id: '菜單管理', icon: <MenuBookIcon /> },
  { id: '營業時間', icon: <AccessTimeIcon /> },
];

const item = {
  py: '8px',
  px: 3,
  color: '#8D6E63',
  borderRadius: 2,
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 152, 0, 0.08)',
    color: '#F57C00',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgba(255, 152, 0, 0.08) inset',
  py: 2,
  px: 3,
  color: '#5D4037',
  fontWeight: 600,
  fontSize: '0.875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const brandItem = {
  py: 3,
  px: 3,
  color: '#F57C00',
  fontWeight: 700,
  fontSize: '1.5rem',
  letterSpacing: '-0.02em',
  marginBottom: 2,
};

interface NavigatorProps extends DrawerProps {
  onNavigate?: (section: string) => void;
}

export default function Navigator(props: NavigatorProps) {
  const { onNavigate, ...other } = props;
  const [selectedItem, setSelectedItem] = React.useState('使用者管理');
  const [restaurantOpen, setRestaurantOpen] = React.useState(true);

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId);
    console.log(`導航到: ${itemId}`);
    
    if (onNavigate) {
      onNavigate(itemId);
    }
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...brandItem }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <RestaurantIcon sx={{ fontSize: 28, color: 'inherit' }} />
            <Typography variant="h6" component="span">
              What to Eat
            </Typography>
          </Box>
        </ListItem>
        {/* 獨立大卡：使用者管理 */}
        <ListItem sx={{ px: 2, py: 1.5 }} disablePadding>
          <ListItemButton
            onClick={() => handleItemClick('使用者管理')}
            sx={{
              mx: 2,
              mt: 0,
              mb: '15px',
              borderRadius: 3,
              bgcolor: 'rgba(255, 152, 0, 0.06)',
              '&:hover': { bgcolor: 'rgba(255, 152, 0, 0.12)' },
              boxShadow: '0 1px 3px rgba(255,152,0,0.08)'
            }}
          >
            <ListItemIcon sx={{ color: '#8D6E63' }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText
              primary="使用者管理"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItemButton>
        </ListItem>

        {/* 可折疊大卡：餐廳管理 */}
        <ListItem sx={{ px: 2, pt: 0 }} disablePadding>
          <ListItemButton
            onClick={() => setRestaurantOpen(!restaurantOpen)}
            sx={{
              mx: 2,
              my: 0,
              borderRadius: 3,
              bgcolor: 'rgba(255, 152, 0, 0.06)',
              '&:hover': { bgcolor: 'rgba(255, 152, 0, 0.12)' },
              boxShadow: '0 1px 3px rgba(255,152,0,0.08)'
            }}
          >
            <ListItemIcon sx={{ color: '#8D6E63' }}>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="餐廳管理" primaryTypographyProps={{ fontWeight: 700 }} />
            {restaurantOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={restaurantOpen} timeout="auto" unmountOnExit>
          {restaurantChildren.map(({ id: childId, icon }) => (
            <ListItem disablePadding key={childId}>
              <ListItemButton
                sx={{
                  ...item,
                  mx: 4,
                  my: 0.5,
                  borderRadius: 2,
                  bgcolor: selectedItem === childId ? 'rgba(255, 152, 0, 0.12)' : 'transparent',
                }}
                selected={selectedItem === childId}
                onClick={() => handleItemClick(childId)}
              >
                <ListItemIcon sx={{ color: selectedItem === childId ? '#F57C00' : 'inherit' }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={childId}
                  primaryTypographyProps={{ fontWeight: selectedItem === childId ? 600 : 400 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </Collapse>
        <Divider sx={{ mt: 1, mb: 1, opacity: 0.3 }} />
      </List>
    </Drawer>
  );
}
