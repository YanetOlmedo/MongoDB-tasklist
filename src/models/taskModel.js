const { Schema, model, default: mongoose } = require("mongoose");

const taskSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
    },

    description: {
      type: String,
      default: "No description",
    },
    completed: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const taskModel = model("task", taskSchema);

module.exports = taskModel;
