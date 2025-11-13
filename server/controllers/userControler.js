const User = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")
const register = async (req, res) => {
    const { username, password, fullname, email, phone } = req.body
    if (!username || !password || !fullname || !email || !phone)
        return res.status(400).json({ messege: "enter all the filed" })
    //כל השדות מלאים
    const founduser =await User.findOne({ username }).lean()
    if (founduser)
        return res.status(409).json({ messege: "the username is exist" })
    //אין עוד משתמש עם אותו שם משתמש
    const hashedPWD = await bcrypt.hash(password, 10)
    const creatUser = { username, password: hashedPWD, fullname, email, phone }
    const user = await User.create(creatUser)
    if (user) {
        return res.status(201).json({ messege: `${user.fullname} is created` })
    }
    else {
        return res.status(400).json({ messege: "error in created of user name" })
    }
    //יצירת משתמש חדש
}
const login = async (req,res) => {
    const { username, password} = req.body
    if(!username||!password){
      return res.status(400).json({ messege: "enter all the filed" })
}
       const founduser= await User.findOne({username}).lean()
    
    if(!founduser || !founduser.active){
      return res.status(401).json({ messege: "לא מורשה"})
    }
    const match = await bcrypt.compare(password,founduser.password)
    if(!match) 
        return res.status(401).json({ messege: "לא מורשה"})
    const userInfo ={
        _id:founduser._id,
        name:founduser.fullname,
        username:founduser.username,
        email:founduser.email,
        phone:founduser.phone,
        roles:founduser.roles
    }
    const accessToken= jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})

}

module.exports = { login, register }
