const {ModelProduct} = require("./modules/model.product")
const Product = new ModelProduct()
const [, , categoryId] = process.argv
let products = Product.getProducts(categoryId)
const handleShowProducts = (productsOrResult) => {
    if(Array.isArray(productsOrResult)){
        console.log(products)
        console.table(productsOrResult)
    }else{
        console.log(productsOrResult)
    }
}
handleShowProducts(products)