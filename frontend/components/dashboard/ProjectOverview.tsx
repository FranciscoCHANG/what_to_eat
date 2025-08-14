import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StarIcon from '@mui/icons-material/Star';
import SpeedIcon from '@mui/icons-material/Speed';

interface ProjectOverviewProps {
  currentTab?: number;
}

// 模擬專案統計資料
const projectStats = {
  totalUsers: 1234,
  totalStores: 89,
  totalMenus: 156,
  totalOrders: 5678,
  userGrowth: 12.5,
  storeGrowth: 8.3,
  orderGrowth: 15.7,
  satisfactionRate: 94.2
};

// 模擬熱門店家資料
const popularStores = [
  { id: 1, name: '麥當勞', rating: 4.5, orders: 1250, growth: '+15%', category: '速食' },
  { id: 2, name: '星巴克', rating: 4.3, orders: 980, growth: '+8%', category: '咖啡廳' },
  { id: 3, name: '鼎泰豐', rating: 4.7, orders: 750, growth: '+22%', category: '中式料理' },
  { id: 4, name: '肯德基', rating: 4.2, orders: 620, growth: '+5%', category: '速食' },
  { id: 5, name: '必勝客', rating: 4.1, orders: 480, growth: '+12%', category: '披薩' }
];

// 模擬系統狀態資料
const systemStatus = [
  { name: 'API 服務', status: '正常', uptime: '99.9%', color: 'success' },
  { name: '資料庫', status: '正常', uptime: '99.8%', color: 'success' },
  { name: '推薦引擎', status: '正常', uptime: '99.7%', color: 'success' },
  { name: '通知服務', status: '警告', uptime: '98.5%', color: 'warning' },
  { name: '備份系統', status: '正常', uptime: '99.9%', color: 'success' }
];

// 模擬最近活動
const recentActivities = [
  { id: 1, user: '張小明', action: '新增店家', target: '新竹拉麵店', time: '2 分鐘前', type: 'add' },
  { id: 2, user: '李小華', action: '更新菜單', target: '麥當勞', time: '15 分鐘前', type: 'update' },
  { id: 3, user: '王大明', action: '設定營業時間', target: '星巴克', time: '1 小時前', type: 'setting' },
  { id: 4, user: '系統', action: '自動備份', target: '資料庫', time: '2 小時前', type: 'system' },
  { id: 5, user: '趙小美', action: '新增使用者', target: '新員工', time: '3 小時前', type: 'add' }
];

// 模擬專案進度
const projectProgress = [
  { name: '核心功能開發', progress: 95, status: '即將完成', color: 'success' },
  { name: '使用者介面優化', progress: 80, status: '進行中', color: 'primary' },
  { name: 'API 整合', progress: 70, status: '進行中', color: 'primary' },
  { name: '測試與除錯', progress: 60, status: '進行中', color: 'warning' },
  { name: '效能優化', progress: 40, status: '規劃中', color: 'info' },
  { name: '部署準備', progress: 25, status: '規劃中', color: 'info' }
];

