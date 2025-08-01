const express = require("express");
const { check } = require("express-validator");
const feedbackController = require("../controllers/feedbackController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

const router = express.Router();

// GET /api/feedback/sent
router.get("/sent", auth, feedbackController.getSentFeedback);

// GET /api/feedback/received
router.get("/received", auth, feedbackController.getReceivedFeedback);

// GET /api/feedback/department/:department
router.get(
  "/department/:department",
  auth,
  roleCheck(["hr"]),
  feedbackController.getDepartmentFeedback
);

// POST /api/feedback
router.post(
  "/",
  [
    auth,
    check("message", "Message is required").not().isEmpty(),
    check(
      "type",
      "Type must be onboarding, training, support, or general"
    ).isIn(["onboarding", "training", "support", "general"]),
  ],
  feedbackController.createFeedback
);

// DELETE /api/feedback/:id
router.delete("/:id", auth, feedbackController.deleteFeedback);

module.exports = router;
