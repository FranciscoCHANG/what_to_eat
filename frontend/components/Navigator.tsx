import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Typography from '@mui/material/Typography';

const categories = [
  {
    id: '餐廳管理',
    children: [
      {
        id: '店家列表',
        icon: <StoreIcon />,
        active: true,
      },
      { id: '菜單管理', icon: <MenuBookIcon /> },
      { id: '營業時間', icon: <AccessTimeIcon /> },
      { id: '使用者管理', icon: <PeopleIcon /> },
    ],
  },
  {
    id: '系統功能',
    children: [
      { id: '資料分析', icon: <AnalyticsIcon /> },
      { id: '系統設定', icon: <SettingsIcon /> },
      { id: '推薦系統', icon: <RestaurantIcon /> },
    ],
  },
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
  const [selectedItem, setSelectedItem] = React.useState('專案概覽');

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
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              ...item,
              ...itemCategory,
            }}
            selected={selectedItem === '專案概覽'}
            onClick={() => handleItemClick('專案概覽')}
          >
            <ListItemIcon>
              <HomeIcon sx={{ color: selectedItem === '專案概覽' ? '#F57C00' : 'inherit' }} />
            </ListItemIcon>
            <ListItemText 
              primary="專案概覽"
              primaryTypographyProps={{
                fontWeight: selectedItem === '專案概覽' ? 600 : 400,
              }}
            />
          </ListItemButton>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id}>
            <ListItem
              sx={{
                ...itemCategory,
                cursor: 'default',
                '&:hover': {
                  bgcolor: 'transparent',
                },
              }}
            >
              <ListItemText primary={id} />
            </ListItem>
            {children.map(({ id: childId, icon }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton
                  sx={{
                    ...item,
                    pl: 4,
                  }}
                  selected={selectedItem === childId}
                  onClick={() => handleItemClick(childId)}
                >
                  <ListItemIcon sx={{ color: selectedItem === childId ? '#F57C00' : 'inherit' }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={childId} 
                    primaryTypographyProps={{
                      fontWeight: selectedItem === childId ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 1, mb: 1, opacity: 0.3 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
