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
import AddIcon from '@mui/icons-material/Add';

interface StoreListProps {
  currentTab?: number;
}

// 模擬店家資料
const mockStores = [
  { id: 1, name: '麥當勞', type: '速食', branch: '台北店', address: '台北市信義區', phone: '02-1234-5678', status: '營業中' },
  { id: 2, name: '星巴克', type: '咖啡廳', branch: '信義店', address: '台北市信義區', phone: '02-2345-6789', status: '營業中' },
  { id: 3, name: '鼎泰豐', type: '中式料理', branch: '信義店', address: '台北市信義區', phone: '02-3456-7890', status: '營業中' },
];

export default function StoreList({ currentTab = 0 }: StoreListProps) {
  const handleAddStore = () => {
    console.log('新增店家');
  };

  // 根據標籤頁渲染不同內容
  const renderTabContent = () => {
    switch (currentTab) {
      case 0: // 所有店家
        return (
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="店家列表">
                <TableHead>
                  <TableRow>
                    <TableCell>店家編號</TableCell>
                    <TableCell>店家名稱</TableCell>
                    <TableCell>類型</TableCell>
                    <TableCell>分店</TableCell>
                    <TableCell>地址</TableCell>
                    <TableCell>電話</TableCell>
                    <TableCell>狀態</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockStores.map((store) => (
                    <TableRow hover key={store.id}>
                      <TableCell>{store.id}</TableCell>
                      <TableCell>{store.name}</TableCell>
                      <TableCell>{store.type}</TableCell>
                      <TableCell>{store.branch}</TableCell>
                      <TableCell>{store.address}</TableCell>
                      <TableCell>{store.phone}</TableCell>
                      <TableCell>{store.status}</TableCell>
                      <TableCell>
                        <Button size="small" color="primary">編輯</Button>
                        <Button size="small" color="secondary">查看</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        );

      case 1: // 新增店家
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              新增店家
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600 }}>
              <Typography variant="body2" color="text.secondary">
                請填寫店家基本資訊
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={handleAddStore}
                sx={{ alignSelf: 'flex-start' }}
              >
                開始新增店家
              </Button>
            </Box>
          </Paper>
        );

      case 2: // 店家統計
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              店家統計
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.light', borderRadius: 2, minWidth: 120 }}>
                <Typography variant="h4" color="primary.contrastText">
                  {mockStores.length}
                </Typography>
                <Typography variant="body2" color="primary.contrastText">
                  總店家數
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.light', borderRadius: 2, minWidth: 120 }}>
                <Typography variant="h4" color="success.contrastText">
                  {mockStores.filter(s => s.status === '營業中').length}
                </Typography>
                <Typography variant="body2" color="success.contrastText">
                  營業中
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'info.light', borderRadius: 2, minWidth: 120 }}>
                <Typography variant="h4" color="info.contrastText">
                  {mockStores.filter(s => s.type === '速食').length}
                </Typography>
                <Typography variant="body2" color="info.contrastText">
                  速食店
                </Typography>
              </Box>
            </Box>
          </Paper>
        );

      case 3: // 設定
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              店家管理設定
            </Typography>
            <Typography variant="body2" color="text.secondary">
              店家管理相關的系統設定選項
            </Typography>
          </Paper>
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
          店家管理
        </Typography>
        {currentTab === 0 && (
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleAddStore}
          >
            新增店家
          </Button>
        )}
      </Box>
      
      {renderTabContent()}
    </Box>
  );
}
