//continue the video after 53:12minutes in videos
const express = require("express");
const { fetchAllBlogs, addBlog, deleteBlog, updateBlog, getComment, addComment, addVote } = require("../controllers/blogs");
const { fetchUser } = require("../middlewares/fetchUser");

const router = express.Router();

router.use(fetchUser)

router.get("/", fetchAllBlogs)

router.post("/adblog", addBlog)

router.delete("/delete/:id", deleteBlog)

router.put("/update/:id", updateBlog)

router.post("/addcomment/:id", addComment)

router.get("/getcomment/:id", getComment)

router.post("/vote/:id", addVote)

module.exports = router;