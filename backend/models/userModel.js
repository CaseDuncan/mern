import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String
    },

    isAdmin: {
      type: Boolean,
      default: false
    },

    // Clerk-only field
    clerkUserId: {
      type: String,
      unique: true,
      sparse: true
    },

    image: {
      type: String
    }
  },
  { timestamps: true }
);
// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
