const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        userID: {
            type: String,
            required: true,
            unique: true
        },
        hashedPassword: {
            type: String,
            required: true
        },
        sessions:[{
            createdAt: { type: Date, required: true}
        }]
    },

    { timestamps: true } //이미지 생성 시간 옵션
)

module.exports = mongoose.model("user", UserSchema)