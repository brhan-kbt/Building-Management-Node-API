import mongoose from 'mongoose';

const BuildingSchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
      minlength: 5,
    },
    floors: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Floor',
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User2',
        required: true,
      },
  },
  { timestamps: true }
);

const Building = mongoose.model('Building', BuildingSchema);

export default Building;
