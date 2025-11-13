const express = require("express")
const router = express.Router()
const productControler = require("../controllers/prodctControler")
const verifyJWT = require("../middleWare/verifyJWT")
const verifyManager = require("../middleWare/verifyManager")

router.get("/", productControler.getAllProduct)
router.get("/:id", productControler.getProductById)

router.use(verifyJWT)
router.use(verifyManager)
router.post("/", productControler.creatAllProduct)
router.put("/", productControler.upAllProduct)
router.delete("/:_id", productControler.deleteProduct)

module.exports = router
