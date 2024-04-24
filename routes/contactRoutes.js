const express = require("express");
const router = express.Router();
const {
  getContacts,
  setContact,
  updateContact,
  deleteContact,
  getContactById,
} = require("../controllers/contactController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getContacts).post(protect, setContact);
router
  .route("/:id")
  .get(protect, getContactById)
  .delete(protect, deleteContact)
  .put(protect, updateContact);

module.exports = router;
