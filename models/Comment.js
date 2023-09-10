const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      enum: [
        "ค้นหา",
        "ค้นแล้วไม่มีประเด็น",
        "รวบรวมข้อมูล",
        "พร้อมส่ง",
        "ส่งให้ทีมแล้ว",
        "ทีมทำแล้ว",
      ],
      required: false,
    },
    socialMediaName: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    nid: {
      type: Number,
      required: false,
    },
    summary: {
      type: String,
      required: false,
    },
    numberOfUnits: {
      type: Number,
      required: false,
    },
    tambon: {
      type: String,
      required: false,
    },
    amphur: {
      type: String,
      required: false,
    },
    mapPoint: {
      type: String,
      required: false,
    },
    deed: {
      type: Number,
      required: false,
    },
    imageLink: {
      type: String,
      required: false,
    },
    likes: {
      type: Number,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    posterName: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Comment", CommentSchema);
