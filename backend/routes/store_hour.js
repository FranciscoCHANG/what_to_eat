const express = require("express");
const router = express.Router();
const StoreHourService = require("../services/store_hour_service");

// 取得店家所有營業時間
router.get("/", async (req, res) => {
  try {
    const { store_no } = req.query;
    const store_hours = await StoreHourService.getStoreHours(Number(store_no));
    res.json(store_hours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
