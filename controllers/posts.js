const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id })
        .sort({ updatedAt: "desc" })
        .lean();
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const page = req.query.page || 1;
      const { docs, ...pageData } = await Post.paginate(
        {},
        { page: page, limit: 10, sort: { updatedAt: "desc" } }
      );
      console.log(pageData);
      res.render("feed.ejs", { posts: docs, pageData: pageData });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({
        post: req.params.id,
        user: req.user.id,
      })
        .sort({ createdAt: "desc" })
        .lean();

      console.log(post);
      res.render("post.ejs", {
        post: post,
        user: req.user,
        comments: comments,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    console.log(req.user);
    try {
      await Post.create({
        state: req.body.state,
        socialMediaName: req.body.socialMediaName,
        link: req.body.link,
        name: req.body.name,
        lastName: req.body.lastName,
        nid: req.body.nid,
        summary: req.body.summary,
        numberOfUnits: req.body.numberOfUnits,
        tambon: req.body.tambon,
        amphur: req.body.amphur,
        mapPoint: req.body.mapPoint,
        deed: req.body.deed,
        imageLink: req.body.imageLink,
        likes: 0,
        user: req.user.id,
        posterName: req.user.userName,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
      res.redirect("/profile");
    }
  },
  findPost: async (req, res) => {
    try {
      const posts = await Post.find({
        $or: [
          { name: { $regex: req.body.socialAndName } },
          { socialMediaName: { $regex: req.body.socialAndName } },
          { lastName: { $regex: req.body.socialAndName } },
        ],
      });
      res.render("feed.ejs", { posts: posts, pageData: undefined });
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  updatePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            state: req.body.state,
            socialMediaName: req.body.socialMediaName,
            link: req.body.link,
            name: req.body.name,
            lastName: req.body.lastName,
            nid: req.body.nid,
            summary: req.body.summary,
            numberOfUnits: req.body.numberOfUnits,
            tambon: req.body.tambon,
            amphur: req.body.amphur,
            mapPoint: req.body.mapPoint,
            deed: req.body.deed,
            imageLink: req.body.imageLink,
          },
        }
      );
      console.log("Update post");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      const post = await Post.findById({ _id: req.params.id });
      // find comment that match post and the comment user
      const comments = await Comment.find({
        post: req.params.id,
        user: req.query.commenterid,
      }).lean();
      // if poster want to delete, change flag to delete
      if (req.user.id === post.user.toString()) {
        post.posterDelete = !post.posterDelete;
        post.save();
      } else if (
        post.posterDelete &&
        comments.length > 0 &&
        req.user.id !== post.user
      ) {
        await Post.remove({ _id: req.params.id });
        console.log("Deleted Post");
      }
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
