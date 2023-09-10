const express = require("express");
const router = express.Router();
// const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

// router.post("/createPost", upload.single("file"), postsController.createPost);
router.post("/createPost", postsController.createPost);

router.post("/search", postsController.findPost);

router.put("/likePost/:id", postsController.likePost);

router.put("/updatePost/:id", postsController.updatePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
