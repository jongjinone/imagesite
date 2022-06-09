const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true
        },
        originalFilename: {
            type: String,
            required: true
        },
    },

    { timestamps: true } //이미지 생성 시간 옵션
)

module.exports = mongoose.model("image", ImageSchema)