const { Schema, model } = require('mongoose');

const blacklistSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        default: 'No reason provided',
    },
    time: {
        type: Date,
        default: Date.now,
    }
});

module.exports = model("BlacklistedMember", blacklistSchema);
