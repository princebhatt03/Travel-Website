const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ownerSchema = new mongoose.Schema(
  {
    resortName: {
      type: String,
      required: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    photos: {
      type: [String],
      validate: [
        arr => arr.length <= 4,
        '{PATH} exceeds maximum photo limit (4).',
      ],
      default: [],
    },
    resortId: {
      type: String,
      unique: true,
      required: true,
      immutable: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Auto-generate resortId before saving
ownerSchema.pre('validate', async function (next) {
  if (!this.resortId) {
    const uniqueNumber = Math.floor(1000 + Math.random() * 9000);
    this.resortId = 'RES-' + uniqueNumber;
  }
  next();
});

// Hash password before saving
ownerSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare password
ownerSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Owner', ownerSchema);
