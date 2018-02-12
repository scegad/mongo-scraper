import { Router } from 'express';

const router = Router();

// Main route (simple Hello World Message)
router.get("/", function (req, res) {
  res.send("Hello world");
});

export default router;

