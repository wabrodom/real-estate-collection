const Comment = require("../models/Comment");

module.exports = {
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find()
        .sort({ updatedAt: "desc" })
        .limit(10)
        .lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      console.log(post);
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createComment: async (req, res) => {
    console.log(req.user);
    try {
      await Comment.create({
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
        post: req.params.id,
        posterName: req.user.userName,
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
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
      res.render("feed.ejs", { posts: posts });
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
      let post = await Post.findById({ _id: req.params.id });
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
