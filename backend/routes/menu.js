const express = require("express");
const router = express.Router();
const MenuService = require("../services/menu_service");

// 取得所有菜單
router.get("/menus", async (req, res) => {
  try {
    const menus = await MenuService.getAllMenus();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 取得某家店的菜單
router.get("/stores/:storeId/menus", async (req, res) => {
    try {
      const menu = await MenuService.getMenuByStoreId(req.params.storeId);
      if (!menu) return res.status(404).json({ message: "Menu not found for this store" });
      res.json(menu);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  

// 新增店家菜單
router.post("/menus", async (req, res) => {
  const { storeId, storeName } = req.body;
  try {
    const menuId = await MenuService.addMenu(storeId, storeName);
    res.json({ menuId, message: "Menu created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 新增菜品
router.post("/menus/:menuId/items", async (req, res) => {
  const { name, price } = req.body;
  try {
    const itemId = await MenuService.addMenuItem(req.params.menuId, name, price);
    res.json({ itemId, message: "Item added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 更新菜品
router.put("/menus/items/:itemId", async (req, res) => {
  const { name, price } = req.body;
  try {
    await MenuService.updateMenuItem(req.params.itemId, name, price);
    res.json({ message: "Item updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 刪除菜品
router.delete("/menus/items/:itemId", async (req, res) => {
  try {
    await MenuService.deleteMenuItem(req.params.itemId);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
