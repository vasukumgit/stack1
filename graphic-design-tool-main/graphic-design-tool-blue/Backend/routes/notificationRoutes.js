const router = require("express").Router();
const db = require("../config/db");

// ============================
// GET ALL NOTIFICATIONS
// ============================
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const [rows] = await db.execute(
      "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    res.json(rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ============================
// GET UNREAD COUNT
// ============================
router.get("/unread/count/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const [rows] = await db.execute(
      "SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = FALSE",
      [userId]
    );

    res.json(rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ============================
// MARK AS READ
// ============================
router.put("/mark-read/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await db.execute(
      "UPDATE notifications SET is_read = TRUE WHERE id = ?",
      [id]
    );

    res.json({ msg: "Notification marked as read" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;