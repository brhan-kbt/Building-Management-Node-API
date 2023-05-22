import mongoose from 'mongoose';

const FloorSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    noofUnits: {
      type: Number,
      required: true,
    },
    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Building',
      required: true,
    },
    units: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Unit',
    }],
  },
  { timestamps: true }
);

const Floor = mongoose.model('Floor', FloorSchema);

export default Floor;
