const express = require("express")
const router = express.Router()
const basketControler = require("../controllers/basketControler")
const verifyJWT = require("../middleWare/verifyJWT")

router.use(verifyJWT)
router.get("/", basketControler.getBasket)
router.post("/", basketControler.addToBasket)
router.delete("/", basketControler.deleteInBasket)

module.exports = router
