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
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

interface UserManagementProps {
  currentTab?: number;
}

// 模擬使用者資料
const mockUsers = [
  { 
    id: 1, 
    name: '張小明', 
    email: 'zhang@example.com', 
    phone: '0912-345-678', 
    role: '管理員',
    status: '啟用',
    lastLogin: '2024-01-15 14:30',
    avatar: '/vercel.svg'
  },
  { 
    id: 2, 
    name: '李小華', 
    email: 'li@example.com', 
    phone: '0923-456-789', 
    role: '使用者',
    status: '啟用',
    lastLogin: '2024-01-14 09:15',
    avatar: '/vercel.svg'
  },
  { 
    id: 3, 
    name: '王大明', 
    email: 'wang@example.com', 
    phone: '0934-567-890', 
    role: '使用者',
    status: '停用',
    lastLogin: '2024-01-10 16:45',
    avatar: '/vercel.svg'
  },
];

export default function UserManagement({ currentTab = 0 }: UserManagementProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleAddUser = () => {
    console.log('新增使用者');
  };

  const handleEditUser = (userId: number) => {
    console.log(`編輯使用者: ${userId}`);
  };

  const handleDeleteUser = (userId: number) => {
    console.log(`刪除使用者: ${userId}`);
  };

  const handleRefresh = () => {
    console.log('重新整理使用者列表');
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  // 根據標籤頁渲染不同內容
  const renderTabContent = () => {
    switch (currentTab) {
      case 0: // 使用者列表
        return (
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <SearchIcon color="action" />
                <TextField
                  fullWidth
                  placeholder="搜尋使用者姓名、電子郵件或電話號碼"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  variant="standard"
                  sx={{ 
                    '&:before': { borderBottom: 'none' },
                    '&:after': { borderBottom: 'none' },
                    '&:hover:before': { borderBottom: 'none' }
                  }}
                />
                <Tooltip title="重新整理">
                  <IconButton onClick={handleRefresh}>
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="使用者列表">
                <TableHead>
                  <TableRow>
                    <TableCell>使用者</TableCell>
                    <TableCell>電子郵件</TableCell>
                    <TableCell>電話</TableCell>
                    <TableCell>角色</TableCell>
                    <TableCell>狀態</TableCell>
                    <TableCell>最後登入</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow hover key={user.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar src={user.avatar} alt={user.name} sx={{ width: 32, height: 32 }} />
                          <Typography variant="body2">{user.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <Chip 
                          label={user.role} 
                          size="small" 
                          color={user.role === '管理員' ? 'primary' : 'default'}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={user.status} 
                          size="small" 
                          color={user.status === '啟用' ? 'success' : 'error'}
                        />
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="編輯">
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={() => handleEditUser(user.id)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="刪除">
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            {filteredUsers.length === 0 && (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography color="text.secondary">
                  {searchTerm ? '沒有找到符合搜尋條件的使用者' : '目前尚無使用者資料'}
                </Typography>
              </Box>
            )}
          </Paper>
        );

      case 1: // 新增使用者
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              新增使用者
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="姓名"
                  variant="outlined"
                  placeholder="請輸入使用者姓名"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="電子郵件"
                  variant="outlined"
                  placeholder="請輸入電子郵件"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="電話號碼"
                  variant="outlined"
                  placeholder="請輸入電話號碼"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>角色</InputLabel>
                  <Select label="角色">
                    <MenuItem value="user">使用者</MenuItem>
                    <MenuItem value="admin">管理員</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button variant="outlined">取消</Button>
                  <Button variant="contained">新增使用者</Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        );

      case 2: // 權限管理
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              權限管理
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      管理員權限
                    </Typography>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="查看所有使用者"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="新增/編輯使用者"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="刪除使用者"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="系統設定"
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      一般使用者權限
                    </Typography>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="查看自己的資料"
                    />
                    <FormControlLabel
                      control={<Switch />}
                      label="編輯自己的資料"
                    />
                    <FormControlLabel
                      control={<Switch />}
                      label="查看基本統計"
                    />
                    <FormControlLabel
                      control={<Switch />}
                      label="系統設定"
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        );

      case 3: // 登入記錄
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              登入記錄
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>使用者</TableCell>
                    <TableCell>登入時間</TableCell>
                    <TableCell>IP 位址</TableCell>
                    <TableCell>裝置</TableCell>
                    <TableCell>狀態</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>張小明</TableCell>
                    <TableCell>2024-01-15 14:30</TableCell>
                    <TableCell>192.168.1.100</TableCell>
                    <TableCell>Chrome / Windows</TableCell>
                    <TableCell>
                      <Chip label="成功" size="small" color="success" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>李小華</TableCell>
                    <TableCell>2024-01-15 13:45</TableCell>
                    <TableCell>192.168.1.101</TableCell>
                    <TableCell>Safari / macOS</TableCell>
                    <TableCell>
                      <Chip label="成功" size="small" color="success" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
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
          使用者管理
        </Typography>
        {currentTab === 0 && (
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleAddUser}
          >
            新增使用者
          </Button>
        )}
      </Box>
      
      {renderTabContent()}
    </Box>
  );
}
