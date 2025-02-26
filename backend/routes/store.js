const express = require("express");
const router = express.Router();
const StoreService = require("../services/store_service");

// 取得所有店家
router.get("/", async (req, res) => {
  try {
    const stores = await StoreService.getAllStores();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 取得特定店家
router.get("/search", async (req, res) => {
  try {
    const store = await StoreService.getStoreByName(req.body.store_name);
    if (!store) return res.status(404).json({ message: "Store not found" });
    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 新增店家
router.post("/", async (req, res) => {
  const { name, address } = req.body;
  try {
    const store_no = await StoreService.addStore(name, address);
    res.json({ store_no, message: "Store added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
