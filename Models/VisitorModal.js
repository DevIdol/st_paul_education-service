import mongoose from 'mongoose'
const Schema = mongoose.Schema

const VisitorSchema = new Schema({
  count: {
    type: Number,
    default: 0,
  },
})

export default mongoose.model('visitor', VisitorSchema)
