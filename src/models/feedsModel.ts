import mongoose from "mongoose";

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
        required: [true, "Must provide adminProfileImg"]
    },
    likedByMe: {
        type: Boolean,
        default:false,
        required: [true, "Must provide adminProfileImg"]
    },
    adminProfileName: {
        type: String,
        required: [true, "Must provide adminProfileName"],
        unique: [true, "Username should be unieque"]
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

const Feed = mongoose.model("Feed", FeedSchema);

export default Feed;