const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    title: {
      type: String,
      unique: true
      
    },
    description: String,
    date: Date,
    academic: Boolean,
    category: {
            type: String,
            enum: [
                'Course Paper',
                'Bachelor Thesis',
                'Master Thesis',
                'Biography',
                'Autobiography',
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