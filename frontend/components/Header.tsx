import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const lightColor = 'rgba(142, 110, 99, 0.6)';

interface HeaderProps {
  onDrawerToggle: () => void;
  currentSection?: string;
  onNavigate?: (section: string) => void;
  onTabChange?: (tabValue: number) => void;
  currentTab?: number; // 新增 currentTab prop
}

export default function Header(props: HeaderProps) {
  const { onDrawerToggle, currentSection = '店家列表', onNavigate, onTabChange, currentTab = 0 } = props;
  const [tabValue, setTabValue] = React.useState(currentTab);

  // 同步 currentTab prop 和本地狀態
  React.useEffect(() => {
    setTabValue(currentTab);
  }, [currentTab]);

  // 當頁面切換時重置標籤頁選中狀態
  React.useEffect(() => {
    setTabValue(0);
  }, [currentSection]);

  // 移除系統設定與幫助相關行為

  const handleNotifications = () => {
    console.log('通知按鈕被點擊');
    // 這裡可以添加通知功能，例如打開通知面板
    if (onNavigate) {
      onNavigate('資料分析');
    }
  };

  const handleAvatarClick = () => {
    console.log('頭像被點擊');
    if (onNavigate) {
      onNavigate('使用者管理');
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    console.log(`標籤頁切換到: ${newValue}`);
    
    // 通知父元件標籤頁變更
    if (onTabChange) {
      onTabChange(newValue);
    }
  };

  // 根據當前頁面動態顯示標題
  const getPageTitle = () => {
    switch (currentSection) {
      case '專案概覽': return '專案概覽';
      case '店家列表': return '店家管理';
      case '菜單管理': return '菜單管理';
      case '營業時間': return '營業時間管理';
      case '使用者管理': return '使用者管理';
      case '資料分析': return '資料分析';
      case '系統設定': return '系統設定';
      case '推薦系統': return '推薦系統';
      default: return 'What to Eat';
    }
  };

  // 根據當前頁面動態顯示標籤頁（作為子功能）
  const getTabsForSection = () => {
    switch (currentSection) {
      case '專案概覽':
        return [
          { label: '專案概覽', value: 0 },
          { label: '詳細資料', value: 1 },
          { label: '設定', value: 2 },
          { label: '統計', value: 3 }
        ];
      case '店家列表':
        return [
          { label: '所有店家', value: 0 },
          { label: '新增店家', value: 1 }
        ];
      case '菜單管理':
        return [
          { label: '菜單列表', value: 0 },
          { label: '新增菜單', value: 1 }
        ];
      case '營業時間':
        return [
          { label: '時間表', value: 0 },
          { label: '批量設定', value: 1 },
          { label: '特殊日期', value: 2 }
        ];
      case '使用者管理':
        return [
          { label: '使用者列表', value: 0 },
          { label: '新增使用者', value: 1 },
          { label: '權限管理', value: 2 },
          { label: '登入記錄', value: 3 }
        ];
      case '資料分析':
        return [
          { label: '概覽', value: 0 },
          { label: '使用者分析', value: 1 },
          { label: '銷售分析', value: 2 },
          { label: '趨勢報告', value: 3 }
        ];
      case '系統設定':
        return [
          { label: '一般設定', value: 0 },
          { label: '通知設定', value: 1 },
          { label: '安全設定', value: 2 },
          { label: '備份還原', value: 3 }
        ];
      case '推薦系統':
        return [
          { label: '演算法設定', value: 0 },
          { label: '個人化設定', value: 1 },
          { label: '測試結果', value: 2 },
          { label: '效能監控', value: 3 }
        ];
      default:
        return [
          { label: '概覽', value: 0 },
          { label: '詳細資料', value: 1 },
          { label: '設定', value: 2 },
          { label: '統計', value: 3 }
        ];
    }
  };

  const tabs = getTabsForSection();

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <Box sx={{ display: { sm: 'none', xs: 'block' } }}>
              <IconButton
                color="inherit"
                aria-label="開啟選單"
                onClick={onDrawerToggle}
                edge="start"
                sx={{ 
                  color: '#8D6E63',
                  '&:hover': { backgroundColor: 'rgba(255, 152, 0, 0.04)' }
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Link
              href="/"
              variant="body2"
              sx={{
                textDecoration: 'none',
                color: lightColor,
                fontWeight: 500,
                '&:hover': {
                  color: '#F57C00',
                },
              }}
              rel="noopener noreferrer"
              target="_blank"
            >
              前往首頁
            </Link>
            {/* 移除右上角通知圖示與功能 */}
            <Tooltip title="使用者管理">
              <IconButton 
                color="inherit" 
                aria-label="帳戶" 
                sx={{ 
                  p: 0.5,
                  color: '#8D6E63',
                  '&:hover': { backgroundColor: 'rgba(255, 152, 0, 0.04)' }
                }}
                onClick={handleAvatarClick}
              >
                <Avatar src="/vercel.svg" alt="我的頭像" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0, backgroundColor: '#FFF8F0' }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <Typography 
              color="inherit" 
              variant="h5" 
              component="h1" 
              sx={{ 
                flexGrow: 1, 
                color: '#3E2723',
                fontWeight: 600,
                letterSpacing: '-0.01em'
              }}
            >
              {getPageTitle()}
            </Typography>
            {/* 移除系統設定按鈕與問號幫助圖示 */}
          </Box>
        </Toolbar>
      </AppBar>
      <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ 
            color: 'inherit',
            '& .MuiTab-root': {
              minHeight: '48px',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#ffffff',
            }
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}
