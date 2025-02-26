const express = require("express");
const router = express.Router();
const MenuService = require("../services/menu_service");


// 取得某家店的菜單
router.get("/stores/:storeNo", async (req, res) => {
    try {
      const menu = await MenuService.getMenuByStoreNo(req.params.storeNo);
      if (!menu) return res.status(404).json({ message: "Menu not found for this store" });
      res.json(menu);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  

// 新增店家菜單
router.post("/menus", async (req, res) => {
  const { storeNo, storeName } = req.body;
  try {
    const menuNo = await MenuService.addMenu(storeNo, storeName);
    res.json({ menuNo, message: "Menu created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 新增品項
router.post("/menus/:menuNo/items", async (req, res) => {
  const { name, price } = req.body;
  try {
    const itemNo = await MenuService.addMenuItem(req.params.menuNo, name, price);
    res.json({ itemNo, message: "Item added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 更新菜品
router.put("/menus/items/:itemNo", async (req, res) => {
  const { name, price } = req.body;
  try {
    await MenuService.updateMenuItem(req.params.itemNo, name, price);
    res.json({ message: "Item updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 刪除菜品
router.delete("/menus/items/:itemNo", async (req, res) => {
  try {
    await MenuService.deleteMenuItem(req.params.itemNo);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
