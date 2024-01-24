const mongoose = require('mongoose');

const FeedSchema: any = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, "Must provide user ID"]
    },
    adminProfileImg: {
        type: String,
        required: [true, "Must provide adminProfileImg"]
    },
    postImg: {
        type: String,
        required: [true, "Must provide postImg"]
    },
    likedByUsers: {
        type: [],
        default:[],
    },
    adminProfileName: {
        type: String,
        required: [true, "Must provide adminProfileName"],
        unique: [true, "Username should be unique"]
    },
    likes: {
        type: String,
    },
    comments: {
        type: String,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Feed  = mongoose.models.Feed || mongoose.model("Feed",FeedSchema);

export default Feed;