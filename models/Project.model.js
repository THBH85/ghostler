const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    title: {
      type: String,
      unique: true
      
    },
    description: String,
    category: {
            type: String,
            enum: [
                'biography',
                'academic',
                'other'
            ]
        },
  },
  {
    timestamps: true,
  }
);

const Project = model("Project", projectSchema);

module.exports = Project;