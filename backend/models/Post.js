const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    img: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "postId",
  localField: "_id",
});

function validateCreatePost(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    category: Joi.string().required(),
  });
  return schema.validate(obj);
}

function validateUpdatePost(obj) {
  const schema = Joi.object({
    title: Joi.string().trim(),
    description: Joi.string().trim(),
    category: Joi.string(),
  });
  return schema.validate(obj);
}

const Post = mongoose.model("Post", postSchema);
module.exports = {
  Post,
  validateCreatePost,
  validateUpdatePost,
};
