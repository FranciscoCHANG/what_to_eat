import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import StorageIcon from '@mui/icons-material/Storage';

interface SystemSettingsProps {
  currentTab?: number;
}

export default function SystemSettings({ currentTab = 0 }: SystemSettingsProps) {
  const [notifications, setNotifications] = React.useState(true);
  const [autoBackup, setAutoBackup] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const handleSaveSettings = () => {
    console.log('儲存設定');
  };

  // 根據標籤頁渲染不同內容
  const renderTabContent = () => {
    switch (currentTab) {
      case 0: // 一般設定
        return (
          <Grid container spacing={3}>
            {/* 系統設定 */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SettingsIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      一般設定
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={darkMode}
                        onChange={(e) => setDarkMode(e.target.checked)}
                      />
                    }
                    label="暗色模式"
                  />
                  
                  <Box sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      label="系統語言"
                      variant="outlined"
                      size="small"
                      defaultValue="繁體中文"
                      select
                      SelectProps={{
                        native: true,
                      }}
                      sx={{ mb: 2 }}
                    >
                      <option value="zh-TW">繁體中文</option>
                      <option value="en-US">English</option>
                      <option value="ja-JP">日本語</option>
                    </TextField>
                    <TextField
                      fullWidth
                      label="時區"
                      variant="outlined"
                      size="small"
                      defaultValue="Asia/Taipei"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* 資料庫設定 */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <StorageIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      資料庫設定
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  
                  <TextField
                    fullWidth
                    label="資料庫主機"
                    variant="outlined"
                    size="small"
                    defaultValue="localhost"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="資料庫名稱"
                    variant="outlined"
                    size="small"
                    defaultValue="what_to_eat"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="連接池大小"
                    variant="outlined"
                    size="small"
                    defaultValue="10"
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* 儲存按鈕 */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button 
                  variant="contained" 
                  onClick={handleSaveSettings}
                  sx={{ mr: 2 }}
                >
                  儲存設定
                </Button>
                <Button variant="outlined">
                  重設為預設值
                </Button>
              </Box>
            </Grid>
          </Grid>
        );

      case 1: // 通知設定
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <NotificationsIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      通知設定
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications}
                        onChange={(e) => setNotifications(e.target.checked)}
                      />
                    }
                    label="啟用系統通知"
                  />
                  
                  <Box sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      label="通知郵件地址"
                      variant="outlined"
                      size="small"
                      defaultValue="admin@example.com"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="通知頻率"
                      variant="outlined"
                      size="small"
                      defaultValue="每日"
                      select
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="即時">即時</option>
                      <option value="每日">每日</option>
                      <option value="每週">每週</option>
                    </TextField>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      case 2: // 安全設定
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SecurityIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      安全設定
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={autoBackup}
                        onChange={(e) => setAutoBackup(e.target.checked)}
                      />
                    }
                    label="自動備份"
                  />
                  
                  <Box sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      label="Session 超時時間（分鐘）"
                      variant="outlined"
                      size="small"
                      defaultValue="30"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="密碼最小長度"
                      variant="outlined"
                      size="small"
                      defaultValue="8"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      case 3: // 備份還原
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              備份還原
            </Typography>
            <Typography variant="body2" color="text.secondary">
              系統備份和還原功能設定
            </Typography>
          </Box>
        );

      default:
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">
              請選擇要查看的功能
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        系統設定
      </Typography>
      
      {renderTabContent()}
    </Box>
  );
}
