const express = require('express');
const router = express.Router();
const path = require('path');

router.route("/").get(async (req, res) => {
  try {
    res.sendFile(path.resolve('static/homepage.html'));
  }
  catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;