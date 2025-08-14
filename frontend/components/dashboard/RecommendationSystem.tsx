import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PsychologyIcon from '@mui/icons-material/Psychology';

interface RecommendationSystemProps {
  currentTab?: number;
}

export default function RecommendationSystem({ currentTab = 0 }: RecommendationSystemProps) {
  const [enableAI, setEnableAI] = React.useState(true);
  const [personalization, setPersonalization] = React.useState(75);
  const [diversity, setDiversity] = React.useState(60);

  const handleSaveAlgorithm = () => {
    console.log('儲存推薦演算法設定');
  };

  const handleTrainModel = () => {
    console.log('開始訓練模型');
  };

  // 根據標籤頁渲染不同內容
  const renderTabContent = () => {
    switch (currentTab) {
      case 0: // 演算法設定
        return (
          <Grid container spacing={3}>
            {/* 演算法設定 */}
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PsychologyIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      推薦演算法設定
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 3 }} />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={enableAI}
                        onChange={(e) => setEnableAI(e.target.checked)}
                      />
                    }
                    label="啟用 AI 推薦"
                    sx={{ mb: 2 }}
                  />
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography gutterBottom>
                      個人化程度: {personalization}%
                    </Typography>
                    <Slider
                      value={personalization}
                      onChange={(_, value) => setPersonalization(value as number)}
                      aria-labelledby="personalization-slider"
                      valueLabelDisplay="auto"
                      step={5}
                      marks
                      min={0}
                      max={100}
                    />
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography gutterBottom>
                      多樣性: {diversity}%
                    </Typography>
                    <Slider
                      value={diversity}
                      onChange={(_, value) => setDiversity(value as number)}
                      aria-labelledby="diversity-slider"
                      valueLabelDisplay="auto"
                      step={5}
                      marks
                      min={0}
                      max={100}
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                      variant="contained" 
                      onClick={handleSaveAlgorithm}
                    >
                      儲存設定
                    </Button>
                    <Button 
                      variant="outlined" 
                      onClick={handleTrainModel}
                    >
                      重新訓練模型
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* 推薦統計 */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TrendingUpIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      推薦統計
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h4" color="primary">
                      92%
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      推薦準確率
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h4" color="secondary">
                      1,234
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      今日推薦次數
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h4" color="success.main">
                      89%
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      使用者滿意度
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      case 1: // 個人化設定
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              個人化設定
            </Typography>
            <Typography variant="body2" color="text.secondary">
              使用者個人化推薦偏好設定
            </Typography>
          </Box>
        );

      case 2: // 測試結果
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              測試結果
            </Typography>
            <Typography variant="body2" color="text.secondary">
              推薦演算法測試結果和評估
            </Typography>
          </Box>
        );

      case 3: // 效能監控
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              效能監控
            </Typography>
            <Typography variant="body2" color="text.secondary">
              推薦系統效能監控和優化
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
        推薦系統
      </Typography>
      
      {renderTabContent()}
    </Box>
  );
}
