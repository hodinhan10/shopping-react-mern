import mongoose from 'mongoose';
import mongooseDelete from'mongoose-delete';

const coinsEssaySchema = new mongoose.Schema(
  {
    coins: { type: Number, default: 0, required: true },
  },
  {
    timestamps: true,
  }
);

const essaySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    famous: { type: String},
    category: { type: String, required: true },
    image: { type: String },
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    images: {
      type: Array,
    },
    content: { type: String, required: true},
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isStatus: { type: Boolean},
    coinSum: { type: Number, default: 0, required: true },
    coinsEssay: [coinsEssaySchema]

  },
  {
    timestamps: true,
  }
);
// Add plugin
essaySchema.plugin(mongooseDelete, { 
  deletedAt : true,
  overrideMethods: 'all' 
});
const Essay = mongoose.model('essay', essaySchema);
export default Essay;