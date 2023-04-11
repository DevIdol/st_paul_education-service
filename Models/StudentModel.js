import { Schema, model } from 'mongoose'

const StudentSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    studentNo: {
        type: String,
        trim: true,
        required: true,
    },
    grade: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    academicYear: {
        type: String,
        required: true,
    },
    marks: [{
        type: Schema.Types.ObjectId,
        ref: "Mark",
    }],
    parentInfo:
    {
        fatherName: {
            type: String,
            trim: true,
        },
        motherName: {
            type: String,
            trim: true,
        },
        phNo: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        }
    }

},
    { timestamps: true }
)

export default model("Student", StudentSchema)