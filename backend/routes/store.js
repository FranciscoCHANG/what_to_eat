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
    const { store_name } = req.query;
    const store = await StoreService.getStoreByName(String(store_name || ''));
    if (!store) return res.status(404).json({ message: "Store not found" });
    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 新增店家
router.post("/insert", async (req, res) => {
  const { store_name, type, branch, address, phone, social_media_links, descriptions } = req.body;
  try {
    const store_no = await StoreService.addStore(store_name, type, branch, address, phone, social_media_links, descriptions);
    res.json({ store_no, message: "Store added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update store info
router.put("/update", async (req, res) => {
  try {
    const { store_no, store_name, type, branch, address, phone, social_media_links, descriptions, status } = req.body;

    if (!store_no) {
      return res.status(400).json({ message: "store_no is required" });
    }

    // 轉換 social_media_links 為 JSON 字串
    const social_media_Json = social_media_links ? JSON.stringify(social_media_links) : null;

    // 更新店家資訊
    const result = await StoreService.updateStore(
      store_no,
      store_name,
      type,
      branch,
      address,
      phone,
      social_media_Json,
      descriptions,
      status
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Store not found or no changes made" });
    }

    res.json({ message: "Store updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// close store
router.put("/close", async (req, res) => {
  try {
    const { store_no } = req.body;
    if (!store_no) {
      return res.status(400).json({ message: "store_no is required" });
    }

    const result = await StoreService.closeStore(store_no);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Store not found or already closed" });
    }

    res.json({ message: "Store closed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// reopen store
router.put("/reopen", async (req, res) => {
  try {
    const { store_no } = req.body;
    if (!store_no) {
      return res.status(400).json({ message: "store_no is required" });
    }

    const result = await StoreService.reopenStore(store_no);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Store not found or already closed" });
    }

    res.json({ message: "Store open successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
