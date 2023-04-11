import { Schema, model } from "mongoose";

const marks = [];
for (let i = 0; i <= 100; i++) {
  marks.push(i);
}
const MarkSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subjects: [
    {
      name: {
        type: String,
        trim: true,
        uinque: true,
        required: true,
      },
      mark: {
        type: Number,
        required: true,
        enum: marks
      },
      remark: {
        type: String,
        enum: ['A', 'B', 'C', 'D']
      }
    },
  ],
  month: {
    type: String,
    trim: true,
    enum: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    required: true,
  },
  totalMark: {
    type: Number,
    trim: true,
    default: 0
  },
  average: {
    type: Number,
    trim: true,
    default: 0,
  },
  averageRemark: {
    type: String,
    enum: ['A', 'B', 'C', 'D']
  },
  attendance: {
    type: Number,
    trim: true,
    default: 0,
  },
  year: {
    type: Number,
    default: () => new Date().getFullYear()
  },
},
  { timestamps: true });

export default model("Mark", MarkSchema)
