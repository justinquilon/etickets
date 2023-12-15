import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: 'john smith',
      required: true,
    },
    email: {
      type: String,
      required: true,
      default: 'john@email.com',
      unique: true,
    },
    password: {
      type: String,
      default: 'secret123',
      required: true,
    },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: 'accounts',
      default: null,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  } else {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('users', userSchema);
export default User;
