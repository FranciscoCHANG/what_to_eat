import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface DataAnalyticsProps {
  currentTab?: number;
}

export default function DataAnalytics({ currentTab = 0 }: DataAnalyticsProps) {
  // 根據標籤頁渲染不同內容
  const renderTabContent = () => {
    switch (currentTab) {
      case 0: // 概覽
        return (
          <Grid container spacing={3}>
            {/* 統計卡片 */}
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                    <Box>
                      <Typography color="textSecondary" gutterBottom>
                        總使用者數
                      </Typography>
                      <Typography variant="h4">
                        1,234
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        +12% 較上月
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <RestaurantIcon sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
                    <Box>
                      <Typography color="textSecondary" gutterBottom>
                        合作店家
                      </Typography>
                      <Typography variant="h4">
                        89
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        +5% 較上月
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <VisibilityIcon sx={{ fontSize: 40, color: 'info.main', mr: 2 }} />
                    <Box>
                      <Typography color="textSecondary" gutterBottom>
                        月活躍度
                      </Typography>
                      <Typography variant="h4">
                        85%
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        +3% 較上月
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUpIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                    <Box>
                      <Typography color="textSecondary" gutterBottom>
                        推薦準確率
                      </Typography>
                      <Typography variant="h4">
                        92%
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        +2% 較上月
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* 熱門店家排行 */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  熱門店家排行
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {[
                    { name: '麥當勞', visits: 1250, progress: 85 },
                    { name: '星巴克', visits: 980, progress: 68 },
                    { name: '鼎泰豐', visits: 750, progress: 52 },
                    { name: '肯德基', visits: 620, progress: 43 },
                    { name: '必勝客', visits: 480, progress: 33 }
                  ].map((store, index) => (
                    <Box key={store.name} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">
                          {index + 1}. {store.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {store.visits} 次瀏覽
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={store.progress} 
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>

            {/* 使用者行為分析 */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  使用者行為分析
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {[
                    { label: '搜尋餐廳', percentage: 45 },
                    { label: '查看菜單', percentage: 30 },
                    { label: '查看營業時間', percentage: 15 },
                    { label: '其他操作', percentage: 10 }
                  ].map((item) => (
                    <Box key={item.label} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">
                          {item.label}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {item.percentage}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={item.percentage} 
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        );

      case 1: // 使用者分析
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              使用者分析
            </Typography>
            <Typography variant="body2" color="text.secondary">
              詳細的使用者行為和偏好分析
            </Typography>
          </Box>
        );

      case 2: // 銷售分析
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              銷售分析
            </Typography>
            <Typography variant="body2" color="text.secondary">
              銷售數據和趨勢分析
            </Typography>
          </Box>
        );

      case 3: // 趨勢報告
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              趨勢報告
            </Typography>
            <Typography variant="body2" color="text.secondary">
              市場趨勢和預測分析
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
        資料分析
      </Typography>
      
      {renderTabContent()}
    </Box>
  );
}
