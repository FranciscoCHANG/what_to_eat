import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Navigator from './Navigator';
import Header from './Header';

// 導入頁面元件
import StoreList from './dashboard/StoreList';
import MenuManagement from './dashboard/MenuManagement';
import BusinessHours from './dashboard/BusinessHours';
import UserManagement from './dashboard/UserManagement';
// 已移除：資料分析、系統設定、推薦系統
// 將專案概覽改為使用者管理

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
      {'版權所有 © '}
      <Link color="inherit" href="https://mui.com/">
        您的網站
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#FFE0B2',
      main: '#FF9800',
      dark: '#F57C00',
    },
    secondary: {
      light: '#FFCCBC',
      main: '#FF5722',
      dark: '#E64A19',
    },
    success: {
      light: '#C8E6C9',
      main: '#4CAF50',
      dark: '#388E3C',
    },
    warning: {
      light: '#FFE082',
      main: '#FFC107',
      dark: '#FFA000',
    },
    info: {
      light: '#B3E5FC',
      main: '#03A9F4',
      dark: '#0288D1',
    },
    background: {
      default: '#FFF8F0',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3E2723',
      secondary: '#8D6E63',
    },
    grey: {
      50: '#FFF8F0',
      100: '#FFECB3',
      200: '#FFE082',
      300: '#FFD54F',
      400: '#FFCA28',
      500: '#FFC107',
      600: '#FFB300',
      700: '#FFA000',
      800: '#FF8F00',
      900: '#FF6F00',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(255, 152, 0, 0.08)',
          border: '1px solid rgba(255, 152, 0, 0.04)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(255, 152, 0, 0.12)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(255, 152, 0, 0.08)',
          border: '1px solid rgba(255, 152, 0, 0.04)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          boxShadow: '0 2px 4px rgba(255, 152, 0, 0.3)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(255, 152, 0, 0.4)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '2px',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
          minHeight: 48,
          padding: '12px 20px',
          borderRadius: '8px 8px 0 0',
          transition: 'all 0.2s ease-in-out',
          '&.Mui-selected': {
            backgroundColor: 'rgba(255, 152, 0, 0.08)',
            color: '#F57C00',
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 152, 0, 0.04)',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFF8F0',
          borderRadius: '12px 12px 0 0',
          padding: '8px 8px 0 8px',
          '& .MuiTabs-indicator': {
            backgroundColor: '#FF9800',
            height: 3,
            borderRadius: '3px 3px 0 0',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#3E2723',
          boxShadow: '0 1px 3px rgba(255, 152, 0, 0.08)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid rgba(255, 152, 0, 0.08)',
          boxShadow: '2px 0 8px rgba(255, 152, 0, 0.08)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          transition: 'all 0.2s ease-in-out',
          '&.Mui-selected': {
            backgroundColor: 'rgba(255, 152, 0, 0.08)',
            color: '#F57C00',
            '&:hover': {
              backgroundColor: 'rgba(255, 152, 0, 0.12)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 152, 0, 0.04)',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
          color: 'inherit',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
        outlined: {
          borderWidth: '1.5px',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: '#FFE082',
        },
        bar: {
          borderRadius: 4,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
  spacing: 8,
});

const drawerWidth = 256;

export default function Paperbase() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentSection, setCurrentSection] = React.useState('使用者管理');
  const [currentTab, setCurrentTab] = React.useState(0);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    setCurrentTab(0); // 重置標籤頁
    console.log(`切換到: ${section}`);
  };

  const handleTabChange = (tabValue: number) => {
    setCurrentTab(tabValue);
    console.log(`標籤頁切換到: ${tabValue}`);
  };

  const renderContent = () => {
    switch (currentSection) {
      case '店家列表':
        return <StoreList currentTab={currentTab} />;
      case '菜單管理':
        return <MenuManagement currentTab={currentTab} />;
      case '營業時間':
        return <BusinessHours currentTab={currentTab} />;
      case '使用者管理':
        return <UserManagement currentTab={currentTab} />;
      // 移除不需要的頁面
      // '資料分析' | '系統設定' | '推薦系統'
      case '專案概覽':
        return <UserManagement currentTab={currentTab} />;
      default:
        return <StoreList currentTab={currentTab} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              onNavigate={handleNavigate}
            />
          )}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
            onNavigate={handleNavigate}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header 
            onDrawerToggle={handleDrawerToggle} 
            currentSection={currentSection} 
            onNavigate={handleNavigate}
            onTabChange={handleTabChange}
            currentTab={currentTab}
          />
          <Box component="main" sx={{ flex: 1, py: 4, px: 3, bgcolor: '#FFF8F0' }}>
            {renderContent()}
          </Box>
          <Box component="footer" sx={{ p: 3, bgcolor: '#FFFFFF', borderTop: '1px solid rgba(255, 152, 0, 0.08)' }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
