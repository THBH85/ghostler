const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    title: {
      type: String,
      unique: true
      
    },
    description: String,
    date: Date,
    category: {
            type: String,
            enum: [
                'Biography',
                'Autobiography',
                'Academic',
                'Novel',
                'Other'
            ]
        },
    compensation: String,
  },
  {
    timestamps: true,
  }
);

const Project = model("Project", projectSchema);

module.exports = Project;