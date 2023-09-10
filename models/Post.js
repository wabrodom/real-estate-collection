const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const PostSchema = new mongoose.Schema(
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
      required: true,
    },
    socialMediaName: {
      type: String,
      required: [true, "กรุณาใส่ชื่อ Social?"],
    },
    link: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
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
      required: true,
    },
    numberOfUnits: {
      type: Number,
      required: false,
    },
    tambon: {
      type: String,
      required: true,
    },
    amphur: {
      type: String,
      required: true,
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
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    posterName: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", PostSchema);
