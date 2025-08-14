import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface MenuManagementProps {
  currentTab?: number;
}

// 模擬菜單資料
const mockMenus = [
  { id: 1, name: '麥當勞菜單', store: '麥當勞', items: 25, status: '啟用' },
  { id: 2, name: '星巴克飲品', store: '星巴克', items: 15, status: '啟用' },
  { id: 3, name: '鼎泰豐點心', store: '鼎泰豐', items: 30, status: '啟用' },
];

export default function MenuManagement({ currentTab = 0 }: MenuManagementProps) {
  const handleAddMenu = () => {
    console.log('新增菜單');
  };

  const handleEditMenu = (menuId: number) => {
    console.log(`編輯菜單: ${menuId}`);
  };

  const handleViewMenu = (menuId: number) => {
    console.log(`查看菜單: ${menuId}`);
  };

  // 根據標籤頁渲染不同內容
  const renderTabContent = () => {
    switch (currentTab) {
      case 0: // 菜單列表
        return (
          <Grid container spacing={3}>
            {mockMenus.map((menu) => (
              <Grid item xs={12} sm={6} md={4} key={menu.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {menu.name}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      店家: {menu.store}
                    </Typography>
                    <Typography variant="body2">
                      項目數量: {menu.items}
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      狀態: {menu.status}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Button 
                        size="small" 
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => handleEditMenu(menu.id)}
                      >
                        編輯
                      </Button>
                      <Button 
                        size="small" 
                        color="secondary"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleViewMenu(menu.id)}
                      >
                        查看
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );

      case 1: // 新增菜單
        return (
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h6" gutterBottom>
              新增菜單
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              請填寫菜單基本資訊
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={handleAddMenu}
            >
              開始新增菜單
            </Button>
          </Box>
        );

      case 2: // 分類管理
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              菜單分類管理
            </Typography>
            <Typography variant="body2" color="text.secondary">
              管理菜單分類和標籤
            </Typography>
          </Box>
        );

      case 3: // 價格設定
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              價格設定
            </Typography>
            <Typography variant="body2" color="text.secondary">
              設定菜單項目價格和折扣
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          菜單管理
        </Typography>
        {currentTab === 0 && (
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleAddMenu}
          >
            新增菜單
          </Button>
        )}
      </Box>
      
      {renderTabContent()}
    </Box>
  );
}
