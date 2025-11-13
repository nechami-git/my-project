const Product = require("../models/productSchema")

const getAllProduct = async (req, res) => {
    const Products = await Product.find()
    res.json(Products)
}
const creatAllProduct = async (req, res) => {
    const { productName, price, description, summary ,rating, category, image, inventoryStatus} = req.body
    if (!productName || !price || !description) {
        return res.status(400).send('all the fileds are requred')
    }

    const newProduct = await Product.create({ productName, price, description, summary , rating, category, image, inventoryStatus })
    res.json(newProduct)
}
const getProductById = async (req, res) => {
    const { id } = req.params
    const idProduct = await Product.findById(id)
    if (!idProduct) {
        return res.status(404).send(' is not exist')
    }
    res.json(idProduct)
}

const upAllProduct = async (req, res) => {
    const {_id, productName, price, description, summary ,rating, category, image, inventoryStatus} = req.body
    if (!_id || !productName || !price || !description ) {
        return res.status(400).send('all the fileds are requred')
    }
    const product = await Product.findById(_id)
    if (!product)
        return res.status(400).send(' is not exist')
        product._id = _id,
        product.productName = productName,
        product.price = price,
        product.description = description,
        product.summary = summary,
        product.rating = rating,
        product.category = category,
        product.image = image,
        product.inventoryStatus = inventoryStatus
    const updataproduct = await product.save()  
    
    res.json(updataproduct)
  

}
const deleteProduct = async (req, res) => {
    const { _id } = req.params
    const product = await Product.findById(_id)
    if (!product) {
        return res.status(400).send(' Product is not found')
    }
    await product.deleteOne()
    const mesege = 'sucssefuly! you delete--'
    res.json(mesege)
}


module.exports = { getAllProduct, creatAllProduct, getProductById, upAllProduct, deleteProduct }

