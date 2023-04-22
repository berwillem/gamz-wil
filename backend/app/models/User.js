const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    nom: {
      type: String,
    },
    prenom: {
      type: String,
    },
    genre: {
      type: String,
    },
    dateNaissance: {
      type: Date,
    },
  
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    infoUpdate: {
      type: Boolean,
      required: true,
      default: false,
    },
    avatar: {
      url: {
        type: String,
        default:null,
      },
      public_id: {
        type: String,
        default:null,
      },
    },
    banner: {
      url: {
        type: String,
        default:null,
      },
      public_id: {
        type: String,
        default:null,
      },
    },

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compareSync(password, this.password);
  return result;
};

module.exports = mongoose.model("User", userSchema);
