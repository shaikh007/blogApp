const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 25,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    later: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    }],
    resetPasswordToken: String,
    resetPasswordExpiry: String,
}, { timestamps });

userSchema.pre("save", async function(next) {
    const user = this;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    next();
});

module.exports = mongoose.model("User", userSchema);