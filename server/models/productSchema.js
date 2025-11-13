const mongoose = require("mongoose")

const Schema = mongoose.Schema
const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
    },
    rating: {
        type: Number,
    },
    category: {
        type: String,
        enum: ['מיקי מאוס', 'חדר שינה'],
    },

    image: {
        type: String
    },
    inventoryStatus: {
        type: String,
        enum: ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'],
    },

}, { timestamps: true })
module.exports = mongoose.model("Product", productSchema)