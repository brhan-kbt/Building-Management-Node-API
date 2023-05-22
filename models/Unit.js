import mongoose from 'mongoose';

const UnitSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    type: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    leaseType: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
    width: {
      type: Number,
      required: true,
      min: 5,
    },
    length: {
      type: Number,
      required: true,
      min: 6,
    },
    height: {
      type: Number,
      required: true,
      min: 6,
    },
    floor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Floor',
      required: true,
    },
  },
  { timestamps: true }
);

const Unit = mongoose.model('Unit', UnitSchema);

export default Unit;
