const Basket = require("../models/basketSchema")

//getBasket
const getBasket = async (req, res) => {
    const myBasket = await Basket.find({ userId: req.user._id })
    if (!myBasket)
        return res.status(400).send("No products in basket")
    res.json(myBasket)
}

//addToBasket
const addToBasket = async (req, res) => {
    const { _id, quentity, override } = req.body

    if (!_id)
        return res.status(400).json({ masssge: "All fields are required" })

    const basket = await Basket.findOne({ userId: req.user._id })

    if (basket) {
        let products = basket.products
        const existProd = products.find(p => p.productId == _id)
        if (!existProd) {
            products.push({ productId: _id, quentity })
        } else {
            products = products.map(prod => {
                if (prod.productId == _id) {
                    const qty =  1;
                    prod.quentity = override ? qty : prod.quentity + qty
                }
                return prod;
            });

        }
        basket.products = products
        const upBasket = await basket.save()

        return res.json({ message: "the product addad in succsefuly👍😁", upBasket })
    }

    const newBasket = await Basket.create({ userId: req.user._id, products: [{ productId: _id, quentity }] })
    res.json({ message: "the product addad in succsefuly👍😁", newBasket })
}

//deleteInBaket
const deleteInBasket = async (req, res) => {
    const { productId } = req.body

    if (!productId)
        return res.status(400).json({ masssge: "all fileds are required" })

    const basket = await Basket.findOne({ userId: req.user._id })
    if (!basket)
        return res.status(400).send("basket is not exist")

    let { products } = basket
    const existProd = products.find(p => p.productId == productId)
    if (!existProd)
        return res.status(400).send("product is not exist")

    const updatedProducts = basket.products.filter(p => p.productId != productId);
    if (updatedProducts.length === 0) {
        await basket.deleteOne();
        return res.json({ message: "Basket deleted entirely" });
    }
    basket.products = updatedProducts;
    await basket.save();


    res.json({ message: "the product deleted in succsefuly👍😁" })
}





module.exports = { getBasket, addToBasket, deleteInBasket }