export default function ProjectOverview({ currentTab = 0 }: ProjectOverviewProps) {
  // 根據標籤頁渲染不同內容
  const renderTabContent = () => {
    switch (currentTab) {
      case 0: // 專案概覽
        return (
          <Grid container spacing={3}>
            {/* 主要統計卡片 */}
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      p: 2, 
                      borderRadius: 3, 
                      bgcolor: 'rgba(255, 152, 0, 0.1)',
                      mr: 2 
                    }}>
                      <PeopleIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                    </Box>
                    <Box>
                      <Typography color="textSecondary" gutterBottom variant="body2" fontWeight={500}>
                        總使用者數
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#3E2723' }}>
                        {projectStats.totalUsers.toLocaleString()}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                        <Typography variant="body2" color="success.main" fontWeight={500}>
                          +{projectStats.userGrowth}% 較上月
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      p: 2, 
                      borderRadius: 3, 
                      bgcolor: 'rgba(255, 87, 34, 0.1)',
                      mr: 2 
                    }}>
                      <RestaurantIcon sx={{ fontSize: 32, color: 'secondary.main' }} />
                    </Box>
                    <Box>
                      <Typography color="textSecondary" gutterBottom variant="body2" fontWeight={500}>
                        合作店家
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#3E2723' }}>
                        {projectStats.totalStores}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                        <Typography variant="body2" color="success.main" fontWeight={500}>
                          +{projectStats.storeGrowth}% 較上月
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      p: 2, 
                      borderRadius: 3, 
                      bgcolor: 'rgba(255, 183, 77, 0.1)',
                      mr: 2 
                    }}>
                      <MenuBookIcon sx={{ fontSize: 32, color: 'warning.main' }} />
                    </Box>
                    <Box>
                      <Typography color="textSecondary" gutterBottom variant="body2" fontWeight={500}>
                        菜單總數
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#3E2723' }}>
                        {projectStats.totalMenus}
                      </Typography>
                      <Typography variant="body2" color="warning.main" fontWeight={500} sx={{ mt: 1 }}>
                        平均每店 1.8 個
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      p: 2, 
                      borderRadius: 3, 
                      bgcolor: 'rgba(255, 193, 7, 0.1)',
                      mr: 2 
                    }}>
                      <StarIcon sx={{ fontSize: 32, color: 'warning.main' }} />
                    </Box>
                    <Box>
                      <Typography color="textSecondary" gutterBottom variant="body2" fontWeight={500}>
                        滿意度
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#3E2723' }}>
                        {projectStats.satisfactionRate}%
                      </Typography>
                      <Typography variant="body2" color="warning.main" fontWeight={500} sx={{ mt: 1 }}>
                        基於 5,678 個評價
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* 專案進度 */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: 'fit-content' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  專案開發進度
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {projectProgress.map((item) => (
                    <Box key={item.name} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" fontWeight={500}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" fontWeight={600}>
                          {item.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={item.progress} 
                        color={item.color as 'primary' | 'secondary' | 'success' | 'warning' | 'info'}
                        sx={{ height: 8, borderRadius: 4, mb: 1 }}
                      />
                      <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                        {item.status}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>

            {/* 系統狀態 */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: 'fit-content' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  系統狀態
                </Typography>
                <List dense>
                  {systemStatus.map((service) => (
                    <ListItem key={service.name} sx={{ px: 0, py: 1 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          width: 28, 
                          height: 28, 
                          bgcolor: `${service.color}.main`,
                          fontSize: '12px',
                          fontWeight: 600
                        }}>
                          {service.status === '正常' ? '✓' : '⚠'}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={service.name}
                        secondary={`${service.status} • 運行時間: ${service.uptime}`}
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontWeight: 500
                          },
                          '& .MuiListItemText-secondary': {
                            fontSize: '0.75rem'
                          }
                        }}
                      />
                      <Chip 
                        label={service.status} 
                        size="small" 
                        color={service.color as 'primary' | 'secondary' | 'success' | 'warning' | 'info'}
                        variant="outlined"
                        sx={{ fontWeight: 500 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* 熱門店家排行 */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: 'fit-content' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  熱門店家排行
                </Typography>
                <List dense>
                  {popularStores.map((store, index) => (
                    <ListItem key={store.id} sx={{ px: 0, py: 1 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          width: 36, 
                          height: 36, 
                          bgcolor: index < 3 ? 'primary.main' : 'grey.300',
                          color: index < 3 ? 'white' : 'grey.700',
                          fontSize: '14px',
                          fontWeight: 700
                        }}>
                          {index + 1}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={store.name}
                        secondary={`${store.category} • ${store.orders} 訂單 • 評分: ${store.rating}⭐`}
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontWeight: 600
                          },
                          '& .MuiListItemText-secondary': {
                            fontSize: '0.75rem'
                          }
                        }}
                      />
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body2" color="success.main" fontWeight={600}>
                          {store.growth}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* 最近活動 */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: 'fit-content' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  最近活動
                </Typography>
                <List dense>
                  {recentActivities.map((activity) => (
                    <ListItem key={activity.id} sx={{ px: 0, py: 1 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          width: 28, 
                          height: 28, 
                          bgcolor: activity.type === 'add' ? 'success.main' : 
                                   activity.type === 'update' ? 'primary.main' : 
                                   activity.type === 'setting' ? 'warning.main' : 'info.main',
                          fontSize: '10px',
                          fontWeight: 600
                        }}>
                          {activity.type === 'add' ? '+' : 
                           activity.type === 'update' ? '✏' : 
                           activity.type === 'setting' ? '⚙' : '🔧'}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${activity.user} ${activity.action}`}
                        secondary={`${activity.target} • ${activity.time}`}
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontWeight: 500
                          },
                          '& .MuiListItemText-secondary': {
                            fontSize: '0.75rem'
                          }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        );

      case 1: // 詳細資料
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              專案詳細資料
            </Typography>
            <Typography variant="body2" color="text.secondary">
              專案的詳細技術規格和架構資訊
            </Typography>
          </Box>
        );

      case 2: // 設定
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              專案設定
            </Typography>
            <Typography variant="body2" color="text.secondary">
              專案相關的配置和設定選項
            </Typography>
          </Box>
        );

      case 3: // 統計
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              專案統計
            </Typography>
            <Typography variant="body2" color="text.secondary">
              詳細的專案統計數據和分析報告
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
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        pb: 2,
        borderBottom: '1px solid rgba(255, 152, 0, 0.08)'
      }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#3E2723' }}>
            專案概覽
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            歡迎來到 What to Eat 美食推薦系統管理後台
          </Typography>
        </Box>
        <Chip 
          label="開發中" 
          color="primary" 
          variant="outlined"
          icon={<SpeedIcon />}
          sx={{ 
            fontWeight: 600,
            px: 2,
            py: 1,
            fontSize: '0.875rem'
          }}
        />
      </Box>
      
      {renderTabContent()}
    </Box>
  );
}
