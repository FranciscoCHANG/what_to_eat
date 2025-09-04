const express = require('express');
const router = express.Router();
const UserService = require('../services/user_service');

// 獲取所有使用者
router.get('/', async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({
      success: false,
      message: '獲取使用者列表失敗',
      error: error.message
    });
  }
});

// 根據 ID 獲取使用者
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(404).json({
      success: false,
      message: '使用者不存在',
      error: error.message
    });
  }
});

// 搜尋使用者
router.get('/search/:term', async (req, res) => {
  try {
    const { term } = req.params;
    const users = await UserService.searchUsers(term);
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({
      success: false,
      message: '搜尋使用者失敗',
      error: error.message
    });
  }
});

// 手動創建使用者
router.post('/', async (req, res) => {
  try {
    const { user_name, email, phone, user_role } = req.body;
    
    // 驗證必要欄位
    if (!user_name || !email) {
      return res.status(400).json({
        success: false,
        message: '姓名和電子郵件為必填欄位'
      });
    }

    // 驗證電子郵件格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: '請輸入有效的電子郵件格式'
      });
    }

    // 準備使用者資料
    const userData = {
      user_name,
      email,
      phone: phone || null,
      role: user_role || 2,
      status: 'active'
    };

    const userId = await UserService.createUserManually(userData);
    
    res.status(201).json({
      success: true,
      message: '使用者創建成功',
      data: { user_no: userId }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({
      success: false,
      message: error.message || '創建使用者失敗'
    });
  }
});

// 更新使用者資訊
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    
    // 驗證必要欄位
    if (!userData.user_name || !userData.email) {
      return res.status(400).json({
        success: false,
        message: '姓名和電子郵件為必填欄位'
      });
    }

    // 驗證電子郵件格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return res.status(400).json({
        success: false,
        message: '請輸入有效的電子郵件格式'
      });
    }

    await UserService.updateUser(id, userData);
    
    res.json({
      success: true,
      message: '使用者資訊更新成功'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({
      success: false,
      message: error.message || '更新使用者資訊失敗'
    });
  }
});

// 刪除使用者
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);
    
    res.json({
      success: true,
      message: '使用者刪除成功'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(400).json({
      success: false,
      message: error.message || '刪除使用者失敗'
    });
  }
});

module.exports = router;
