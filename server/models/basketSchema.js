const mongoose = require("mongoose")
const Schema = mongoose.Schema

const basketSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        products: [{  
            productId:{
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Product"
             },
            quentity:{
            type: Number,
            default:1
        }}]
               
    }, { timestamps: true }
)

module.exports = mongoose.model("Basket", basketSchema)