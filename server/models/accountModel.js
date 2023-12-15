import { Schema, model } from 'mongoose';

const accountSchema = new Schema({
  load: {
    type: Number,
    required: false,
  },
  tickets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tickets',
      default: [],
    },
  ],
});

const Account = model('accounts', accountSchema);
export default Account;
