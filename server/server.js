require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const mongoose = require("mongoose")

const app = express()
PORT = process.env.PORT || 2005
connectDB()
app.use('/images', express.static('public/images'));
app.use(cors(corsOptions))
app.use(express.json())

app.use("/api/user", require("./Routes/routUser"))
app.use("/api/product", require("./Routes/routProduct"))
app.use("/api/basket", require("./Routes/routBasket"))

mongoose.connection.once('open', () => {
    console.log("connected to MongoDB")
    app.listen(PORT, () => {
        console.log(`the server runing in port ${PORT}`);
    })
})
mongoose.connection.on('error', err => {
    console.log(err);
})



