import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// 模擬營業時間資料
const mockBusinessHours = [
  { 
    id: 1, 
    storeName: '麥當勞', 
    day: '週一', 
    openTime: '06:00', 
    closeTime: '23:00', 
    status: '營業中'
  },
  { 
    id: 2, 
    storeName: '麥當勞', 
    day: '週二', 
    openTime: '06:00', 
    closeTime: '23:00', 
    status: '營業中'
  },
  { 
    id: 3, 
    storeName: '星巴克', 
    day: '週一', 
    openTime: '07:00', 
    closeTime: '22:00', 
    status: '營業中'
  },
  { 
    id: 4, 
    storeName: '星巴克', 
    day: '週二', 
    openTime: '07:00', 
    closeTime: '22:00', 
    status: '營業中'
  },
  { 
    id: 5, 
    storeName: '鼎泰豐', 
    day: '週一', 
    openTime: '11:00', 
    closeTime: '21:00', 
    status: '營業中'
  },
];

interface BusinessHoursProps {
  currentTab?: number;
}

export default function BusinessHours({ currentTab = 0 }: BusinessHoursProps) {
  const handleEditHours = (id: number) => {
    console.log(`編輯營業時間: ${id}`);
  };

  const handleBulkEdit = () => {
    console.log('批量編輯營業時間');
  };

  // 根據標籤頁渲染不同內容
  const renderTabContent = () => {
    switch (currentTab) {
      case 0: // 時間表
        return (
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="營業時間列表">
                <TableHead>
                  <TableRow>
                    <TableCell>店家名稱</TableCell>
                    <TableCell>星期</TableCell>
                    <TableCell>開始時間</TableCell>
                    <TableCell>結束時間</TableCell>
                    <TableCell>營業時數</TableCell>
                    <TableCell>狀態</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockBusinessHours.map((hours) => {
                    const openTime = new Date(`2000-01-01T${hours.openTime}:00`);
                    const closeTime = new Date(`2000-01-01T${hours.closeTime}:00`);
                    const duration = (closeTime.getTime() - openTime.getTime()) / (1000 * 60 * 60);
                    
                    return (
                      <TableRow hover key={hours.id}>
                        <TableCell>{hours.storeName}</TableCell>
                        <TableCell>{hours.day}</TableCell>
                        <TableCell>{hours.openTime}</TableCell>
                        <TableCell>{hours.closeTime}</TableCell>
                        <TableCell>{duration} 小時</TableCell>
                        <TableCell>
                          <Chip 
                            label={hours.status} 
                            color={hours.status === '營業中' ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="small" 
                            color="primary"
                            onClick={() => handleEditHours(hours.id)}
                          >
                            編輯
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        );

      case 1: // 批量設定
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              批量設定營業時間
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              選擇多個店家進行批量營業時間設定
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AccessTimeIcon />}
              onClick={handleBulkEdit}
            >
              開始批量設定
            </Button>
          </Box>
        );

      case 2: // 特殊日期
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              特殊日期設定
            </Typography>
            <Typography variant="body2" color="text.secondary">
              設定節假日、店休日等特殊營業時間
            </Typography>
          </Box>
        );

      case 3: // 匯出設定
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              匯出設定
            </Typography>
            <Typography variant="body2" color="text.secondary">
              匯出營業時間資料和設定
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
          營業時間管理
        </Typography>
        {currentTab === 0 && (
          <Button 
            variant="contained" 
            startIcon={<AccessTimeIcon />}
            onClick={handleBulkEdit}
          >
            批量編輯
          </Button>
        )}
      </Box>
      
      {renderTabContent()}
    </Box>
  );
}
